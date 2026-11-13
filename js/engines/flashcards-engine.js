/**
 * Moteur de Flashcards Active Recall gamifié.
 * Supporte : 3 niveaux d'auto-évaluation (À revoir, Presque, Maîtrisée),
 * réinsertion active des cartes "À revoir" dans la session, raccourcis clavier et progression.
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
        courseFilter: "all",
        categoryFilter: "all",
        onlyReview: false,
        shuffled: false,
        orderIds: null,
        requeuedIds: [],
        currentIndex: 0,
        isFlipped: false
      });
    }
    return moduleStates.get(key);
  }

  function resetAllFlashcardStates() {
    moduleStates.clear();
    detachKeyHandler();
  }

  function resolveCards(subject, moduleDef) {
    if (Array.isArray(moduleDef.data)) return moduleDef.data;
    if (moduleDef.fromCourses && Array.isArray(subject.courses)) {
      return global.PlatformUtils.buildFlashcardsFromCourses(subject.courses, subject.id);
    }
    return [];
  }

  function renderFlashcardsModule(container, subject, moduleDef, ctx) {
    const { escapeHtml, shuffleArray } = global.PlatformUtils;
    const stats = global.PlatformState.getStats();
    const allCards = resolveCards(subject, moduleDef);
    const state = getModuleState(`${subject.id}:${moduleDef.id}`);

    detachKeyHandler();

    const distinctCourses = Array.from(new Set(allCards.map((c) => c.coursNum).filter(Number.isInteger))).sort((a, b) => a - b);
    const courseTitleMap = new Map((subject.courses || []).map((c) => [c.num, c.title]));
    const categories = [];
    const seenCat = new Set();
    allCards.forEach((c) => {
      if (c.categorie && !seenCat.has(c.categorie)) {
        seenCat.add(c.categorie);
        categories.push(c.categorie);
      }
    });

    let baseFiltered = allCards.filter((c) => {
      if (state.courseFilter !== "all" && String(c.coursNum) !== state.courseFilter) return false;
      if (state.categoryFilter !== "all" && c.categorie !== state.categoryFilter) return false;
      if (state.onlyReview && stats.masteredFlashcards[c.id]) return false;
      return true;
    });

    if (state.shuffled) {
      if (!state.orderIds || state.orderIds.length !== baseFiltered.length) {
        baseFiltered = shuffleArray(baseFiltered);
        state.orderIds = baseFiltered.map((c) => c.id);
      } else {
        const map = new Map(baseFiltered.map((c) => [c.id, c]));
        const ordered = state.orderIds.map((id) => map.get(id)).filter(Boolean);
        if (ordered.length === baseFiltered.length) {
          baseFiltered = ordered;
        } else {
          baseFiltered = shuffleArray(baseFiltered);
          state.orderIds = baseFiltered.map((c) => c.id);
        }
      }
    }

    // Ajouter en fin de file les cartes marquées "À revoir" dans la session active
    const cardById = new Map(baseFiltered.map((c) => [c.id, c]));
    const requeuedCards = (state.requeuedIds || []).map((id) => cardById.get(id)).filter(Boolean);
    const deck = baseFiltered.concat(requeuedCards);

    const totalAll = allCards.length;
    const masteredCount = allCards.filter((c) => stats.masteredFlashcards[c.id]).length;
    const mediumCount = allCards.filter((c) => stats.mediumFlashcards && stats.mediumFlashcards[c.id]).length;
    const reviewCount = allCards.filter((c) => stats.reviewFlashcards[c.id]).length;
    const pctMastered = totalAll ? Math.round((masteredCount / totalAll) * 100) : 0;

    const toolbarHtml = `
      <div class="filter-toolbar">
        ${distinctCourses.length > 1 ? `
          <label for="fc-course-select" class="filter-toolbar-label">Cours :</label>
          <div class="filter-select-wrap">
            <select id="fc-course-select" class="filter-select" aria-label="Filtrer les flashcards par cours">
              <option value="all">Tous les cours (${totalAll} cartes)</option>
              ${distinctCourses.map((num) => {
                const count = allCards.filter((card) => card.coursNum === num).length;
                const title = courseTitleMap.get(num) || `Cours ${num}`;
                return `<option value="${num}" ${state.courseFilter === String(num) ? "selected" : ""}>Cours ${num} : ${escapeHtml(title)} (${count})</option>`;
              }).join("")}
            </select>
          </div>
        ` : ""}
        ${categories.length > 1 ? `
          <select id="fc-cat-select" class="filter-select filter-select-compact" aria-label="Filtrer par type">
            <option value="all">Tous types (${allCards.length})</option>
            ${categories.map((cat) => `<option value="${escapeHtml(cat)}" ${state.categoryFilter === cat ? "selected" : ""}>${escapeHtml(cat)}</option>`).join("")}
          </select>
        ` : ""}
        <div class="toolbar-actions-group">
          <button type="button" class="btn-secondary btn-toggle ${state.onlyReview ? "active" : ""}" id="fc-review-toggle" aria-pressed="${state.onlyReview}">
            ${state.onlyReview ? "✓ Non maîtrisées" : "À revoir seulement"}
          </button>
          <button type="button" class="btn-secondary btn-toggle ${state.shuffled ? "active" : ""}" id="fc-shuffle-btn" aria-pressed="${state.shuffled}">
            ${state.shuffled ? "✓ Aléatoire" : "Mélanger"}
          </button>
        </div>
      </div>
    `;

    const progressHtml = `
      <div class="fc-mastery-panel">
        <div class="fc-mastery-stats">
          <span class="fc-stat-pill pill-ok"><strong>${masteredCount}</strong> maîtrisées</span>
          <span class="fc-stat-pill pill-med"><strong>${mediumCount}</strong> à consolider</span>
          <span class="fc-stat-pill pill-rev"><strong>${reviewCount}</strong> à revoir</span>
          <span class="fc-stat-total">${pctMastered}% du paquet</span>
        </div>
        <div class="fc-progress-bar" aria-hidden="true">
          <div class="fc-progress-fill" style="width:${pctMastered}%"></div>
        </div>
      </div>
    `;

    let bodyHtml = "";
    if (deck.length === 0) {
      bodyHtml = `
        <div class="exercise-card empty-state-card">
          <h3>${state.onlyReview ? "Toutes les cartes de cette sélection sont maîtrisées !" : "Aucune flashcard pour ce filtre."}</h3>
          <p>Réinitialisez les filtres pour parcourir l'ensemble du jeu de cartes.</p>
          <button type="button" class="btn-primary" id="fc-reset-filters">Tout afficher</button>
        </div>
      `;
    } else {
      if (state.currentIndex >= deck.length) {
        state.currentIndex = 0;
      }
      const card = deck[state.currentIndex];
      const isRequeued = state.currentIndex >= baseFiltered.length;
      const isMastered = Boolean(stats.masteredFlashcards[card.id]);
      const isMedium = Boolean(stats.mediumFlashcards && stats.mediumFlashcards[card.id]);
      const isReview = Boolean(stats.reviewFlashcards[card.id]);

      let statusChip = "";
      if (isMastered) statusChip = `<span class="stat-chip fc-chip-ok">✓ Maîtrisée</span>`;
      else if (isMedium) statusChip = `<span class="stat-chip fc-chip-med">~ Presque</span>`;
      else if (isReview) statusChip = `<span class="stat-chip fc-chip-review">↻ À revoir</span>`;

      bodyHtml = `
        <div class="exercise-card">
          <div class="card-header-row">
            <div class="quiz-header-badges">
              <span class="badge-tag">${escapeHtml(card.categorie || "Carte")}</span>
              ${isRequeued ? `<span class="ar-mode-pill">Reprise active</span>` : ""}
              ${statusChip}
            </div>
            <div class="mono-counter">${state.currentIndex + 1} / ${deck.length}</div>
          </div>

          <button type="button" class="flashcard-stage ${state.isFlipped ? "flipped" : ""}" id="fc-flip-card" aria-label="${state.isFlipped ? "Afficher la question" : "Révéler la réponse"}">
            <span class="flashcard-side-label">${state.isFlipped ? "Réponse" : "Rappel actif : cliquer ou Espace pour retourner"}</span>
            <span class="flashcard-main-text">${escapeHtml(state.isFlipped ? card.verso : card.recto)}</span>
            ${card.cours ? `<span class="flashcard-context-foot">${escapeHtml(card.cours)}</span>` : ""}
          </button>

          <div class="fc-recall-controls">
            <div class="fc-nav-pair">
              <button type="button" class="btn-secondary" id="fc-prev-btn" ${state.currentIndex === 0 ? "disabled" : ""}>← Préc.</button>
              <button type="button" class="btn-secondary" id="fc-next-btn" ${state.currentIndex === deck.length - 1 ? "disabled" : ""}>Suiv. →</button>
            </div>
            <div class="fc-grade-group" role="group" aria-label="Auto-évaluation Active Recall">
              <button type="button" class="btn-grade grade-review" id="fc-mark-review">
                <span class="grade-key">1</span> À revoir
              </button>
              <button type="button" class="btn-grade grade-medium" id="fc-mark-medium">
                <span class="grade-key">2</span> Presque
              </button>
              <button type="button" class="btn-grade grade-mastered" id="fc-mark-mastered">
                <span class="grade-key">3</span> Maîtrisée (+5 XP)
              </button>
            </div>
          </div>

          <p class="kbd-hint">Raccourcis : <code>Espace</code> retourner • <code>1</code> à revoir • <code>2</code> presque • <code>3</code> maîtrisée</p>
        </div>
      `;
    }

    container.innerHTML = toolbarHtml + progressHtml + bodyHtml;

    const resetDeckView = () => {
      state.currentIndex = 0;
      state.isFlipped = false;
      state.orderIds = null;
      state.requeuedIds = [];
    };

    const courseSel = container.querySelector("#fc-course-select");
    if (courseSel) {
      courseSel.addEventListener("change", (e) => {
        state.courseFilter = e.target.value;
        resetDeckView();
        renderFlashcardsModule(container, subject, moduleDef, ctx);
      });
    }

    const catSel = container.querySelector("#fc-cat-select");
    if (catSel) {
      catSel.addEventListener("change", (e) => {
        state.categoryFilter = e.target.value;
        resetDeckView();
        renderFlashcardsModule(container, subject, moduleDef, ctx);
      });
    }

    const reviewToggle = container.querySelector("#fc-review-toggle");
    if (reviewToggle) {
      reviewToggle.addEventListener("click", () => {
        state.onlyReview = !state.onlyReview;
        resetDeckView();
        renderFlashcardsModule(container, subject, moduleDef, ctx);
      });
    }

    const shuffleBtn = container.querySelector("#fc-shuffle-btn");
    if (shuffleBtn) {
      shuffleBtn.addEventListener("click", () => {
        state.shuffled = !state.shuffled;
        resetDeckView();
        renderFlashcardsModule(container, subject, moduleDef, ctx);
      });
    }

    const resetBtn = container.querySelector("#fc-reset-filters");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.courseFilter = "all";
        state.categoryFilter = "all";
        state.onlyReview = false;
        resetDeckView();
        renderFlashcardsModule(container, subject, moduleDef, ctx);
      });
    }

    const toggleFlip = () => {
      state.isFlipped = !state.isFlipped;
      renderFlashcardsModule(container, subject, moduleDef, ctx);
    };

    const flipBtn = container.querySelector("#fc-flip-card");
    if (flipBtn) flipBtn.addEventListener("click", toggleFlip);

    const prevCard = () => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.isFlipped = false;
        renderFlashcardsModule(container, subject, moduleDef, ctx);
      }
    };

    const nextCard = () => {
      if (state.currentIndex < deck.length - 1) {
        state.currentIndex += 1;
        state.isFlipped = false;
        renderFlashcardsModule(container, subject, moduleDef, ctx);
      }
    };

    const prevBtn = container.querySelector("#fc-prev-btn");
    if (prevBtn) prevBtn.addEventListener("click", prevCard);

    const nextBtn = container.querySelector("#fc-next-btn");
    if (nextBtn) nextBtn.addEventListener("click", nextCard);

    const advanceAfterMark = (status) => {
      const currentCard = deck[state.currentIndex];
      if (!currentCard) return;

      global.PlatformState.setFlashcardStatus(subject.id, currentCard.id, status);

      // Si "À revoir", remettre la carte en fin de session (max 1 fois en attente)
      if (status === "review" && state.requeuedIds.filter((id) => id === currentCard.id).length < 2) {
        state.requeuedIds.push(currentCard.id);
      }

      if (ctx && typeof ctx.updateHeaderStats === "function") {
        ctx.updateHeaderStats();
      }
      if (ctx && typeof ctx.onProgressChange === "function") {
        ctx.onProgressChange();
      }

      state.isFlipped = false;
      if (state.currentIndex < deck.length + (status === "review" ? 1 : 0) - 1) {
        state.currentIndex += 1;
      }
      renderFlashcardsModule(container, subject, moduleDef, ctx);
    };

    const reviewBtn = container.querySelector("#fc-mark-review");
    if (reviewBtn) reviewBtn.addEventListener("click", () => advanceAfterMark("review"));

    const mediumBtn = container.querySelector("#fc-mark-medium");
    if (mediumBtn) mediumBtn.addEventListener("click", () => advanceAfterMark("medium"));

    const masteredBtn = container.querySelector("#fc-mark-mastered");
    if (masteredBtn) masteredBtn.addEventListener("click", () => advanceAfterMark("mastered"));

    if (typeof document !== "undefined" && deck.length > 0) {
      activeKeyHandler = (event) => {
        if (!document.body.contains(container)) {
          detachKeyHandler();
          return;
        }
        const tag = (event.target && event.target.tagName) || "";
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

        if (event.code === "Space") {
          event.preventDefault();
          toggleFlip();
        } else if (event.key === "1") {
          event.preventDefault();
          advanceAfterMark("review");
        } else if (event.key === "2") {
          event.preventDefault();
          advanceAfterMark("medium");
        } else if (event.key === "3") {
          event.preventDefault();
          advanceAfterMark("mastered");
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          prevCard();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          nextCard();
        }
      };
      document.addEventListener("keydown", activeKeyHandler);
    }
  }

  global.PlatformEngines = global.PlatformEngines || {};
  global.PlatformEngines.renderFlashcardsModule = renderFlashcardsModule;
  global.PlatformEngines.resetAllFlashcardStates = resetAllFlashcardStates;
})(typeof window !== "undefined" ? window : globalThis);
