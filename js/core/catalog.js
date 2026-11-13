/**
 * Catalogue léger des matières disponibles sur la plateforme.
 * Chargé dès l'accueil (index.html) sans embarquer les données lourdes des cours.
 *
 * Pour ajouter une nouvelle matière (ex: Histoire, Philosophie...) :
 * 1. Créer le dossier js/subjects/<id>/ à partir de js/subjects/_template/
 * 2. Ajouter une entrée ci-dessous avec ses scripts et l'aperçu de ses sous-sections.
 */
(function (global) {
  "use strict";

  const CATALOG = [
    {
      id: "grammaire",
      title: "Grammaire & Méthode",
      subtitle: "Analyse grammaticale, Orthographe & Dictées",
      category: "Langue & Méthode",
      icon: "§",
      description: "Nature vs Fonction, découpage syntaxique en 4 étapes, accords difficiles, dictées vocales avec correction mot-à-mot et grille d'examen.",
      scripts: [
        "js/engines/diff.js",
        "js/subjects/grammaire/data-memento.js",
        "js/subjects/grammaire/data-analyse.js",
        "js/subjects/grammaire/data-orthographe.js",
        "js/subjects/grammaire/renderers.js",
        "js/subjects/grammaire/index.js"
      ],
      subsectionsPreview: [
        { id: "analyse", title: "Analyse syntaxique", meta: "15 phrases • 17 QCM • Protocole • Grille" },
        { id: "orthographe", title: "Orthographe & Dictées", meta: "12 défis • 3 dictées vocales" },
        { id: "memento", title: "Mémento & Règles", meta: "Classes & fonctions" }
      ],
      statsSummary: "3 sous-sections • 7 ateliers",
      totalItems: 44
    },
    {
      id: "connaissance-arts",
      title: "Connaissance des Arts",
      subtitle: "Enjeux culturels & Prépa Journalisme (ICP)",
      category: "Culture & Arts",
      icon: "🏛️",
      description: "Patrimoine, histoire et politique des musées, culture populaire, art et écologie, pouvoir et contestations (Cours 1 à 5).",
      scripts: [
        "js/subjects/connaissance-arts/cours-1.js",
        "js/subjects/connaissance-arts/cours-2.js",
        "js/subjects/connaissance-arts/cours-3.js",
        "js/subjects/connaissance-arts/cours-4.js",
        "js/subjects/connaissance-arts/cours-5.js",
        "js/subjects/connaissance-arts/index.js"
      ],
      subsectionsPreview: [
        { id: "global", title: "Révision globale (Cours 1 à 5)", meta: "25 QCM • 285 flashcards" },
        { id: "cours-1", title: "Cours 1 : Conscience patrimoniale", meta: "5 QCM • 49 cartes" },
        { id: "cours-2", title: "Cours 2 : Histoire & enjeux du musée", meta: "5 QCM • 68 cartes" },
        { id: "cours-3", title: "Cours 3 : La culture populaire au musée", meta: "5 QCM • 54 cartes" },
        { id: "cours-4", title: "Cours 4 : Art et écologie", meta: "5 QCM • 41 cartes" },
        { id: "cours-5", title: "Cours 5 : Art, pouvoir et contestations", meta: "5 QCM • 73 cartes" }
      ],
      statsSummary: "6 sous-sections • 5 cours",
      totalItems: 310
    }
  ];

  function getCatalog() {
    return CATALOG.slice();
  }

  function getCatalogEntry(id) {
    return CATALOG.find((item) => item.id === id) || null;
  }

  global.PlatformCatalog = {
    getCatalog,
    getCatalogEntry
  };
})(typeof window !== "undefined" ? window : globalThis);
