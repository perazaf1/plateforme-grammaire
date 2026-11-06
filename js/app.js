/**
 * Grammaire & Méthode — Logique applicative
 * Architecture modulaire sans dépendance externe
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // ÉTAT GLOBAL DE L'APPLICATION
  // ==========================================
  const state = {
    activeTab: "phrases",
    stats: {
      scoreTotal: 0,
      tentatives: 0,
      streak: 0,
      completedPhrases: {},
      quizScore: 0,
      orthoScore: 0,
      dicteeScore: 0,
      artsScore: 0
    },
    // État spécifique aux phrases d'application
    dixPhrases: {
      currentIndex: 0,
      selectedNature: null,
      selectedFonction: null,
      isValidated: false
    },
    // État Dictées Interactives
    dictees: {
      currentIndex: 0,
      currentPhraseIndex: 0,
      speedRate: 0.8,
      isPlaying: false,
      userText: "",
      isValidated: false,
      score: null,
      diff: null
    },
    // État Quiz Grammaire
    quiz: {
      currentIndex: 0,
      selectedOption: null,
      isValidated: false,
      score: 0
    },
    // État Protocole en 4 étapes
    methode: {
      currentCas: "cas1",
      currentEtape: 1
    },
    // État Orthographe
    ortho: {
      currentIndex: 0,
      selectedOption: null,
      isValidated: false,
      score: 0
    },
    // État Arts
    arts: {
      currentIndex: 0,
      selectedOption: null,
      isValidated: false,
      score: 0
    }
  };

  // Chargement depuis localStorage
  loadPersistedStats();

  // ==========================================
  // GESTION DES ONGLETS & ROUTING
  // ==========================================
  function initNavigation() {
    const tabButtons = document.querySelectorAll(".nav-tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    function switchTab(tabId) {
      if (!tabId) return;
      state.activeTab = tabId;

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      tabButtons.forEach(btn => {
        const isActive = btn.getAttribute("data-tab") === tabId;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", isActive);
      });

      tabPanes.forEach(pane => {
        pane.classList.toggle("active", pane.id === `tab-${tabId}`);
      });

      window.location.hash = tabId;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tabId = btn.getAttribute("data-tab");
        switchTab(tabId);
      });
    });

    // Hash initial ou par défaut
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && document.getElementById(`tab-${initialHash}`)) {
      switchTab(initialHash);
    } else {
      switchTab("phrases");
    }
  }

  // ==========================================
  // MODULE 1 : L'EXERCICE DES 10 PHRASES
  // ==========================================
  function initDixPhrasesModule() {
    const container = document.getElementById("dix-phrases-container");
    if (!container) return;

    renderDixPhrases();
  }

  function renderDixPhrases() {
    const container = document.getElementById("dix-phrases-container");
    const current = APP_DATA.dixPhrases[state.dixPhrases.currentIndex];
    const total = APP_DATA.dixPhrases.length;

    const isDone = state.stats.completedPhrases[current.id] !== undefined;

    let selectorHtml = `<div class="card-header-row">
      <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
        <span class="badge-tag">${current.serie || 'Exercice officiel'} • Phrase ${current.numero} sur ${total}</span>
        ${isDone ? '<span class="stat-chip" style="background:#eaf6ee; color:#176d3f; border-color:#bce1ca;">✓ Complétée</span>' : ''}
      </div>
      <div class="progress-indicator">
        Progression : ${Object.keys(state.stats.completedPhrases).length} / ${total}
      </div>
    </div>`;

    // Grille de navigation rapide 1 à 10
    let paginationBtns = `<div style="display:flex; gap:0.35rem; margin-bottom:1.25rem; flex-wrap:wrap;">`;
    for (let i = 0; i < total; i++) {
      const p = APP_DATA.dixPhrases[i];
      const activeClass = i === state.dixPhrases.currentIndex ? 'style="background:var(--accent-navy); color:#fff; font-weight:bold;"' : '';
      const checkMark = state.stats.completedPhrases[p.id] ? ' ✓' : '';
      paginationBtns += `<button class="btn-secondary" style="padding:0.35rem 0.65rem; font-size:0.85rem;" ${activeClass} data-phrase-idx="${i}">Phrase ${i+1}${checkMark}</button>`;
    }
    paginationBtns += `</div>`;

    // Phrase ciblée
    const sentenceHtml = `
      <div class="sentence-box">
        ${current.texteAffiche}
      </div>
      <p style="margin-bottom:1.25rem; font-size:0.95rem; color:var(--ink-secondary);">
        Consigne : Analysez l'élément surligné <strong>« ${current.elementCible} »</strong> en déterminant sa <strong>nature grammaticale</strong> et sa <strong>fonction dans la phrase</strong>.
      </p>
    `;

    // Choix Nature
    let natureOptions = `<div class="choice-column">
      <h4>1. Nature (Classe grammaticale) <span class="hint">« Qu'est-ce que c'est ? »</span></h4>
      <div class="options-stack">`;
    current.choixNature.forEach((opt, idx) => {
      let optClass = "option-btn";
      if (state.dixPhrases.selectedNature === opt) optClass += " selected";
      if (state.dixPhrases.isValidated) {
        if (opt === current.natureExacte) optClass += " correct";
        else if (state.dixPhrases.selectedNature === opt) optClass += " wrong";
      }
      natureOptions += `<button class="${optClass}" data-type="nature" data-val="${opt}" ${state.dixPhrases.isValidated ? "disabled" : ""}>
        <span>${opt}</span>
        <span class="radio-indicator"></span>
      </button>`;
    });
    natureOptions += `</div></div>`;

    // Choix Fonction
    let fonctionOptions = `<div class="choice-column">
      <h4>2. Fonction dans la phrase <span class="hint">« À quoi sert-il ici ? »</span></h4>
      <div class="options-stack">`;
    current.choixFonction.forEach((opt, idx) => {
      let optClass = "option-btn";
      if (state.dixPhrases.selectedFonction === opt) optClass += " selected";
      if (state.dixPhrases.isValidated) {
        if (opt === current.fonctionExacte) optClass += " correct";
        else if (state.dixPhrases.selectedFonction === opt) optClass += " wrong";
      }
      fonctionOptions += `<button class="${optClass}" data-type="fonction" data-val="${opt}" ${state.dixPhrases.isValidated ? "disabled" : ""}>
        <span>${opt}</span>
        <span class="radio-indicator"></span>
      </button>`;
    });
    fonctionOptions += `</div></div>`;

    // Boutons d'action
    const canValidate = state.dixPhrases.selectedNature && state.dixPhrases.selectedFonction && !state.dixPhrases.isValidated;
    const actionsHtml = `
      <div class="action-toolbar">
        <div style="display:flex; gap:0.5rem;">
          <button class="btn-secondary" id="phrase-prev-btn" ${state.dixPhrases.currentIndex === 0 ? "disabled" : ""}>
            ← Phrase précédente
          </button>
          <button class="btn-secondary" id="phrase-next-btn" ${state.dixPhrases.currentIndex === total - 1 ? "disabled" : ""}>
            Phrase suivante →
          </button>
        </div>
        <div>
          ${!state.dixPhrases.isValidated ? `
            <button class="btn-primary" id="phrase-validate-btn" ${canValidate ? "" : "disabled"}>
              Valider mon analyse
            </button>
          ` : `
            <button class="btn-primary" id="phrase-retry-btn">
              Réessayer cette phrase
            </button>
          `}
        </div>
      </div>
    `;

    // Feedback après validation
    let feedbackHtml = "";
    if (state.dixPhrases.isValidated) {
      const isNatureOk = state.dixPhrases.selectedNature === current.natureExacte;
      const isFonctionOk = state.dixPhrases.selectedFonction === current.fonctionExacte;
      const allOk = isNatureOk && isFonctionOk;

      feedbackHtml = `
        <div class="feedback-box ${allOk ? 'success' : 'error'}">
          <h4>
            ${allOk ? '✓ Analyse parfaitement exacte !' : '✕ Rectification pédagogique'}
          </h4>
          <div class="feedback-content">
            <p style="margin-bottom:0.5rem;">
              <strong>Nature correcte :</strong> ${current.natureExacte} ${current.natureDetaillee ? `(${current.natureDetaillee})` : ''}
              <br>
              <strong>Fonction correcte :</strong> ${current.fonctionExacte}
            </p>
            <p>${current.explication}</p>
            ${current.piege ? `
              <div class="feedback-details">
                <strong>Attention au piège :</strong> ${current.piege}
              </div>
            ` : ''}
            <div class="propositions-breakdown">
              <strong>Découpage de la phrase :</strong> ${current.decoupagePropositions}
              <br>
              <strong>Type :</strong> ${current.typeProposition}
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = selectorHtml + paginationBtns + sentenceHtml + `<div class="decision-dual-grid">${natureOptions}${fonctionOptions}</div>` + feedbackHtml + actionsHtml;

    // Attachement des écouteurs
    container.querySelectorAll(".option-btn:not(:disabled)").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-type");
        const val = btn.getAttribute("data-val");
        if (type === "nature") {
          state.dixPhrases.selectedNature = val;
        } else {
          state.dixPhrases.selectedFonction = val;
        }
        renderDixPhrases();
      });
    });

    container.querySelectorAll("[data-phrase-idx]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.dixPhrases.currentIndex = parseInt(btn.getAttribute("data-phrase-idx"), 10);
        state.dixPhrases.selectedNature = null;
        state.dixPhrases.selectedFonction = null;
        state.dixPhrases.isValidated = false;
        renderDixPhrases();
      });
    });

    const valBtn = container.querySelector("#phrase-validate-btn");
    if (valBtn) {
      valBtn.addEventListener("click", () => {
        state.dixPhrases.isValidated = true;
        const isOk = state.dixPhrases.selectedNature === current.natureExacte &&
                     state.dixPhrases.selectedFonction === current.fonctionExacte;
        
        state.stats.tentatives++;
        if (isOk) {
          state.stats.scoreTotal += 10;
          state.stats.streak++;
          state.stats.completedPhrases[current.id] = true;
        } else {
          state.stats.streak = 0;
        }
        savePersistedStats();
        updateHeaderStats();
        renderDixPhrases();
      });
    }

    const retryBtn = container.querySelector("#phrase-retry-btn");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        state.dixPhrases.selectedNature = null;
        state.dixPhrases.selectedFonction = null;
        state.dixPhrases.isValidated = false;
        renderDixPhrases();
      });
    }

    const prevBtn = container.querySelector("#phrase-prev-btn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (state.dixPhrases.currentIndex > 0) {
          state.dixPhrases.currentIndex--;
          state.dixPhrases.selectedNature = null;
          state.dixPhrases.selectedFonction = null;
          state.dixPhrases.isValidated = false;
          renderDixPhrases();
        }
      });
    }

    const nextBtn = container.querySelector("#phrase-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.dixPhrases.currentIndex < total - 1) {
          state.dixPhrases.currentIndex++;
          state.dixPhrases.selectedNature = null;
          state.dixPhrases.selectedFonction = null;
          state.dixPhrases.isValidated = false;
          renderDixPhrases();
        }
      });
    }
  }

  // ==========================================
  // MODULE 2 : QUIZ INTERACTIF GRAMMAIRE
  // ==========================================
  function initQuizModule() {
    renderQuiz();
  }

  function renderQuiz() {
    const container = document.getElementById("quiz-container");
    if (!container) return;

    const questions = APP_DATA.quizQuestions;
    const current = questions[state.quiz.currentIndex];
    const total = questions.length;

    let html = `
      <div class="card-header-row">
        <span class="badge-tag">${current.categorie} • Question ${state.quiz.currentIndex + 1} / ${total}</span>
        <div class="progress-indicator">Score Quiz : ${state.quiz.score} pt(s)</div>
      </div>
      <h3 style="font-size:1.25rem; margin-bottom:1.25rem; color:var(--ink-primary);">
        ${current.question}
      </h3>
      <div class="options-stack" style="margin-bottom:1.5rem;">
    `;

    current.options.forEach((opt, idx) => {
      let optClass = "option-btn";
      if (state.quiz.selectedOption === idx) optClass += " selected";
      if (state.quiz.isValidated) {
        if (idx === current.reponseCorrecte) optClass += " correct";
        else if (state.quiz.selectedOption === idx) optClass += " wrong";
      }
      html += `<button class="${optClass}" data-quiz-opt="${idx}" ${state.quiz.isValidated ? "disabled" : ""}>
        <span>${opt}</span>
      </button>`;
    });

    html += `</div>`;

    if (state.quiz.isValidated) {
      const isSuccess = state.quiz.selectedOption === current.reponseCorrecte;
      html += `
        <div class="feedback-box ${isSuccess ? 'success' : 'error'}">
          <h4>${isSuccess ? '✓ Bonne réponse !' : '✕ Erreur'}</h4>
          <div class="feedback-content">
            <p>${current.explication}</p>
          </div>
        </div>
      `;
    }

    html += `
      <div class="action-toolbar">
        <div></div>
        <div>
          ${!state.quiz.isValidated ? `
            <button class="btn-primary" id="quiz-validate-btn" ${state.quiz.selectedOption !== null ? "" : "disabled"}>
              Confirmer ma réponse
            </button>
          ` : `
            <button class="btn-primary" id="quiz-next-btn">
              ${state.quiz.currentIndex < total - 1 ? 'Question suivante →' : 'Recommencer le quiz'}
            </button>
          `}
        </div>
      </div>
    `;

    container.innerHTML = html;

    container.querySelectorAll("[data-quiz-opt]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.quiz.selectedOption = parseInt(btn.getAttribute("data-quiz-opt"), 10);
        renderQuiz();
      });
    });

    const valBtn = container.querySelector("#quiz-validate-btn");
    if (valBtn) {
      valBtn.addEventListener("click", () => {
        state.quiz.isValidated = true;
        const isSuccess = state.quiz.selectedOption === current.reponseCorrecte;
        state.stats.tentatives++;
        if (isSuccess) {
          state.quiz.score += 10;
          state.stats.scoreTotal += 10;
          state.stats.streak++;
        } else {
          state.stats.streak = 0;
        }
        savePersistedStats();
        updateHeaderStats();
        renderQuiz();
      });
    }

    const nextBtn = container.querySelector("#quiz-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.quiz.currentIndex < total - 1) {
          state.quiz.currentIndex++;
        } else {
          state.quiz.currentIndex = 0;
          state.quiz.score = 0;
        }
        state.quiz.selectedOption = null;
        state.quiz.isValidated = false;
        renderQuiz();
      });
    }
  }

  // ==========================================
  // MODULE 3 : LE PROTOCOLE EN 4 ÉTAPES
  // ==========================================
  function initMethodeModule() {
    renderMethode();
  }

  function renderMethode() {
    const container = document.getElementById("methode-container");
    if (!container) return;

    const casData = APP_DATA.demonstrationsCas.find(c => c.id === state.methode.currentCas) || APP_DATA.demonstrationsCas[0];

    let casSelector = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div style="display:flex; gap:0.5rem;">
          <button class="btn-secondary ${state.methode.currentCas === 'cas1' ? 'active' : ''}" data-cas="cas1">
            Cas n°1 : Phrase simple (1 prop.)
          </button>
          <button class="btn-secondary ${state.methode.currentCas === 'cas2' ? 'active' : ''}" data-cas="cas2">
            Cas n°2 : Phrase complexe (2 props.)
          </button>
        </div>
      </div>
      <div class="sentence-box" style="margin-bottom:1.5rem;">
        « ${casData.phrase} »
      </div>
    `;

    // Stepper boutons
    let stepperNav = `<div class="stepper-nav">`;
    APP_DATA.memento.methode4Etapes.forEach(et => {
      const isActive = et.etape === state.methode.currentEtape;
      stepperNav += `
        <button class="step-btn ${isActive ? 'active' : ''}" data-etape="${et.etape}">
          <span class="step-num">${et.etape}</span>
          <span>Étape ${et.etape} : ${et.titre.split(" ")[0]}...</span>
        </button>
      `;
    });
    stepperNav += `</div>`;

    // Contenu selon l'étape choisie
    let stepContent = `<div class="step-content-box">`;
    const etapeDef = APP_DATA.memento.methode4Etapes[state.methode.currentEtape - 1];
    stepContent += `
      <h3 style="color:var(--accent-navy); margin-bottom:0.25rem;">
        Étape ${etapeDef.etape} : ${etapeDef.titre}
      </h3>
      <p style="font-size:0.9rem; color:var(--accent-burgundy); font-weight:600; margin-bottom:1rem;">
        Règle d'or : ${etapeDef.regle}
      </p>
      <p style="margin-bottom:1.25rem;">${etapeDef.action}</p>
    `;

    if (state.methode.currentEtape === 1) {
      stepContent += `
        <div style="background:var(--bg-surface-soft); padding:1.25rem; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <h4 style="margin-bottom:0.5rem; color:var(--accent-navy);">1. Repérage des verbes conjugués :</h4>
          <ul style="margin-left:1.5rem; margin-bottom:1rem;">
            ${casData.etape1.verbesConjugues.map(v => `<li>Verbe : <strong>${v.verbe}</strong> (infinitif : <em>${v.infinitif}</em>, forme : ${v.personne})</li>`).join("")}
          </ul>
          <h4 style="margin-bottom:0.5rem; color:var(--accent-navy);">2. Découpage en propositions :</h4>
          <p style="font-family:var(--font-mono); font-size:1.05rem; background:#fff; padding:0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-light); margin-bottom:0.75rem;">
            ${casData.etape1.decoupage}
          </p>
          <p><strong>Nature de la structure :</strong> ${casData.etape1.natureProposition}</p>
        </div>
      `;
    } else if (state.methode.currentEtape === 2) {
      stepContent += `
        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${casData.etape2.blocs ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
              ${casData.etape2.blocs.map(b => `
                <div style="background:var(--bg-surface-soft); padding:1rem; border-radius:var(--radius-sm); border-left:4px solid var(--accent-navy);">
                  <strong style="font-size:1.05rem; color:var(--accent-navy);">${b.bloc}</strong>
                  <p style="font-size:0.85rem; color:var(--ink-muted); margin:0.25rem 0;">Question : ${b.question}</p>
                  <p style="font-size:0.9rem; font-weight:600; color:var(--accent-burgundy);">→ ${b.fonction}</p>
                </div>
              `).join("")}
            </div>
          ` : `
            ${casData.etape2.propositions.map(prop => `
              <div style="background:var(--bg-surface-soft); padding:1rem; border-radius:var(--radius-sm); margin-bottom:0.75rem;">
                <h4 style="color:var(--accent-navy); margin-bottom:0.75rem;">${prop.nom}</h4>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.75rem;">
                  ${prop.blocs.map(b => `
                    <div style="background:#fff; padding:0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
                      <strong>${b.bloc}</strong>
                      <p style="font-size:0.8rem; color:var(--ink-muted); margin:0.2rem 0;">${b.question}</p>
                      <p style="font-size:0.85rem; font-weight:600; color:var(--accent-burgundy);">→ ${b.fonction}</p>
                    </div>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          `}
        </div>
      `;
    } else if (state.methode.currentEtape === 3) {
      stepContent += `
        <div class="exam-table-container">
          <table class="exam-table">
            <thead>
              <tr>
                <th style="width:25%;">Mot du bloc</th>
                <th style="width:35%;">Nature précise</th>
                <th style="width:40%;">Fonction interne au bloc</th>
              </tr>
            </thead>
            <tbody>
              ${casData.etape3.mots.map(m => `
                <tr>
                  <td><strong>${m.mot}</strong></td>
                  <td>${m.nature}</td>
                  <td>${m.fonctionInterne}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    } else if (state.methode.currentEtape === 4) {
      stepContent += `
        <p style="margin-bottom:1rem;">Voici le rendu complet tel qu'il doit figurer sur votre copie d'examen :</p>
        <div class="exam-table-container">
          <table class="exam-table">
            <thead>
              <tr>
                <th>1. Groupes de mots</th>
                <th>2. Fonction du groupe</th>
                <th>3. Nature mot par mot</th>
                <th>4. Fonction interne du mot</th>
              </tr>
            </thead>
            <tbody>
              ${casData.etape3.mots.map(m => `
                <tr>
                  <td><strong>${m.mot}</strong></td>
                  <td style="color:var(--accent-burgundy);">${m.fonctionInterne.includes('Sujet') ? 'Sujet' : m.fonctionInterne.includes('COD') ? 'COD' : m.fonctionInterne.includes('COI') ? 'COI' : m.fonctionInterne.includes('lieu') ? 'CC de lieu' : 'Élément du bloc'}</td>
                  <td>${m.nature}</td>
                  <td>${m.fonctionInterne}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div style="display:flex; justify-content:flex-end; margin-top:1rem;">
          <button class="btn-secondary" onclick="window.print()">
            🖨️ Imprimer la grille pour réviser
          </button>
        </div>
      `;
    }

    stepContent += `</div>`;

    container.innerHTML = casSelector + stepperNav + stepContent;

    container.querySelectorAll("[data-cas]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.methode.currentCas = btn.getAttribute("data-cas");
        state.methode.currentEtape = 1;
        renderMethode();
      });
    });

    container.querySelectorAll("[data-etape]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.methode.currentEtape = parseInt(btn.getAttribute("data-etape"), 10);
        renderMethode();
      });
    });
  }

  // ==========================================
  // MODULE 4 : DÉFIS ORTHOGRAPHE & ACCORDS
  // ==========================================
  function initOrthoModule() {
    renderOrtho();
  }

  function renderOrtho() {
    const container = document.getElementById("ortho-container");
    if (!container) return;

    const list = APP_DATA.orthographeDefis;
    const current = list[state.ortho.currentIndex];
    const total = list.length;

    let html = `
      <div class="card-header-row">
        <span class="badge-tag">${current.titre} • Défi ${state.ortho.currentIndex + 1} / ${total}</span>
        <div class="progress-indicator">Score Orthographe : ${state.ortho.score} pt(s)</div>
      </div>
      <div class="fill-gap-sentence">
        ${current.enonce.replace("____", `<span class="gap-highlight">${state.ortho.selectedOption !== null ? current.options[state.ortho.selectedOption] : " [ ? ] "}</span>`)}
      </div>
      <p style="margin-bottom:1rem; font-size:0.95rem; color:var(--ink-secondary);">
        Choisissez la graphie exacte pour compléter la phrase :
      </p>
      <div class="options-stack" style="margin-bottom:1.5rem;">
    `;

    current.options.forEach((opt, idx) => {
      let optClass = "option-btn";
      if (state.ortho.selectedOption === idx) optClass += " selected";
      if (state.ortho.isValidated) {
        if (idx === current.reponseCorrecte) optClass += " correct";
        else if (state.ortho.selectedOption === idx) optClass += " wrong";
      }
      html += `<button class="${optClass}" data-ortho-opt="${idx}" ${state.ortho.isValidated ? "disabled" : ""}>
        <span>${opt}</span>
      </button>`;
    });

    html += `</div>`;

    if (state.ortho.isValidated) {
      const isOk = state.ortho.selectedOption === current.reponseCorrecte;
      html += `
        <div class="feedback-box ${isOk ? 'success' : 'error'}">
          <h4>${isOk ? '✓ Accord / Orthographe parfaite !' : '✕ Erreur de graphie'}</h4>
          <div class="feedback-content">
            <p><strong>Règle d'or :</strong> ${current.regle}</p>
          </div>
        </div>
      `;
    }

    html += `
      <div class="action-toolbar">
        <div></div>
        <div>
          ${!state.ortho.isValidated ? `
            <button class="btn-primary" id="ortho-val-btn" ${state.ortho.selectedOption !== null ? "" : "disabled"}>
              Vérifier l'accord
            </button>
          ` : `
            <button class="btn-primary" id="ortho-next-btn">
              ${state.ortho.currentIndex < total - 1 ? 'Défi suivant →' : 'Recommencer la série'}
            </button>
          `}
        </div>
      </div>
    `;

    container.innerHTML = html;

    container.querySelectorAll("[data-ortho-opt]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.ortho.selectedOption = parseInt(btn.getAttribute("data-ortho-opt"), 10);
        renderOrtho();
      });
    });

    const valBtn = container.querySelector("#ortho-val-btn");
    if (valBtn) {
      valBtn.addEventListener("click", () => {
        state.ortho.isValidated = true;
        const isOk = state.ortho.selectedOption === current.reponseCorrecte;
        state.stats.tentatives++;
        if (isOk) {
          state.ortho.score += 10;
          state.stats.scoreTotal += 10;
          state.stats.streak++;
        } else {
          state.stats.streak = 0;
        }
        savePersistedStats();
        updateHeaderStats();
        renderOrtho();
      });
    }

    const nextBtn = container.querySelector("#ortho-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.ortho.currentIndex < total - 1) {
          state.ortho.currentIndex++;
        } else {
          state.ortho.currentIndex = 0;
          state.ortho.score = 0;
        }
        state.ortho.selectedOption = null;
        state.ortho.isValidated = false;
        renderOrtho();
      });
    }
  }

  // ==========================================
  // MODULE DICTÉES INTERACTIVES (AUDIO & DIFF)
  // ==========================================
  function initDicteesModule() {
    renderDictees();
  }

  function playVoice(text, rate = 0.8) {
    if (!('speechSynthesis' in window)) {
      alert("Votre navigateur ne supporte pas la synthèse vocale intégrée.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = rate;
    window.speechSynthesis.speak(u);
  }

  function stopVoice() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  function renderDictees() {
    const container = document.getElementById("dictees-container");
    if (!container) return;

    const list = APP_DATA.dictees;
    const current = list[state.dictees.currentIndex];
    const totalPhrases = current.phrases.length;
    const currentPhrase = current.phrases[state.dictees.currentPhraseIndex];

    let selectorBtns = `<div style="display:flex; gap:0.5rem; margin-bottom:1.25rem; flex-wrap:wrap;">`;
    list.forEach((d, idx) => {
      const isActive = idx === state.dictees.currentIndex;
      selectorBtns += `
        <button class="btn-secondary ${isActive ? 'active' : ''}" style="${isActive ? 'background:var(--accent-navy); color:#fff; font-weight:bold;' : ''}" data-dictee-select="${idx}">
          ${d.titre.split(" : ")[0]} : ${d.titre.split(" : ")[1].split(" (")[0]}
        </button>
      `;
    });
    selectorBtns += `</div>`;

    let html = `
      <div class="card-header-row">
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <span class="badge-tag">${current.difficulte} • ${current.theme}</span>
        </div>
        <div class="progress-indicator">
          Phrase ${state.dictees.currentPhraseIndex + 1} / ${totalPhrases}
        </div>
      </div>
      ${selectorBtns}
      <h3 style="font-size:1.25rem; margin-bottom:1rem; color:var(--accent-navy);">
        ${current.titre}
      </h3>

      <!-- Panneau de lecture Audio -->
      <div class="audio-player-panel">
        <div class="audio-controls-row">
          <div class="playback-btns">
            <button class="btn-audio" id="btn-play-all">
              ▶️ Écouter tout le texte
            </button>
            <button class="btn-audio-sub" id="btn-stop-audio">
              ⏹️ Arrêter
            </button>
          </div>
          <div class="speed-selector">
            <span>Allure :</span>
            <button class="speed-pill ${state.dictees.speedRate === 0.8 ? 'active' : ''}" data-speed="0.8">0.8x (Dictée)</button>
            <button class="speed-pill ${state.dictees.speedRate === 1.0 ? 'active' : ''}" data-speed="1.0">1.0x (Normal)</button>
          </div>
        </div>

        <!-- Lecture phrase par phrase -->
        <div class="sentence-stepper-box">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <button class="btn-secondary" id="btn-prev-phrase" style="padding:0.4rem 0.75rem;" ${state.dictees.currentPhraseIndex === 0 ? 'disabled' : ''}>
              ← Précédente
            </button>
            <span style="font-weight:600; font-size:0.9rem; color:var(--accent-navy);">
              Phrase ${state.dictees.currentPhraseIndex + 1} / ${totalPhrases}
            </span>
            <button class="btn-secondary" id="btn-next-phrase" style="padding:0.4rem 0.75rem;" ${state.dictees.currentPhraseIndex === totalPhrases - 1 ? 'disabled' : ''}>
              Suivante →
            </button>
          </div>
          <button class="btn-audio" id="btn-play-phrase" style="background:var(--accent-burgundy);">
            🔊 Écouter cette phrase
          </button>
        </div>
      </div>

      <!-- Zone de saisie -->
      <p style="font-size:0.95rem; margin-bottom:0.5rem; color:var(--ink-secondary);">
        Tapez le texte ci-dessous au rythme de la lecture vocale :
      </p>
      <textarea class="dictation-input-area" id="dictee-text-input" placeholder="Écoutez et écrivez ici... Prenez garde aux accords des participes passés et aux homophones.">${state.dictees.userText}</textarea>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; font-size:0.85rem; color:var(--ink-muted);">
        <span id="dictee-word-count">${state.dictees.userText.trim() ? state.dictees.userText.trim().split(/\s+/).length : 0} mot(s) saisi(s)</span>
        <span>${current.texteComplet.trim().split(/\s+/).length} mots attendus</span>
      </div>

      <div class="action-toolbar" style="margin-top:0.5rem;">
        <button class="btn-secondary" id="btn-clear-dictee">
          Effacer
        </button>
        <button class="btn-primary" id="btn-valider-dictee">
          Valider et corriger ma dictée
        </button>
      </div>
    `;

    // Si corrigé validé : affichage du résultat
    if (state.dictees.isValidated && state.dictees.diff) {
      const diff = state.dictees.diff;
      html += `
        <div class="dictation-score-banner" style="margin-top:2rem;">
          <div>
            <div class="dictation-score-badge">${diff.score} / 20</div>
            <p style="font-weight:600; color:var(--ink-primary); margin:0.25rem 0 0;">${diff.appreciation}</p>
          </div>
          <div style="font-size:0.9rem; text-align:right;">
            <strong>${diff.correctWords} / ${diff.totalWords}</strong> mots exacts (${diff.pourcentage}%)
            <br>
            <span style="color:var(--state-error);">${diff.errorsCount} erreur(s)</span> •
            <span style="color:var(--state-success);">${diff.correctWords} sans faute</span>
          </div>
        </div>

        <h4 style="margin-bottom:0.5rem; color:var(--accent-navy);">Texte corrigé mot à mot :</h4>
        <div class="dictation-diff-box">
          ${diff.renderedHtml}
        </div>

        <h4 style="margin-top:1.5rem; margin-bottom:0.5rem; color:var(--accent-navy);">Règles clés de cette dictée :</h4>
        <div class="grammar-cards-grid">
          ${current.vocabulaireCles.map(v => `
            <div class="grammar-rule-card">
              <strong>${v.mot}</strong>
              <p style="margin-top:0.25rem; color:var(--ink-secondary);">${v.regle}</p>
            </div>
          `).join("")}
        </div>
      `;
    }

    container.innerHTML = html;

    // Attachement des écouteurs
    container.querySelectorAll("[data-dictee-select]").forEach(btn => {
      btn.addEventListener("click", () => {
        stopVoice();
        state.dictees.currentIndex = parseInt(btn.getAttribute("data-dictee-select"), 10);
        state.dictees.currentPhraseIndex = 0;
        state.dictees.userText = "";
        state.dictees.isValidated = false;
        state.dictees.diff = null;
        renderDictees();
      });
    });

    const playAllBtn = container.querySelector("#btn-play-all");
    if (playAllBtn) {
      playAllBtn.addEventListener("click", () => {
        playVoice(current.texteComplet, state.dictees.speedRate);
      });
    }

    const stopAudioBtn = container.querySelector("#btn-stop-audio");
    if (stopAudioBtn) {
      stopAudioBtn.addEventListener("click", () => {
        stopVoice();
      });
    }

    const playPhraseBtn = container.querySelector("#btn-play-phrase");
    if (playPhraseBtn) {
      playPhraseBtn.addEventListener("click", () => {
        playVoice(currentPhrase.texte, state.dictees.speedRate);
      });
    }

    const prevPhraseBtn = container.querySelector("#btn-prev-phrase");
    if (prevPhraseBtn) {
      prevPhraseBtn.addEventListener("click", () => {
        if (state.dictees.currentPhraseIndex > 0) {
          state.dictees.currentPhraseIndex--;
          renderDictees();
          playVoice(current.phrases[state.dictees.currentPhraseIndex].texte, state.dictees.speedRate);
        }
      });
    }

    const nextPhraseBtn = container.querySelector("#btn-next-phrase");
    if (nextPhraseBtn) {
      nextPhraseBtn.addEventListener("click", () => {
        if (state.dictees.currentPhraseIndex < totalPhrases - 1) {
          state.dictees.currentPhraseIndex++;
          renderDictees();
          playVoice(current.phrases[state.dictees.currentPhraseIndex].texte, state.dictees.speedRate);
        }
      });
    }

    container.querySelectorAll("[data-speed]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.dictees.speedRate = parseFloat(btn.getAttribute("data-speed"));
        renderDictees();
      });
    });

    const inputArea = container.querySelector("#dictee-text-input");
    if (inputArea) {
      inputArea.addEventListener("input", (e) => {
        state.dictees.userText = e.target.value;
        const count = state.dictees.userText.trim() ? state.dictees.userText.trim().split(/\s+/).length : 0;
        const countEl = container.querySelector("#dictee-word-count");
        if (countEl) countEl.textContent = `${count} mot(s) saisi(s)`;
      });
    }

    const clearBtn = container.querySelector("#btn-clear-dictee");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        state.dictees.userText = "";
        state.dictees.isValidated = false;
        state.dictees.diff = null;
        renderDictees();
      });
    }

    const validerBtn = container.querySelector("#btn-valider-dictee");
    if (validerBtn) {
      validerBtn.addEventListener("click", () => {
        stopVoice();
        state.dictees.isValidated = true;
        
        // Calcul du diff
        const expectedWords = current.texteComplet.trim().split(/\s+/);
        const userWords = state.dictees.userText.trim().split(/\s+/);

        let correctCount = 0;
        let errorsCount = 0;
        let renderedTokens = [];

        function cleanToken(w) {
          return w.replace(/[.,;:!?«»"()]/g, "").trim();
        }

        for (let i = 0; i < expectedWords.length; i++) {
          const exp = expectedWords[i];
          const usr = userWords[i];

          if (!usr) {
            renderedTokens.push(`<span class="diff-token missing" title="Mot manquant">[manquant : ${exp}]</span>`);
            errorsCount++;
          } else if (cleanToken(exp) === cleanToken(usr)) {
            renderedTokens.push(`<span class="diff-token correct">${exp}</span>`);
            correctCount++;
          } else if (cleanToken(exp).toLowerCase() === cleanToken(usr).toLowerCase()) {
            renderedTokens.push(`<span class="diff-token error" title="Erreur d'accent ou de majuscule">${exp} (écrit : ${usr})</span>`);
            errorsCount++;
          } else {
            renderedTokens.push(`<span class="diff-token error" title="Erreur orthographique">${exp} (écrit : ${usr})</span>`);
            errorsCount++;
          }
        }

        const score = Math.max(0, Math.round(20 * (correctCount / expectedWords.length)));
        const pourcentage = Math.round((correctCount / expectedWords.length) * 100);

        let appreciation = "Des accords à retravailler, relisez attentivement les règles.";
        if (score === 20) appreciation = "Sans faute magistral ! Félicitations.";
        else if (score >= 16) appreciation = "Excellent travail ! Très bonne précision d'accord.";
        else if (score >= 12) appreciation = "Bonne maîtrise globale, quelques pièges d'accord à revoir.";

        state.dictees.diff = {
          score,
          pourcentage,
          correctWords: correctCount,
          totalWords: expectedWords.length,
          errorsCount,
          appreciation,
          renderedHtml: renderedTokens.join(" ")
        };

        state.stats.tentatives++;
        state.stats.scoreTotal += (score * 5);
        if (score >= 14) state.stats.streak++;
        else state.stats.streak = 0;

        savePersistedStats();
        updateHeaderStats();
        renderDictees();
      });
    }
  }

  // ==========================================
  // MODULE 5 : GRILLE D'EXAMEN NUMÉRIQUE
  // ==========================================
  function initGrilleModule() {
    const tableBody = document.getElementById("custom-grid-body");
    const addRowBtn = document.getElementById("add-grid-row-btn");
    const clearBtn = document.getElementById("clear-grid-btn");
    const loadPresetBtn = document.getElementById("load-preset-btn");

    function addRow(group = "", func = "", nature = "", motFunc = "") {
      if (!tableBody) return;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="text" value="${group}" placeholder="Ex: Entre les branches" style="width:100%; padding:0.4rem; border:1px solid var(--border-light); border-radius:3px;"></td>
        <td><input type="text" value="${func}" placeholder="Ex: CC de lieu" style="width:100%; padding:0.4rem; border:1px solid var(--border-light); border-radius:3px;"></td>
        <td><input type="text" value="${nature}" placeholder="Ex: Préposition" style="width:100%; padding:0.4rem; border:1px solid var(--border-light); border-radius:3px;"></td>
        <td><input type="text" value="${motFunc}" placeholder="Ex: Introduit le CC" style="width:100%; padding:0.4rem; border:1px solid var(--border-light); border-radius:3px;"></td>
        <td style="text-align:center;"><button class="btn-secondary del-row-btn" style="padding:0.25rem 0.5rem; color:var(--state-error);">✕</button></td>
      `;
      tableBody.appendChild(tr);

      tr.querySelector(".del-row-btn").addEventListener("click", () => {
        tr.remove();
      });
    }

    if (addRowBtn) {
      addRowBtn.addEventListener("click", () => addRow());
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (tableBody) tableBody.innerHTML = "";
      });
    }

    if (loadPresetBtn) {
      loadPresetBtn.addEventListener("click", () => {
        if (tableBody) tableBody.innerHTML = "";
        const cas = APP_DATA.demonstrationsCas[0];
        cas.etape3.mots.forEach(m => {
          addRow(m.mot, "Groupe associé", m.nature, m.fonctionInterne);
        });
      });
    }

    // Ligne initiale
    if (tableBody && tableBody.children.length === 0) {
      addRow("Le printemps", "Sujet du verbe « a été »", "Nom commun", "Noyau du GN sujet");
      addRow("a été", "Noyau verbal", "Verbe conjugué (être)", "Centre de la proposition");
      addRow("tardif", "Attribut du sujet", "Adjectif qualificatif", "Attribut du sujet « Le printemps »");
      addRow("cette année", "CC de temps", "Groupe nominal", "Précise le moment");
    }
  }

  // ==========================================
  // MODULE 6 : MÉMENTO INTERACTIF & RECHERCHE
  // ==========================================
  function initMementoModule() {
    const searchInput = document.getElementById("memento-search");
    const container = document.getElementById("memento-content");
    if (!container) return;

    renderMementoCards();

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        renderMementoCards(query);
      });
    }
  }

  function renderMementoCards(filter = "") {
    const container = document.getElementById("memento-content");
    if (!container) return;

    const data = APP_DATA.memento;

    let html = `<div class="memento-grid">`;

    // Carte 1 : Les 5 classes variables
    const variablesFiltrees = data.classesGrammaticales.variables.filter(v =>
      !filter || v.nom.toLowerCase().includes(filter) || v.definition.toLowerCase().includes(filter) || v.astuce.toLowerCase().includes(filter)
    );

    if (variablesFiltrees.length > 0) {
      html += `
        <div class="memento-card">
          <h3>Classes variables (5 natures)</h3>
          <ul class="item-list">
            ${variablesFiltrees.map(v => `
              <li>
                <strong>${v.nom}</strong>
                <span class="subtext">${v.definition}</span>
                <span class="subtext"><em>Sous-types :</em> ${v.sousTypes}</span>
                <span class="astuce">💡 ${v.astuce}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    }

    // Carte 2 : Les classes invariables
    const invariablesFiltrees = data.classesGrammaticales.invariables.filter(v =>
      !filter || v.nom.toLowerCase().includes(filter) || v.definition.toLowerCase().includes(filter) || v.astuce.toLowerCase().includes(filter)
    );

    if (invariablesFiltrees.length > 0) {
      html += `
        <div class="memento-card">
          <h3>Classes invariables (Ne s'accordent jamais)</h3>
          <ul class="item-list">
            ${invariablesFiltrees.map(v => `
              <li>
                <strong>${v.nom}</strong>
                <span class="subtext">${v.definition}</span>
                <span class="subtext"><em>Exemples :</em> ${v.exemples}</span>
                <span class="astuce">💡 ${v.astuce}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    }

    // Carte 3 : Fonctions autour du verbe
    const verbeFonctions = data.fonctions.autourVerbe.filter(f =>
      !filter || f.nom.toLowerCase().includes(filter) || f.role.toLowerCase().includes(filter) || f.exemple.toLowerCase().includes(filter)
    );

    if (verbeFonctions.length > 0) {
      html += `
        <div class="memento-card">
          <h3>Fonctions autour du verbe</h3>
          <ul class="item-list">
            ${verbeFonctions.map(f => `
              <li>
                <strong>${f.nom}</strong>
                ${f.question !== '—' ? `<span class="subtext"><em>Question clé :</em> ${f.question}</span>` : ''}
                <span class="subtext">${f.role}</span>
                <span class="astuce" style="background:#f4efe6; color:var(--ink-primary);">Ex: ${f.exemple}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    }

    // Carte 4 : Fonctions autour du nom & Compléments circonstanciels
    const nomFonctions = data.fonctions.autourNom.filter(f =>
      !filter || f.nom.toLowerCase().includes(filter) || f.role.toLowerCase().includes(filter)
    );

    const ccFonctions = data.fonctions.circonstanciels.filter(f =>
      !filter || f.nom.toLowerCase().includes(filter) || f.role.toLowerCase().includes(filter)
    );

    if (nomFonctions.length > 0 || ccFonctions.length > 0) {
      html += `
        <div class="memento-card">
          <h3>Autour du nom & Circonstanciels</h3>
          <ul class="item-list">
            ${nomFonctions.map(f => `
              <li>
                <strong>${f.nom}</strong>
                <span class="subtext">${f.role}</span>
                <span class="astuce" style="background:#f4efe6; color:var(--ink-primary);">Ex: ${f.exemple}</span>
              </li>
            `).join("")}
            ${ccFonctions.map(f => `
              <li>
                <strong>${f.nom}</strong>
                <span class="subtext"><em>Question :</em> ${f.question} — ${f.role}</span>
                <span class="astuce" style="background:#f4efe6; color:var(--ink-primary);">Ex: ${f.exemple}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    }

    html += `</div>`;

    if (variablesFiltrees.length === 0 && invariablesFiltrees.length === 0 && verbeFonctions.length === 0 && nomFonctions.length === 0 && ccFonctions.length === 0) {
      html = `<div style="text-align:center; padding:3rem; color:var(--ink-muted);">Aucune règle ne correspond à « ${filter} ».</div>`;
    }

    container.innerHTML = html;
  }

  // ==========================================
  // MODULE 7 : BONUS CONNAISSANCE DES ARTS (ICP)
  // ==========================================
  function initArtsModule() {
    renderArts();
  }

  function renderArts() {
    const container = document.getElementById("arts-container");
    if (!container) return;

    const list = APP_DATA.artsCulture;
    const current = list[state.arts.currentIndex];
    const total = list.length;

    let html = `
      <div class="card-header-row">
        <span class="badge-tag">${current.cours} • Question ${state.arts.currentIndex + 1} / ${total}</span>
        <div class="progress-indicator">Score Arts : ${state.arts.score} pt(s)</div>
      </div>
      <h3 style="font-size:1.25rem; margin-bottom:1.25rem; color:var(--ink-primary);">
        ${current.question}
      </h3>
      <div class="options-stack" style="margin-bottom:1.5rem;">
    `;

    current.options.forEach((opt, idx) => {
      let optClass = "option-btn";
      if (state.arts.selectedOption === idx) optClass += " selected";
      if (state.arts.isValidated) {
        if (idx === current.reponseCorrecte) optClass += " correct";
        else if (state.arts.selectedOption === idx) optClass += " wrong";
      }
      html += `<button class="${optClass}" data-arts-opt="${idx}" ${state.arts.isValidated ? "disabled" : ""}>
        <span>${opt}</span>
      </button>`;
    });

    html += `</div>`;

    if (state.arts.isValidated) {
      const isOk = state.arts.selectedOption === current.reponseCorrecte;
      html += `
        <div class="feedback-box ${isOk ? 'success' : 'error'}">
          <h4>${isOk ? '✓ Exact !' : '✕ Erreur factuelle'}</h4>
          <div class="feedback-content">
            <p>${current.explication}</p>
          </div>
        </div>
      `;
    }

    html += `
      <div class="action-toolbar">
        <div></div>
        <div>
          ${!state.arts.isValidated ? `
            <button class="btn-primary" id="arts-val-btn" ${state.arts.selectedOption !== null ? "" : "disabled"}>
              Valider ma réponse
            </button>
          ` : `
            <button class="btn-primary" id="arts-next-btn">
              ${state.arts.currentIndex < total - 1 ? 'Question suivante →' : 'Recommencer le quiz Arts'}
            </button>
          `}
        </div>
      </div>
    `;

    container.innerHTML = html;

    container.querySelectorAll("[data-arts-opt]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.arts.selectedOption = parseInt(btn.getAttribute("data-arts-opt"), 10);
        renderArts();
      });
    });

    const valBtn = container.querySelector("#arts-val-btn");
    if (valBtn) {
      valBtn.addEventListener("click", () => {
        state.arts.isValidated = true;
        const isOk = state.arts.selectedOption === current.reponseCorrecte;
        state.stats.tentatives++;
        if (isOk) {
          state.arts.score += 10;
          state.stats.scoreTotal += 10;
          state.stats.streak++;
        } else {
          state.stats.streak = 0;
        }
        savePersistedStats();
        updateHeaderStats();
        renderArts();
      });
    }

    const nextBtn = container.querySelector("#arts-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.arts.currentIndex < total - 1) {
          state.arts.currentIndex++;
        } else {
          state.arts.currentIndex = 0;
          state.arts.score = 0;
        }
        state.arts.selectedOption = null;
        state.arts.isValidated = false;
        renderArts();
      });
    }
  }

  // ==========================================
  // GESTION DU STOCKAGE LOCAL & STATS
  // ==========================================
  function loadPersistedStats() {
    try {
      const raw = localStorage.getItem("grammaire_app_stats");
      if (raw) {
        const parsed = JSON.parse(raw);
        state.stats = Object.assign(state.stats, parsed);
      }
    } catch (e) {
      console.warn("Impossible de charger les statistiques depuis localStorage", e);
    }
  }

  function savePersistedStats() {
    try {
      localStorage.setItem("grammaire_app_stats", JSON.stringify(state.stats));
    } catch (e) {
      console.warn("Impossible de sauvegarder dans localStorage", e);
    }
  }

  function updateHeaderStats() {
    const totalEl = document.getElementById("stat-score-total");
    const streakEl = document.getElementById("stat-streak");
    if (totalEl) totalEl.textContent = `${state.stats.scoreTotal} pts`;
    if (streakEl) streakEl.textContent = `${state.stats.streak} 🔥`;
  }

  // Reset des stats
  const resetStatsBtn = document.getElementById("reset-all-stats");
  if (resetStatsBtn) {
    resetStatsBtn.addEventListener("click", () => {
      if (confirm("Réinitialiser l'ensemble de votre score et progression ?")) {
        localStorage.removeItem("grammaire_app_stats");
        state.stats = {
          scoreTotal: 0,
          tentatives: 0,
          streak: 0,
          completedPhrases: {},
          quizScore: 0,
          orthoScore: 0,
          dicteeScore: 0,
          artsScore: 0
        };
        updateHeaderStats();
        renderDixPhrases();
        renderQuiz();
        renderOrtho();
        renderDictees();
        renderArts();
      }
    });
  }

  // ==========================================
  // INITIALISATION GLOBALE
  // ==========================================
  initNavigation();
  updateHeaderStats();
  initDixPhrasesModule();
  initQuizModule();
  initMethodeModule();
  initOrthoModule();
  initDicteesModule();
  initGrilleModule();
  initMementoModule();
  initArtsModule();
});
