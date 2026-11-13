/**
 * Contrôleur partagé de l'en-tête (statistiques globales XP, série et réinitialisation).
 */
(function (global) {
  "use strict";

  function updateHeaderStats(activeSubjectId = null) {
    const stats = global.PlatformState.getStats();
    const totalEl = document.getElementById("stat-score-total");
    const streakEl = document.getElementById("stat-streak");
    const streakChip = document.getElementById("stat-streak-chip");

    if (totalEl) totalEl.textContent = `${stats.scoreTotal} XP`;
    if (streakEl) streakEl.textContent = `${stats.streak}`;
    if (streakChip) {
      streakChip.classList.toggle("is-hot", stats.streak >= 3);
      streakChip.title = `Série actuelle : ${stats.streak} • Record : ${stats.bestStreak || stats.streak}`;
    }

    if (activeSubjectId) {
      const subjScoreEl = document.getElementById("workspace-subject-score");
      if (subjScoreEl) {
        subjScoreEl.textContent = `${global.PlatformState.getSubjectScore(activeSubjectId)} XP dans cette matière`;
      }
    }
  }

  function bindResetButton(onAfterReset) {
    const resetBtn = document.getElementById("reset-all-stats");
    if (!resetBtn) return;

    resetBtn.addEventListener("click", () => {
      if (!confirm("Réinitialiser l'ensemble de votre score, série et progression ?")) return;
      global.PlatformState.resetAll();
      if (global.PlatformEngines) {
        if (typeof global.PlatformEngines.resetAllQuizStates === "function") {
          global.PlatformEngines.resetAllQuizStates();
        }
        if (typeof global.PlatformEngines.resetAllFlashcardStates === "function") {
          global.PlatformEngines.resetAllFlashcardStates();
        }
      }
      if (global.PlatformRegistry) {
        global.PlatformRegistry.getSubjects().forEach((subj) => {
          if (typeof subj.onReset === "function") subj.onReset();
        });
      }
      updateHeaderStats();
      if (typeof onAfterReset === "function") {
        onAfterReset();
      }
    });
  }

  global.PlatformHeader = {
    updateHeaderStats,
    bindResetButton
  };
})(typeof window !== "undefined" ? window : globalThis);
