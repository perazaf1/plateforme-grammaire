/**
 * Gestion centralisée des statistiques et de la maîtrise persistées dans localStorage.
 * Assure la migration transparente depuis l'ancienne clé "grammaire_app_stats".
 */
(function (global) {
  "use strict";

  const STORAGE_KEY = "plateforme_entrainement_stats";
  const LEGACY_STORAGE_KEY = "grammaire_app_stats";

  function createDefaultStats() {
    return {
      scoreTotal: 0,
      tentatives: 0,
      streak: 0,
      bestStreak: 0,
      subjectScores: {},
      completedItems: {},
      masteredQuestions: {},
      masteredFlashcards: {},
      mediumFlashcards: {},
      reviewFlashcards: {}
    };
  }

  let stats = createDefaultStats();

  function sanitizeLoaded(parsed) {
    const base = createDefaultStats();
    if (!parsed || typeof parsed !== "object") return base;

    base.scoreTotal = Number.isFinite(parsed.scoreTotal) ? parsed.scoreTotal : 0;
    base.tentatives = Number.isFinite(parsed.tentatives) ? parsed.tentatives : 0;
    base.streak = Number.isFinite(parsed.streak) ? parsed.streak : 0;
    base.bestStreak = Number.isFinite(parsed.bestStreak)
      ? Math.max(parsed.bestStreak, base.streak)
      : base.streak;

    if (parsed.subjectScores && typeof parsed.subjectScores === "object") {
      base.subjectScores = Object.assign({}, parsed.subjectScores);
    }

    if (parsed.completedItems && typeof parsed.completedItems === "object") {
      base.completedItems = Object.assign({}, parsed.completedItems);
    } else if (parsed.completedPhrases && typeof parsed.completedPhrases === "object") {
      Object.keys(parsed.completedPhrases).forEach((id) => {
        if (parsed.completedPhrases[id]) {
          base.completedItems[`grammaire:phrase:${id}`] = true;
        }
      });
    }

    if (parsed.masteredQuestions && typeof parsed.masteredQuestions === "object") {
      base.masteredQuestions = Object.assign({}, parsed.masteredQuestions);
    }
    if (parsed.masteredFlashcards && typeof parsed.masteredFlashcards === "object") {
      base.masteredFlashcards = Object.assign({}, parsed.masteredFlashcards);
    }
    if (parsed.mediumFlashcards && typeof parsed.mediumFlashcards === "object") {
      base.mediumFlashcards = Object.assign({}, parsed.mediumFlashcards);
    }
    if (parsed.reviewFlashcards && typeof parsed.reviewFlashcards === "object") {
      base.reviewFlashcards = Object.assign({}, parsed.reviewFlashcards);
    }

    return base;
  }

  function getStorage() {
    try {
      return typeof global.localStorage !== "undefined" ? global.localStorage : null;
    } catch (_err) {
      return null;
    }
  }

  function load() {
    const store = getStorage();
    if (!store) {
      stats = createDefaultStats();
      return stats;
    }
    try {
      let raw = store.getItem(STORAGE_KEY);
      if (!raw) {
        const legacy = store.getItem(LEGACY_STORAGE_KEY);
        if (legacy) raw = legacy;
      }
      stats = raw ? sanitizeLoaded(JSON.parse(raw)) : createDefaultStats();
    } catch (err) {
      console.warn("Impossible de charger les statistiques depuis localStorage", err);
      stats = createDefaultStats();
    }
    return stats;
  }

  function save() {
    const store = getStorage();
    if (!store) return;
    try {
      store.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (err) {
      console.warn("Impossible de sauvegarder dans localStorage", err);
    }
  }

  function getStats() {
    return stats;
  }

  function getSubjectScore(subjectId) {
    return Number.isFinite(stats.subjectScores[subjectId]) ? stats.subjectScores[subjectId] : 0;
  }

  function isCompleted(itemKey) {
    return Boolean(stats.completedItems[itemKey]);
  }

  function isQuestionMastered(subjectId, questionId) {
    return Boolean(stats.masteredQuestions[`${subjectId}:${questionId}`]);
  }

  function countCompletedByPrefix(prefix) {
    return Object.keys(stats.completedItems).filter((k) => k.startsWith(prefix) && stats.completedItems[k]).length;
  }

  function getComboBonus(streak) {
    if (streak >= 5) return 5;
    if (streak >= 3) return 2;
    return 0;
  }

  function recordAttempt(subjectId, isSuccess, points = 10, uniqueKey = null) {
    stats.tentatives += 1;
    if (isSuccess) {
      let earned = points;
      if (uniqueKey) {
        if (stats.completedItems[uniqueKey]) {
          earned = 0;
        } else {
          stats.completedItems[uniqueKey] = true;
        }
      }
      stats.streak += 1;
      if (stats.streak > stats.bestStreak) {
        stats.bestStreak = stats.streak;
      }
      if (earned > 0) {
        stats.scoreTotal += earned;
        stats.subjectScores[subjectId] = getSubjectScore(subjectId) + earned;
      }
    } else {
      stats.streak = 0;
    }
    save();
    return stats;
  }

  function recordQuizAttempt(subjectId, questionId, isSuccess, basePoints = 10) {
    stats.tentatives += 1;
    let earned = 0;
    if (isSuccess) {
      stats.streak += 1;
      if (stats.streak > stats.bestStreak) {
        stats.bestStreak = stats.streak;
      }
      if (questionId) {
        stats.masteredQuestions[`${subjectId}:${questionId}`] = true;
      }
      earned = basePoints + getComboBonus(stats.streak);
      stats.scoreTotal += earned;
      stats.subjectScores[subjectId] = getSubjectScore(subjectId) + earned;
    } else {
      stats.streak = 0;
    }
    save();
    return { stats, earned };
  }

  function setFlashcardStatus(subjectId, cardId, status) {
    if (status === "mastered") {
      delete stats.reviewFlashcards[cardId];
      delete stats.mediumFlashcards[cardId];
      if (!stats.masteredFlashcards[cardId]) {
        stats.masteredFlashcards[cardId] = true;
        stats.scoreTotal += 5;
        stats.subjectScores[subjectId] = getSubjectScore(subjectId) + 5;
      }
    } else if (status === "medium") {
      delete stats.masteredFlashcards[cardId];
      delete stats.reviewFlashcards[cardId];
      stats.mediumFlashcards[cardId] = true;
    } else if (status === "review") {
      delete stats.masteredFlashcards[cardId];
      delete stats.mediumFlashcards[cardId];
      stats.reviewFlashcards[cardId] = true;
    }
    save();
    return stats;
  }

  function getSubsectionProgress(subjectId, trackableIds) {
    const ids = Array.isArray(trackableIds) ? trackableIds : [];
    const total = ids.length;
    if (total === 0) return { done: 0, total: 0, pct: 0 };

    let done = 0;
    ids.forEach((token) => {
      if (token.startsWith("quiz:")) {
        if (stats.masteredQuestions[`${subjectId}:${token.slice(5)}`]) done += 1;
      } else if (token.startsWith("fc:")) {
        if (stats.masteredFlashcards[token.slice(3)]) done += 1;
      } else if (token.startsWith("item:")) {
        if (stats.completedItems[token.slice(5)]) done += 1;
      }
    });

    return {
      done,
      total,
      pct: Math.round((done / total) * 100)
    };
  }

  function getSubjectMasteryCount(subjectId) {
    const prefixItem = `${subjectId}:`;
    const prefixQuiz = `${subjectId}:`;
    let count = 0;
    Object.keys(stats.completedItems).forEach((k) => {
      if (k.startsWith(prefixItem) && stats.completedItems[k]) count += 1;
    });
    Object.keys(stats.masteredQuestions).forEach((k) => {
      if (k.startsWith(prefixQuiz) && stats.masteredQuestions[k]) count += 1;
    });
    const fcPrefix = subjectId === "connaissance-arts" ? "arts_" : `${subjectId}_`;
    Object.keys(stats.masteredFlashcards).forEach((k) => {
      if (k.startsWith(fcPrefix) && stats.masteredFlashcards[k]) count += 1;
    });
    return count;
  }

  function resetAll() {
    stats = createDefaultStats();
    const store = getStorage();
    if (store) {
      try {
        store.removeItem(STORAGE_KEY);
        store.removeItem(LEGACY_STORAGE_KEY);
      } catch (_err) {
        // ignore storage errors
      }
    }
    return stats;
  }

  global.PlatformState = {
    load,
    save,
    getStats,
    getSubjectScore,
    isCompleted,
    isQuestionMastered,
    countCompletedByPrefix,
    recordAttempt,
    recordQuizAttempt,
    setFlashcardStatus,
    getSubsectionProgress,
    getSubjectMasteryCount,
    resetAll
  };
})(typeof window !== "undefined" ? window : globalThis);
