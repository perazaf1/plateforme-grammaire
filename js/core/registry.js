/**
 * Registre central des matières et utilitaires partagés de la plateforme.
 * Compatible navigateur (file://, HTTP, Netlify) et tests Node (vm).
 */
(function (global) {
  "use strict";

  const subjects = [];
  const subjectMap = new Map();

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function normalizeSearch(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function shuffleArray(list) {
    const copy = Array.isArray(list) ? list.slice() : [];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  /**
   * Transforme les tableaux récapitulatifs d'un cours (chronologie, noms, notions)
   * en jeu de flashcards prêtes pour le moteur de rappel actif.
   */
  function buildFlashcardsFromCourses(courses, prefix = "fc") {
    const cards = [];
    (courses || []).forEach((course) => {
      const coursLabel = `Cours ${course.num} : ${course.title}`;
      (course.chronologie || []).forEach(([date, event], idx) => {
        cards.push({
          id: `${prefix}_c${course.num}_chr_${idx}`,
          coursNum: course.num,
          cours: coursLabel,
          categorie: "Chronologie",
          recto: `Date clé (${course.title}) : ${date}`,
          verso: event
        });
      });
      (course.noms || []).forEach(([nom, role], idx) => {
        cards.push({
          id: `${prefix}_c${course.num}_nom_${idx}`,
          coursNum: course.num,
          cours: coursLabel,
          categorie: "Acteur clé",
          recto: `Qui est / que retenir de : ${nom} ?`,
          verso: role
        });
      });
      (course.notions || []).forEach(([notion, def], idx) => {
        cards.push({
          id: `${prefix}_c${course.num}_not_${idx}`,
          coursNum: course.num,
          cours: coursLabel,
          categorie: "Notion",
          recto: `Définir : ${notion}`,
          verso: def
        });
      });
    });
    return cards;
  }

  function normalizeSubsections(subject) {
    if (Array.isArray(subject.subsections) && subject.subsections.length > 0) {
      return subject.subsections;
    }
    if (Array.isArray(subject.modules) && subject.modules.length > 0) {
      return [
        {
          id: "general",
          shortLabel: "Entraînement",
          title: subject.title,
          subtitle: subject.subtitle || "",
          badge: `${subject.modules.length} modules`,
          modules: subject.modules
        }
      ];
    }
    return [];
  }

  function registerSubject(subject) {
    if (!subject || !subject.id || !subject.title) {
      throw new Error("Une matière doit définir au minimum { id, title, subsections/modules }.");
    }
    const subsections = normalizeSubsections(subject);
    if (subsections.length === 0) {
      throw new Error(`La matière "${subject.id}" doit contenir au moins une sous-section ou un module.`);
    }

    const normalized = Object.assign({}, subject, {
      subsections,
      modules: Array.isArray(subject.modules) && subject.modules.length > 0
        ? subject.modules
        : subsections.flatMap((s) => s.modules || [])
    });

    if (subjectMap.has(normalized.id)) {
      const idx = subjects.findIndex((s) => s.id === normalized.id);
      subjects[idx] = normalized;
    } else {
      subjects.push(normalized);
    }
    subjectMap.set(normalized.id, normalized);
    return normalized;
  }

  function getSubjects() {
    return subjects.slice();
  }

  function getSubject(id) {
    return subjectMap.get(id) || null;
  }

  function getSubsection(subject, subsectionId) {
    if (!subject || !Array.isArray(subject.subsections)) return null;
    return subject.subsections.find((s) => s.id === subsectionId) || null;
  }

  function findSubsectionByModule(subject, moduleId) {
    if (!subject || !Array.isArray(subject.subsections)) return null;
    return subject.subsections.find((s) => (s.modules || []).some((m) => m.id === moduleId)) || null;
  }

  global.PlatformUtils = {
    escapeHtml,
    normalizeSearch,
    shuffleArray,
    buildFlashcardsFromCourses
  };

  global.PlatformRegistry = {
    registerSubject,
    getSubjects,
    getSubject,
    getSubsection,
    findSubsectionByModule
  };
})(typeof window !== "undefined" ? window : globalThis);
