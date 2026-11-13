/**
 * MODÈLE DE MATIÈRE MULTI-FICHIERS
 *
 * Étapes pour ajouter une nouvelle matière (ex: Histoire, Philosophie...) :
 * 1. Dupliquer ce dossier `_template/` vers `js/subjects/ma-matiere/`
 * 2. Créer un fichier `ch01-xxx.js`, `ch02-xxx.js`, etc. par chapitre/sous-section
 * 3. Adapter l'ID ("ma-matiere"), le titre et la catégorie dans ce `index.js`
 * 4. Déclarer la matière et ses scripts dans `js/core/catalog.js`
 */
(function (global) {
  "use strict";

  const chunks = (global.SubjectChunks && global.SubjectChunks["ma-matiere"]) || [];
  const sorted = chunks.slice().sort((a, b) => (a.course.num || 0) - (b.course.num || 0));

  const allCourses = sorted.map((c) => c.course);
  const allQuestions = sorted.flatMap((c) => c.quizQuestions || []);
  const allFlashcards = global.PlatformUtils.buildFlashcardsFromCourses(allCourses, "exemple");

  const chapterSubsections = sorted.map((chunk) => {
    const c = chunk.course;
    const questions = chunk.quizQuestions || [];
    const cards = global.PlatformUtils.buildFlashcardsFromCourses([c], "exemple");
    return {
      id: chunk.id,
      shortLabel: chunk.shortLabel || `Chapitre ${c.num}`,
      title: `Chapitre ${c.num} : ${c.title}`,
      subtitle: c.filConducteur || "",
      badge: `${questions.length} QCM • ${cards.length} cartes`,
      modules: [
        { id: "quiz", label: "Quiz Active Recall", icon: "🎯", badge: `${questions.length}`, type: "quiz", data: questions },
        { id: "flashcards", label: "Flashcards", icon: "🗂️", badge: `${cards.length}`, type: "flashcards", data: cards },
        { id: "reperes", label: "Fiche & Repères", icon: "📖", badge: "Synthèse", type: "reperes", courses: [c] }
      ]
    };
  });

  global.PlatformRegistry.registerSubject({
    id: "ma-matiere",
    title: "Nom de la matière",
    subtitle: "Niveau / Programme",
    category: "Domaine",
    icon: "📚",
    badge: "Domaine",
    description: "Description courte des sous-sections et entraînements.",
    courses: allCourses,
    subsections: [
      {
        id: "global",
        shortLabel: "Révision globale",
        title: "Entraînement transversal",
        subtitle: "Tous les chapitres mélangés.",
        badge: `${allQuestions.length} QCM • ${allFlashcards.length} cartes`,
        modules: [
          { id: "quiz", label: "Quiz Global", icon: "🎯", badge: `${allQuestions.length}`, type: "quiz", data: allQuestions },
          { id: "flashcards", label: "Flashcards", icon: "🗂️", badge: `${allFlashcards.length}`, type: "flashcards", data: allFlashcards },
          { id: "reperes", label: "Toutes les fiches", icon: "📖", badge: `${allCourses.length} cours`, type: "reperes", courses: allCourses }
        ]
      },
      ...chapterSubsections
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
