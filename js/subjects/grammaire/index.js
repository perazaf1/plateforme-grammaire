/**
 * Grammaire & Méthode — Assemblage modulaire
 * Regroupe les ateliers en 3 sous-sections thématiques.
 */
(function (global) {
  "use strict";

  const parts = global.GrammaireDataParts || {};
  const renderers = global.GrammaireRenderers || {};

  const GRAMMAIRE_DATA = {
    memento: parts.memento,
    dixPhrases: parts.dixPhrases || [],
    dictees: parts.dictees || [],
    demonstrationsCas: parts.demonstrationsCas || [],
    quizQuestions: parts.quizQuestions || [],
    orthographeDefis: parts.orthographeDefis || []
  };

  const phrasesTrackable = GRAMMAIRE_DATA.dixPhrases.map((p) => `item:grammaire:phrase:${p.id}`);
  const quizTrackable = GRAMMAIRE_DATA.quizQuestions.map((q) => `quiz:${q.id}`);
  const orthoTrackable = GRAMMAIRE_DATA.orthographeDefis.map((d) => `item:grammaire:ortho:${d.id}`);

  global.PlatformRegistry.registerSubject({
    id: "grammaire",
    title: "Grammaire & Méthode",
    subtitle: "Analyse grammaticale, Orthographe & Dictées",
    category: "Langue & Méthode",
    icon: "§",
    badge: "Langue & Concours",
    description: "Nature vs Fonction, découpage syntaxique, accords difficiles, dictées vocales avec correction mot-à-mot et grille d'examen.",
    data: GRAMMAIRE_DATA,
    onReset: renderers.resetLocalState,
    onLeave: renderers.stopVoice,
    subsections: [
      {
        id: "analyse",
        shortLabel: "Analyse syntaxique",
        title: "Analyse grammaticale (Nature & Fonction)",
        subtitle: "Identifier la nature, la fonction et appliquer le protocole d'examen en 4 étapes.",
        badge: `${GRAMMAIRE_DATA.dixPhrases.length} phrases • ${GRAMMAIRE_DATA.quizQuestions.length} QCM`,
        trackableIds: [...phrasesTrackable, ...quizTrackable],
        modules: [
          {
            id: "phrases",
            label: "Phrases d'Analyse",
            icon: "📝",
            badge: `${GRAMMAIRE_DATA.dixPhrases.length}`,
            tag: "Exercice d'application",
            title: "L'Atelier des Phrases d'Analyse",
            intro: "Déterminez à la fois la nature précise et la fonction de l'élément ciblé dans chaque phrase.",
            type: "custom",
            render: renderers.renderPhrases
          },
          {
            id: "quiz",
            label: "Quiz Nature & Fonction",
            icon: "🎯",
            badge: `${GRAMMAIRE_DATA.quizQuestions.length}`,
            tag: "Rappel actif",
            title: "Quiz Interactif : Nature vs Fonction",
            intro: "Testez vos réflexes sur les pièges classiques entre classe grammaticale et fonction.",
            type: "quiz",
            data: GRAMMAIRE_DATA.quizQuestions
          },
          {
            id: "methode",
            label: "Protocole 4 Étapes",
            icon: "📐",
            badge: "Pas-à-pas",
            tag: "Méthode pas-à-pas",
            title: "Le Protocole de Découpage en 4 Étapes",
            intro: "Suivez la méthode rigoureuse pour analyser n'importe quelle phrase d'examen, des verbes conjugués jusqu'à la grille complète.",
            type: "custom",
            render: renderers.renderMethode
          },
          {
            id: "grille",
            label: "Grille d'Examen",
            icon: "📋",
            badge: "Outil",
            tag: "Simulateur d'épreuve",
            title: "La Grille d'Examen Officielle",
            intro: "Entraînez-vous à dresser le tableau d'analyse à 4 colonnes puis imprimez-le.",
            type: "custom",
            render: renderers.renderGrille
          }
        ]
      },
      {
        id: "orthographe",
        shortLabel: "Orthographe & Dictées",
        title: "Orthographe, Accords & Dictées Vocales",
        subtitle: "Participes passés, accords complexes, homophones et dictées corrigées au mot près.",
        badge: `${GRAMMAIRE_DATA.orthographeDefis.length} défis • ${GRAMMAIRE_DATA.dictees.length} dictées`,
        trackableIds: orthoTrackable,
        modules: [
          {
            id: "orthographe",
            label: "Orthographe & Accords",
            icon: "✒️",
            badge: `${GRAMMAIRE_DATA.orthographeDefis.length}`,
            tag: "Maîtrise de la langue",
            title: "Défis Orthographe & Règles d'Accord",
            intro: "Accord du participe passé avec COD antéposé, accords sujet-verbe et homophones grammaticaux.",
            type: "custom",
            render: renderers.renderOrtho
          },
          {
            id: "dictees",
            label: "Dictées Interactives",
            icon: "🎧",
            badge: `${GRAMMAIRE_DATA.dictees.length} audio`,
            tag: "Entraînement auditif",
            title: "Dictées Vocales Interactives",
            intro: "Écoutez le texte lu à voix haute (allure dictée ou normale), saisissez votre texte et obtenez une correction mot-à-mot.",
            type: "custom",
            render: renderers.renderDictees
          }
        ]
      },
      {
        id: "memento",
        shortLabel: "Mémento & Règles",
        title: "Mémento & Règles Grammaticales",
        subtitle: "Classes variables et invariables, fonctions verbales, nominales et astuces.",
        badge: "Fiches",
        trackableIds: [],
        modules: [
          {
            id: "memento",
            label: "Fiches & Astuces",
            icon: "📖",
            badge: "Cours",
            tag: "Fiche de cours condensée",
            title: "Mémento & Règles Grammaticales",
            intro: "Toutes les notions fondamentales à portée de clic avec recherche instantanée insensible aux accents.",
            type: "custom",
            render: renderers.renderMemento
          }
        ]
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
