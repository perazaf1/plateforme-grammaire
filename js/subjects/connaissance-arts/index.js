/**
 * Connaissance des Arts (ICP Prépa Journalisme) — Assemblage modulaire
 * Chaque cours est chargé depuis js/subjects/connaissance-arts/cours-*.js
 * et exposé comme une sous-section autonome + une sous-section de révision globale.
 */
(function (global) {
  "use strict";

  const chunks = (global.SubjectChunks && global.SubjectChunks["connaissance-arts"]) || [];
  const sortedChunks = chunks.slice().sort((a, b) => (a.course.num || 0) - (b.course.num || 0));

  const allCourses = sortedChunks.map((c) => c.course);
  const allQuizQuestions = sortedChunks.flatMap((c) => c.quizQuestions || []);
  const allFlashcards = global.PlatformUtils.buildFlashcardsFromCourses(allCourses, "arts");

  const courseSubsections = sortedChunks.map((chunk) => {
    const c = chunk.course;
    const questions = chunk.quizQuestions || [];
    const cards = global.PlatformUtils.buildFlashcardsFromCourses([c], "arts");

    return {
      id: chunk.id,
      shortLabel: chunk.shortLabel || `Cours ${c.num}`,
      title: `Cours ${c.num} : ${c.title}`,
      subtitle: c.filConducteur ? `${c.filConducteur.slice(0, 115).trim()}…` : "",
      badge: `${questions.length} QCM • ${cards.length} cartes`,
      itemCount: questions.length + cards.length,
      trackableIds: [
        ...questions.map((q) => `quiz:${q.id}`),
        ...cards.map((fc) => `fc:${fc.id}`)
      ],
      modules: [
        {
          id: "quiz",
          label: "Quiz Active Recall",
          icon: "🎯",
          badge: `${questions.length}`,
          tag: `Cours ${c.num}`,
          title: `Quiz : ${c.title}`,
          intro: "Activez le mode Rappel Actif pour formuler votre réponse avant de révéler les options, ou passez directement au QCM.",
          type: "quiz",
          data: questions
        },
        {
          id: "flashcards",
          label: "Flashcards",
          icon: "🗂️",
          badge: `${cards.length}`,
          tag: `Cours ${c.num}`,
          title: `Flashcards : ${c.title}`,
          intro: "Chronologie, acteurs clés et notions du cours. Évaluez votre mémorisation : les cartes « À revoir » reviennent dans la session.",
          type: "flashcards",
          data: cards
        },
        {
          id: "reperes",
          label: "Fiche & Repères",
          icon: "📖",
          badge: `${(c.chronologie || []).length + (c.noms || []).length + (c.notions || []).length} repères`,
          tag: `Synthèse Cours ${c.num}`,
          title: c.title,
          intro: "Fil conducteur, chronologie essentielle, personnages clés et définitions à maîtriser.",
          type: "reperes",
          courses: [c]
        }
      ]
    };
  });

  const globalSubsection = {
    id: "global",
    shortLabel: "Tous les cours",
    title: `Révision globale (Cours 1 à ${allCourses.length})`,
    subtitle: "Entraînement transversal mêlant l'ensemble des chapitres du programme.",
    badge: `${allQuizQuestions.length} QCM • ${allFlashcards.length} cartes`,
    itemCount: allQuizQuestions.length + allFlashcards.length,
    trackableIds: [
      ...allQuizQuestions.map((q) => `quiz:${q.id}`),
      ...allFlashcards.map((fc) => `fc:${fc.id}`)
    ],
    modules: [
      {
        id: "quiz",
        label: "Quiz Global",
        icon: "🎯",
        badge: `${allQuizQuestions.length}`,
        tag: "Culture Générale & Concours ICP",
        title: `Quiz Connaissance des Arts (Cours 1 à ${allCourses.length})`,
        intro: "Testez vos connaissances sur tous les cours, filtrez par chapitre ou lancez le mode Rappel Actif.",
        type: "quiz",
        data: allQuizQuestions
      },
      {
        id: "flashcards",
        label: "Toutes les Flashcards",
        icon: "🗂️",
        badge: `${allFlashcards.length}`,
        tag: "Rappel actif transversal",
        title: "Flashcards : Chronologie, Acteurs & Notions",
        intro: "Parcourez l'ensemble des 285 cartes du programme ou ciblez uniquement les cartes à revoir.",
        type: "flashcards",
        data: allFlashcards
      },
      {
        id: "reperes",
        label: "Toutes les Fiches",
        icon: "📖",
        badge: `${allCourses.length} cours`,
        tag: "Synthèses & tableaux",
        title: `Fiches de révision & Repères (Cours 1 à ${allCourses.length})`,
        intro: "Recherchez instantanément une date, un personnage ou un concept à travers tout le programme.",
        type: "reperes",
        courses: allCourses
      }
    ]
  };

  global.PlatformRegistry.registerSubject({
    id: "connaissance-arts",
    title: "Connaissance des Arts",
    subtitle: "Enjeux culturels & Prépa Journalisme (ICP)",
    category: "Culture & Arts",
    icon: "🏛️",
    badge: "Culture & Arts",
    description: "Patrimoine, histoire et politique des musées, culture populaire, art et écologie, pouvoir et contestations (Cours 1 à 5).",
    courses: allCourses,
    data: {
      courses: allCourses,
      quizQuestions: allQuizQuestions,
      flashcards: allFlashcards
    },
    subsections: [globalSubsection, ...courseSubsections]
  });
})(typeof window !== "undefined" ? window : globalThis);
