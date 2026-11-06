/**
 * Auto-vérification du moteur de diff des dictées.
 * Exécution : node tests/diff.test.js
 */
const assert = require("node:assert/strict");
require("../js/diff.js");

const { diffWords } = globalThis.GrammarDiff;

const types = (tokens) => tokens.map((token) => token.type);
const wordsOf = (tokens, key) => tokens.filter((t) => t.type === key);

// Texte exact (ponctuation finale ignorée)
{
  const t = diffWords(["Le", "printemps", "est", "tardif."], ["Le", "printemps", "est", "tardif"]);
  assert.deepEqual(types(t), ["correct", "correct", "correct", "correct"]);
}

// Une omission ne doit pas décaler les mots suivants
{
  const t = diffWords(["Le", "printemps", "a", "été", "tardif"], ["Le", "printemps", "tardif"]);
  assert.deepEqual(types(t), ["correct", "correct", "missing", "missing", "correct"]);
  assert.equal(wordsOf(t, "wrong").length, 0);
}

// Faute d'orthographe : une seule erreur, pas une omission + un mot en trop
{
  const t = diffWords(["Le", "printemps", "a", "été", "tardif"], ["Le", "printemps", "a", "été", "tardiff"]);
  assert.deepEqual(types(t), ["correct", "correct", "correct", "correct", "wrong"]);
}

// Accent / majuscule : signalé comme erreur d'accent
{
  const t = diffWords(["les", "pousses", "épanouies"], ["les", "pousses", "epanouies"]);
  assert.deepEqual(types(t), ["correct", "correct", "accent"]);
}

// Mot en trop
{
  const t = diffWords(["Le", "printemps", "est", "tardif"], ["Le", "vraiment", "printemps", "est", "tardif"]);
  assert.deepEqual(types(t), ["correct", "extra", "correct", "correct", "correct"]);
}

// Apostrophes typographiques et ponctuation
{
  const t = diffWords(["l’herbe", "est", "verte."], ["l'herbe", "est", "verte"]);
  assert.deepEqual(types(t), ["correct", "correct", "correct"]);
}

// Saisie vide : tout est manquant, aucun crash
{
  const t = diffWords(["Le", "printemps"], []);
  assert.deepEqual(types(t), ["missing", "missing"]);
}

// Deux omissions consécutives restent alignées
{
  const t = diffWords(["a", "b", "c", "d", "e"], ["a", "d", "e"]);
  assert.deepEqual(types(t), ["correct", "missing", "missing", "correct", "correct"]);
}

console.log("✓ tests/diff.test.js : tous les cas passent");
