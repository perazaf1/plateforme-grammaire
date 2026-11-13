/**
 * Moteur QCM & Active Recall gamifié, réutilisable pour toute matière / sous-section.
 * Supporte : filtrage par cours/catégorie, mode Rappel Actif (réponse de mémoire avant choix),
 * barre de progression segmentée, combo XP, raccourcis clavier et reprise des erreurs.
 */
(function (global) {
  "use strict";

  const moduleStates = new Map();
  let activeKeyHandler = null;

  function detachKeyHandler() {
    if (activeKeyHandler && typeof document !== "undefined") {
      document.removeEventListener("keydown", activeKeyHandler);
      activeKeyHandler = null;
    }
  }

  function getModuleState(key) {
    if (!moduleStates.has(key)) {
      moduleStates.set(key, {
        filterValue: "all",
        shuffled: false,
        recallMode: false,
        recallRevealed: false,
        recallNote: "",
        retryIds: null,
        orderIds: null,
        currentIndex: 0,
        selectedOption: null,
        isValidated: false,
        lastEarned: 0,
        sessionScore: 0,
        resultsById: {},
        showSummary: false
      });
    }
    return moduleStates.get(key);
  }

  function resetAllQuizStates() {
    moduleStates.clear();
    detachKeyHandler();
  }

  function buildFilterOptions(questions, courses) {
    const distinctCourses = Array.from(new Set(questions.map((q) => q.coursNum).filter(Number.isInteger))).sort((a, b) => a - b);
    if (distinctCourses.length > 1) {
      const courseMap = new Map((courses || []).map((c) => [c.num, c.title]));
      const opts = [{ value: "all", label: `Tous les cours (${questions.length} questions)` }];
      distinctCourses.forEach((num) => {
        const count = questions.filter((q) => q.coursNum === num).length;
        const title = courseMap.get(num);
        opts.push({
          value: String(num),
          label: title ? `Cours ${num} : ${title} (${count})` : `Cours ${num} (${count})`
        });
      });
      return { mode: "cours", label: "Cours :", options: opts };
    }

    const categories = [];
    const seen = new Set();
    questions.forEach((q) => {
      if (q.categorie && !seen.has(q.categorie)) {
        seen.add(q.categorie);
        categories.push(q.categorie);
      }
    });
    if (categories.length > 1) {
      const opts = [{ value: "all", label: `Toutes les catégories (${questions.length} questions)` }];
      categories.forEach((cat) => {
        const count = questions.filter((q) => q.categorie === cat).length;
        opts.push({ value: cat, label: `${cat} (${count})` });
      });
      return { mode: "categorie", label: "Catégorie :", options: opts };
    }

    return null;
  }

  function getFilteredList(questions, filterInfo, state) {
    let base = questions;
    if (Array.isArray(state.retryIds) && state.retryIds.length > 0) {
      const retrySet = new Set(state.retryIds);
      base = questions.filter((q) => retrySet.has(q.id));
    } else if (filterInfo && state.filterValue !== "all") {
      if (filterInfo.mode === "cours") {
        const num = parseInt(state.filterValue, 10);
        base = questions.filter((q) => q.coursNum === num);
      } else {
        base = questions.filter((q) => q.categorie === state.filterValue);
      }
    }

    if (!state.shuffled) {
      return base;
    }

    if (!state.orderIds) {
      const shuffled = global.PlatformUtils.shuffleArray(base);
      state.orderIds = shuffled.map((q) => q.id);
      return shuffled;
    }

    const byId = new Map(base.map((q) => [q.id, q]));
    const ordered = state.orderIds.map((id) => byId.get(id)).filter(Boolean);
    if (ordered.length !== base.length) {
      const reshuffled = global.PlatformUtils.shuffleArray(base);
      state.orderIds = reshuffled.map((q) => q.id);
      return reshuffled;
    }
    return ordered;
  }

  function resetSession(state) {
    state.currentIndex = 0;
    state.selectedOption = null;
    state.isValidated = false;
    state.recallRevealed = false;
    state.recallNote = "";
    state.lastEarned = 0;
    state.sessionScore = 0;
    state.resultsById = {};
    state.showSummary = false;
    state.orderIds = null;
  }

  function renderQuizModule(container, subject, moduleDef, ctx) {
    const { escapeHtml } = global.PlatformUtils;
    const questions = Array.isArray(moduleDef.data) ? moduleDef.data : [];
    const stateKey = `${subject.id}:${moduleDef.id}`;
    const state = getModuleState(stateKey);
    const filterInfo = buildFilterOptions(questions, moduleDef.courses || subject.courses);
    const list = getFilteredList(questions, filterInfo, state);
    const total = list.length;

    detachKeyHandler();

    const toolbarHtml = `
      <div class="filter-toolbar">
        ${filterInfo && !state.retryIds ? `
          <label for="quiz-filter-select" class="filter-toolbar-label">${escapeHtml(filterInfo.label)}</label>
          <div class="filter-select-wrap">
            <select id="quiz-filter-select" class="filter-select" aria-label="${escapeHtml(filterInfo.label)}">
              ${filterInfo.options.map((o) => `
                <option value="${escapeHtml(o.value)}" ${state.filterValue === o.value ? "selected" : ""}>${escapeHtml(o.label)}</option>
              `).join("")}
            </select>
          </div>
        ` : `<div class="filter-toolbar-spacer">${state.retryIds ? '<span class="ar-mode-pill">Mode reprise des erreurs</span>' : ""}</div>`}
        <div class="toolbar-actions-group">
          <button type="button" class="btn-secondary btn-toggle ${state.recallMode ? "active" : ""}" id="quiz-recall-btn" aria-pressed="${state.recallMode}" title="Masquer les options pour tester votre mémoire avant de voir les choix">
            ${state.recallMode ? "✓ Rappel actif" : "Rappel actif"}
          </button>
          ${questions.length > 1 ? `
            <button type="button" class="btn-secondary btn-toggle ${state.shuffled ? "active" : ""}" id="quiz-shuffle-btn" aria-pressed="${state.shuffled}">
              ${state.shuffled ? "✓ Aléatoire" : "Mélanger"}
            </button>
          ` : ""}
        </div>
      </div>
    `;

    if (total === 0) {
      container.innerHTML = `
        ${toolbarHtml}
        <div class="exercise-card empty-state-card">
          <p>Aucune question disponible pour cette sélection.</p>
          <button type="button" class="btn-primary" id="quiz-empty-reset">Afficher toutes les questions</button>
        </div>
      `;
      const resetBtn = container.querySelector("#quiz-empty-reset");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          state.filterValue = "all";
          state.retryIds = null;
          resetSession(state);
          renderQuizModule(container, subject, moduleDef, ctx);
        });
      }
      return;
    }

    if (state.showSummary) {
      const correctIds = list.filter((q) => state.resultsById[q.id] === true).map((q) => q.id);
      const wrongIds = list.filter((q) => state.resultsById[q.id] === false).map((q) => q.id);
      const accuracy = total ? Math.round((correctIds.length / total) * 100) : 0;
      const tierClass = accuracy >= 80 ? "summary-great" : accuracy >= 50 ? "summary-good" : "summary-review";

      container.innerHTML = toolbarHtml + `
        <div class="exercise-card quiz-summary-card ${tierClass}">
          <div class="summary-header">
            <span class="badge-tag">Bilan de série</span>
            <span class="ar-xp-pill">+${state.sessionScore} XP gagnés</span>
          </div>
          <h3>${accuracy >= 80 ? "Excellente maîtrise !" : accuracy >= 50 ? "Bon socle, continuez l'entraînement" : "Série à consolider"}</h3>
          <p class="summary-subtitle">
            Vous avez réussi <strong>${correctIds.length}</strong> question(s) sur <strong>${total}</strong> (${accuracy}% de précision).
          </p>

          <div class="summary-metrics-grid">
            <div class="summary-metric metric-ok">
              <span class="metric-value">${correctIds.length}</span>
              <span class="metric-label">Réussies</span>
            </div>
            <div class="summary-metric metric-ko">
              <span class="metric-value">${wrongIds.length}</span>
              <span class="metric-label">À revoir</span>
            </div>
            <div class="summary-metric metric-xp">
              <span class="metric-value">${accuracy}%</span>
              <span class="metric-label">Précision</span>
            </div>
          </div>

          <div class="action-toolbar">
            <button type="button" class="btn-secondary" id="quiz-restart-all">
              Recommencer toute la série (${questions.length})
            </button>
            ${wrongIds.length > 0 ? `
              <button type="button" class="btn-game-primary" id="quiz-retry-errors">
                Rejouer uniquement mes erreurs (${wrongIds.length}) →
              </button>
            ` : `
              <button type="button" class="btn-primary" id="quiz-restart-clean">
                Nouvelle session →
              </button>
            `}
          </div>
        </div>
      `;

      const restartAll = container.querySelector("#quiz-restart-all");
      if (restartAll) {
        restartAll.addEventListener("click", () => {
          state.retryIds = null;
          resetSession(state);
          renderQuizModule(container, subject, moduleDef, ctx);
        });
      }
      const restartClean = container.querySelector("#quiz-restart-clean");
      if (restartClean) {
        restartClean.addEventListener("click", () => {
          state.retryIds = null;
          resetSession(state);
          renderQuizModule(container, subject, moduleDef, ctx);
        });
      }
      const retryErrors = container.querySelector("#quiz-retry-errors");
      if (retryErrors) {
        retryErrors.addEventListener("click", () => {
          state.retryIds = wrongIds;
          resetSession(state);
          renderQuizModule(container, subject, moduleDef, ctx);
        });
      }
      return;
    }

    if (state.currentIndex >= total) {
      state.currentIndex = 0;
    }

    const current = list[state.currentIndex];
    const tagLabel = current.cours || current.categorie || moduleDef.label;
    const globalStats = global.PlatformState.getStats();
    const comboActive = globalStats.streak >= 3;
    const showOptions = !state.recallMode || state.recallRevealed || state.isValidated;
    const letters = ["A", "B", "C", "D", "E", "F"];

    const segTrackHtml = `
      <div class="session-track" aria-label="Progression de la série">
        ${list.map((q, idx) => {
          const res = state.resultsById[q.id];
          let cls = "track-pip";
          if (idx === state.currentIndex) cls += " current";
          if (res === true) cls += " ok";
          else if (res === false) cls += " ko";
          return `<span class="${cls}" title="Question ${idx + 1}"></span>`;
        }).join("")}
      </div>
    `;

    let cardHtml = `
      <div class="exercise-card quiz-active-card">
        <div class="card-header-row">
          <div class="quiz-header-badges">
            <span class="badge-tag">${escapeHtml(tagLabel)}</span>
            <span class="mono-counter">${state.currentIndex + 1} / ${total}</span>
          </div>
          <div class="quiz-gamify-hud">
            ${comboActive ? `<span class="ar-combo-pill">Série ×${globalStats.streak}</span>` : ""}
            <span class="ar-xp-pill">${state.sessionScore} XP</span>
          </div>
        </div>

        ${segTrackHtml}

        <h3 class="quiz-question-title">${escapeHtml(current.question)}</h3>
    `;

    if (state.recallMode && !showOptions) {
      cardHtml += `
        <div class="recall-prompt-box">
          <label for="quiz-recall-input" class="recall-prompt-label">
            Rappel actif : formulez votre réponse de mémoire avant de voir les choix
          </label>
          <textarea id="quiz-recall-input" class="recall-textarea" rows="2" placeholder="Notez votre idée ou répondez mentalement...">${escapeHtml(state.recallNote)}</textarea>
          <div class="recall-actions-row">
            <button type="button" class="btn-game-primary" id="quiz-reveal-options-btn">
              Révéler les propositions →
            </button>
          </div>
        </div>
      `;
    } else {
      cardHtml += `
        <div class="options-stack">
          ${current.options.map((opt, idx) => {
            let optClass = "option-btn option-gamified";
            if (state.selectedOption === idx) optClass += " selected";
            if (state.isValidated) {
              if (idx === current.reponseCorrecte) optClass += " correct";
              else if (state.selectedOption === idx) optClass += " wrong";
            }
            return `
              <button type="button" class="${optClass}" data-quiz-opt="${idx}" aria-pressed="${state.selectedOption === idx}" ${state.isValidated ? "disabled" : ""}>
                <span class="option-key">${letters[idx] || idx + 1}</span>
                <span class="option-label">${escapeHtml(opt)}</span>
              </button>
            `;
          }).join("")}
        </div>
      `;
    }

    if (state.isValidated) {
      const isSuccess = state.selectedOption === current.reponseCorrecte;
      cardHtml += `
        <div class="feedback-box ${isSuccess ? "success" : "error"}" role="status">
          <div class="feedback-head-row">
            <h4>${isSuccess ? "✓ Bonne réponse !" : "✕ Pas tout à fait"}</h4>
            ${isSuccess && state.lastEarned > 0 ? `<span class="feedback-xp-tag">+${state.lastEarned} XP</span>` : ""}
          </div>
          <div class="feedback-content">
            <p>${escapeHtml(current.explication)}</p>
          </div>
        </div>
      `;
    }

    const isLast = state.currentIndex >= total - 1;
    cardHtml += `
        <div class="action-toolbar">
          <button type="button" class="btn-secondary" id="quiz-prev-btn" ${state.currentIndex === 0 ? "disabled" : ""}>
            ← Précédente
          </button>
          <div class="toolbar-right-group">
            ${!state.isValidated ? `
              <button type="button" class="btn-primary" id="quiz-val-btn" ${showOptions && state.selectedOption !== null ? "" : "disabled"}>
                Valider
              </button>
            ` : `
              <button type="button" class="btn-game-primary" id="quiz-next-btn">
                ${isLast ? "Voir le bilan →" : "Question suivante →"}
              </button>
            `}
          </div>
        </div>

        <p class="kbd-hint">Raccourcis : <code>1–4</code> choisir • <code>Entrée</code> valider / suivant</p>
      </div>
    `;

    container.innerHTML = toolbarHtml + cardHtml;

    const filterSelect = container.querySelector("#quiz-filter-select");
    if (filterSelect) {
      filterSelect.addEventListener("change", (e) => {
        state.filterValue = e.target.value;
        state.retryIds = null;
        resetSession(state);
        renderQuizModule(container, subject, moduleDef, ctx);
      });
    }

    const recallBtn = container.querySelector("#quiz-recall-btn");
    if (recallBtn) {
      recallBtn.addEventListener("click", () => {
        state.recallMode = !state.recallMode;
        state.recallRevealed = false;
        state.recallNote = "";
        renderQuizModule(container, subject, moduleDef, ctx);
      });
    }

    const shuffleBtn = container.querySelector("#quiz-shuffle-btn");
    if (shuffleBtn) {
      shuffleBtn.addEventListener("click", () => {
        state.shuffled = !state.shuffled;
        resetSession(state);
        renderQuizModule(container, subject, moduleDef, ctx);
      });
    }

    const recallInput = container.querySelector("#quiz-recall-input");
    if (recallInput) {
      recallInput.addEventListener("input", (e) => {
        state.recallNote = e.target.value;
      });
    }

    const revealBtn = container.querySelector("#quiz-reveal-options-btn");
    if (revealBtn) {
      revealBtn.addEventListener("click", () => {
        state.recallRevealed = true;
        renderQuizModule(container, subject, moduleDef, ctx);
      });
    }

    container.querySelectorAll("[data-quiz-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedOption = parseInt(btn.getAttribute("data-quiz-opt"), 10);
        renderQuizModule(container, subject, moduleDef, ctx);
      });
    });

    const prevBtn = container.querySelector("#quiz-prev-btn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (state.currentIndex > 0) {
          state.currentIndex -= 1;
          state.selectedOption = null;
          state.isValidated = false;
          state.recallRevealed = false;
          state.recallNote = "";
          renderQuizModule(container, subject, moduleDef, ctx);
        }
      });
    }

    const validateCurrent = () => {
      if (state.isValidated || state.selectedOption === null) return;
      state.isValidated = true;
      const isSuccess = state.selectedOption === current.reponseCorrecte;
      state.resultsById[current.id] = isSuccess;
      const { earned } = global.PlatformState.recordQuizAttempt(subject.id, current.id, isSuccess, 10);
      state.lastEarned = earned;
      if (isSuccess) {
        state.sessionScore += earned;
      }
      if (ctx && typeof ctx.updateHeaderStats === "function") {
        ctx.updateHeaderStats();
      }
      if (ctx && typeof ctx.onProgressChange === "function") {
        ctx.onProgressChange();
      }
      renderQuizModule(container, subject, moduleDef, ctx);
    };

    const advanceNext = () => {
      if (state.currentIndex < total - 1) {
        state.currentIndex += 1;
        state.selectedOption = null;
        state.isValidated = false;
        state.recallRevealed = false;
        state.recallNote = "";
      } else {
        state.showSummary = true;
      }
      renderQuizModule(container, subject, moduleDef, ctx);
    };

    const valBtn = container.querySelector("#quiz-val-btn");
    if (valBtn) valBtn.addEventListener("click", validateCurrent);

    const nextBtn = container.querySelector("#quiz-next-btn");
    if (nextBtn) nextBtn.addEventListener("click", advanceNext);

    if (typeof document !== "undefined") {
      activeKeyHandler = (event) => {
        if (!document.body.contains(container)) {
          detachKeyHandler();
          return;
        }
        const tag = (event.target && event.target.tagName) || "";
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

        if (!state.isValidated && showOptions && ["1", "2", "3", "4"].includes(event.key)) {
          const idx = parseInt(event.key, 10) - 1;
          if (idx >= 0 && idx < current.options.length) {
            event.preventDefault();
            state.selectedOption = idx;
            renderQuizModule(container, subject, moduleDef, ctx);
          }
        } else if (event.key === "Enter") {
          if (state.recallMode && !showOptions) {
            event.preventDefault();
            state.recallRevealed = true;
            renderQuizModule(container, subject, moduleDef, ctx);
          } else if (!state.isValidated && state.selectedOption !== null) {
            event.preventDefault();
            validateCurrent();
          } else if (state.isValidated) {
            event.preventDefault();
            advanceNext();
          }
        }
      };
      document.addEventListener("keydown", activeKeyHandler);
    }
  }

  global.PlatformEngines = global.PlatformEngines || {};
  global.PlatformEngines.renderQuizModule = renderQuizModule;
  global.PlatformEngines.resetAllQuizStates = resetAllQuizStates;
})(typeof window !== "undefined" ? window : globalThis);
