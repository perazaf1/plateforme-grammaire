/**
 * MODÈLE DE CHAPITRE / SOUS-SECTION (À dupliquer par chapitre)
 */
(function (global) {
  "use strict";

  global.SubjectChunks = global.SubjectChunks || {};
  global.SubjectChunks["ma-matiere"] = global.SubjectChunks["ma-matiere"] || [];

  global.SubjectChunks["ma-matiere"].push({
    id: "chapitre-1",
    shortLabel: "Chapitre 1",
    course: {
      num: 1,
      title: "Titre du chapitre 1",
      filConducteur: "Résumé synthétique des idées principales du chapitre.",
      chronologie: [
        // ["Date", "Événement"]
      ],
      noms: [
        // ["Nom", "Rôle / à retenir"]
      ],
      notions: [
        // ["Notion", "Définition"]
      ]
    },
    quizQuestions: [
      {
        id: "exemple_c1_q1",
        coursNum: 1,
        cours: "Cours 1 : Titre du chapitre 1",
        question: "Énoncé de la question ?",
        options: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
        reponseCorrecte: 0,
        explication: "Explication détaillée issue du cours."
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
