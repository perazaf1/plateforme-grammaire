/**
 * Grammaire & Méthode — Moteur de correction des dictées
 * Alignement mot à mot (plus longue sous-séquence commune) : une omission
 * décale les mots suivants, une comparaison index par index produirait donc
 * une cascade de fausses erreurs.
 */
(function (global) {
  "use strict";

  function cleanToken(word) {
    return String(word)
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[.,;:!?«»"()]/g, "")
      .trim();
  }

  // Comparaison insensible aux accents et à la casse, pour aligner
  // « epanouies » sur « épanouies » et le signaler comme une seule erreur.
  function fold(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function diffWords(expectedWords, userWords) {
    const expected = expectedWords.map(cleanToken);
    const user = userWords.map(cleanToken);
    const m = expected.length;
    const n = user.length;

    // lcs[i][j] = longueur de la plus longue sous-séquence commune
    // entre expected[i..] et user[j..]
    const lcs = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
    for (let i = m - 1; i >= 0; i--) {
      for (let j = n - 1; j >= 0; j--) {
        lcs[i][j] = fold(expected[i]) === fold(user[j])
          ? lcs[i + 1][j + 1] + 1
          : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
      }
    }

    const tokens = [];
    let i = 0;
    let j = 0;
    while (i < m && j < n) {
      if (fold(expected[i]) === fold(user[j])) {
        tokens.push({
          type: expected[i] === user[j] ? "correct" : "accent",
          expected: expectedWords[i],
          user: userWords[j]
        });
        i++;
        j++;
      } else if (lcs[i + 1][j + 1] === lcs[i][j]) {
        // Les deux mots se remplacent sans perdre de correspondance : faute.
        tokens.push({ type: "wrong", expected: expectedWords[i], user: userWords[j] });
        i++;
        j++;
      } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
        tokens.push({ type: "missing", expected: expectedWords[i], user: null });
        i++;
      } else {
        tokens.push({ type: "extra", expected: null, user: userWords[j] });
        j++;
      }
    }
    while (i < m) tokens.push({ type: "missing", expected: expectedWords[i++], user: null });
    while (j < n) tokens.push({ type: "extra", expected: null, user: userWords[j++] });

    return tokens;
  }

  global.GrammarDiff = { cleanToken, diffWords };
})(typeof window !== "undefined" ? window : globalThis);
