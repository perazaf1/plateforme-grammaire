/**
 * Grammaire & Méthode — Ateliers interactifs spécialisés
 * (Phrases d'analyse, Protocole 4 étapes, Orthographe, Dictées, Grille d'examen, Mémento)
 */
(function (global) {
  "use strict";

  function getData() {
    return global.GrammaireDataParts || {};
  }

  // État local des ateliers spécialisés de Grammaire
  const localState = {
    phrases: {
      currentIndex: 0,
      selectedNature: null,
      selectedFonction: null,
      isValidated: false
    },
    methode: {
      currentCas: "cas1",
      currentEtape: 1
    },
    ortho: {
      currentIndex: 0,
      selectedOption: null,
      isValidated: false,
      score: 0
    },
    dictees: {
      currentIndex: 0,
      currentPhraseIndex: 0,
      speedRate: 0.8,
      userText: "",
      isValidated: false,
      diff: null
    },
    mementoQuery: "",
    gridRows: null
  };

  function resetGrammaireLocalState() {
    localState.phrases.selectedNature = null;
    localState.phrases.selectedFonction = null;
    localState.phrases.isValidated = false;
    localState.ortho.score = 0;
    localState.ortho.selectedOption = null;
    localState.ortho.isValidated = false;
    localState.dictees.userText = "";
    localState.dictees.isValidated = false;
    localState.dictees.diff = null;
  }

  // ==========================================
  // ATELIER 1 : PHRASES D'ANALYSE (15 PHRASES)
  // ==========================================
  function renderPhrases(container, subject, _mod, ctx) {
    const { escapeHtml } = global.PlatformUtils;
    const list = getData().dixPhrases;
    const current = list[localState.phrases.currentIndex];
    const total = list.length;
    const isDone = global.PlatformState.isCompleted(`grammaire:phrase:${current.id}`);
    const completedCount = global.PlatformState.countCompletedByPrefix("grammaire:phrase:");

    const selectorHtml = `
      <div class="card-header-row">
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <span class="badge-tag">${escapeHtml(current.serie || "Exercice officiel")} • Phrase ${current.numero} sur ${total}</span>
          ${isDone ? '<span class="stat-chip" style="background:#eaf6ee; color:#176d3f; border-color:#bce1ca;">✓ Complétée</span>' : ""}
        </div>
        <div class="progress-indicator">Progression : ${Math.min(completedCount, total)} / ${total}</div>
      </div>
    `;

    let paginationBtns = `<div style="display:flex; gap:0.35rem; margin-bottom:1.25rem; flex-wrap:wrap;">`;
    list.forEach((p, i) => {
      const isActive = i === localState.phrases.currentIndex;
      const activeStyle = isActive ? 'style="background:var(--accent-navy); color:#fff; font-weight:bold;"' : "";
      const checkMark = global.PlatformState.isCompleted(`grammaire:phrase:${p.id}`) ? " ✓" : "";
      paginationBtns += `<button type="button" class="btn-secondary" style="padding:0.35rem 0.65rem; font-size:0.85rem;" ${activeStyle} data-phrase-idx="${i}">Phrase ${i + 1}${checkMark}</button>`;
    });
    paginationBtns += `</div>`;

    const sentenceHtml = `
      <div class="sentence-box">${current.texteAffiche}</div>
      <p style="margin-bottom:1.25rem; font-size:0.95rem; color:var(--ink-secondary);">
        Consigne : Analysez l'élément surligné <strong>« ${escapeHtml(current.elementCible)} »</strong> en déterminant sa <strong>nature grammaticale</strong> et sa <strong>fonction dans la phrase</strong>.
      </p>
    `;

    const renderColumn = (title, hint, options, selectedVal, exactVal, typeAttr) => {
      let col = `<div class="choice-column"><h4>${title} <span class="hint">${hint}</span></h4><div class="options-stack">`;
      options.forEach((opt) => {
        let optClass = "option-btn";
        if (selectedVal === opt) optClass += " selected";
        if (localState.phrases.isValidated) {
          if (opt === exactVal) optClass += " correct";
          else if (selectedVal === opt) optClass += " wrong";
        }
        col += `<button type="button" class="${optClass}" data-type="${typeAttr}" data-val="${escapeHtml(opt)}" aria-pressed="${selectedVal === opt}" ${localState.phrases.isValidated ? "disabled" : ""}>
          <span>${escapeHtml(opt)}</span>
          <span class="radio-indicator"></span>
        </button>`;
      });
      col += `</div></div>`;
      return col;
    };

    const natureOptions = renderColumn(
      "1. Nature (Classe grammaticale)",
      "« Qu'est-ce que c'est ? »",
      current.choixNature,
      localState.phrases.selectedNature,
      current.natureExacte,
      "nature"
    );
    const fonctionOptions = renderColumn(
      "2. Fonction dans la phrase",
      "« À quoi sert-il ici ? »",
      current.choixFonction,
      localState.phrases.selectedFonction,
      current.fonctionExacte,
      "fonction"
    );

    let feedbackHtml = "";
    if (localState.phrases.isValidated) {
      const allOk = localState.phrases.selectedNature === current.natureExacte &&
                    localState.phrases.selectedFonction === current.fonctionExacte;
      feedbackHtml = `
        <div class="feedback-box ${allOk ? "success" : "error"}" role="status">
          <h4>${allOk ? "✓ Analyse parfaitement exacte !" : "✕ Rectification pédagogique"}</h4>
          <div class="feedback-content">
            <p style="margin-bottom:0.5rem;">
              <strong>Nature correcte :</strong> ${escapeHtml(current.natureExacte)} ${current.natureDetaillee ? `(${escapeHtml(current.natureDetaillee)})` : ""}
              <br>
              <strong>Fonction correcte :</strong> ${escapeHtml(current.fonctionExacte)}
            </p>
            <p>${escapeHtml(current.explication)}</p>
            ${current.piege ? `<div class="feedback-details"><strong>Attention au piège :</strong> ${escapeHtml(current.piege)}</div>` : ""}
            <div class="propositions-breakdown">
              <strong>Découpage de la phrase :</strong> ${escapeHtml(current.decoupagePropositions)}
              <br>
              <strong>Type :</strong> ${escapeHtml(current.typeProposition)}
            </div>
          </div>
        </div>
      `;
    }

    const canValidate = localState.phrases.selectedNature && localState.phrases.selectedFonction && !localState.phrases.isValidated;
    const actionsHtml = `
      <div class="action-toolbar">
        <div style="display:flex; gap:0.5rem;">
          <button type="button" class="btn-secondary" id="phrase-prev-btn" ${localState.phrases.currentIndex === 0 ? "disabled" : ""}>← Phrase précédente</button>
          <button type="button" class="btn-secondary" id="phrase-next-btn" ${localState.phrases.currentIndex === total - 1 ? "disabled" : ""}>Phrase suivante →</button>
        </div>
        <div>
          ${!localState.phrases.isValidated ? `
            <button type="button" class="btn-primary" id="phrase-validate-btn" ${canValidate ? "" : "disabled"}>Valider mon analyse</button>
          ` : `
            <button type="button" class="btn-primary" id="phrase-retry-btn">Réessayer cette phrase</button>
          `}
        </div>
      </div>
    `;

    container.innerHTML = `<div class="exercise-card">${selectorHtml}${paginationBtns}${sentenceHtml}<div class="decision-dual-grid">${natureOptions}${fonctionOptions}</div>${feedbackHtml}${actionsHtml}</div>`;

    container.querySelectorAll(".option-btn:not(:disabled)").forEach((btn) => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-type");
        const val = btn.getAttribute("data-val");
        if (type === "nature") localState.phrases.selectedNature = val;
        else localState.phrases.selectedFonction = val;
        renderPhrases(container, subject, _mod, ctx);
      });
    });

    container.querySelectorAll("[data-phrase-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localState.phrases.currentIndex = parseInt(btn.getAttribute("data-phrase-idx"), 10);
        localState.phrases.selectedNature = null;
        localState.phrases.selectedFonction = null;
        localState.phrases.isValidated = false;
        renderPhrases(container, subject, _mod, ctx);
      });
    });

    const valBtn = container.querySelector("#phrase-validate-btn");
    if (valBtn) {
      valBtn.addEventListener("click", () => {
        localState.phrases.isValidated = true;
        const isOk = localState.phrases.selectedNature === current.natureExacte &&
                     localState.phrases.selectedFonction === current.fonctionExacte;
        global.PlatformState.recordAttempt(subject.id, isOk, 10, `grammaire:phrase:${current.id}`);
        if (ctx && typeof ctx.updateHeaderStats === "function") ctx.updateHeaderStats();
        renderPhrases(container, subject, _mod, ctx);
      });
    }

    const retryBtn = container.querySelector("#phrase-retry-btn");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        localState.phrases.selectedNature = null;
        localState.phrases.selectedFonction = null;
        localState.phrases.isValidated = false;
        renderPhrases(container, subject, _mod, ctx);
      });
    }

    const prevBtn = container.querySelector("#phrase-prev-btn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (localState.phrases.currentIndex > 0) {
          localState.phrases.currentIndex -= 1;
          localState.phrases.selectedNature = null;
          localState.phrases.selectedFonction = null;
          localState.phrases.isValidated = false;
          renderPhrases(container, subject, _mod, ctx);
        }
      });
    }

    const nextBtn = container.querySelector("#phrase-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (localState.phrases.currentIndex < total - 1) {
          localState.phrases.currentIndex += 1;
          localState.phrases.selectedNature = null;
          localState.phrases.selectedFonction = null;
          localState.phrases.isValidated = false;
          renderPhrases(container, subject, _mod, ctx);
        }
      });
    }
  }

  // ==========================================
  // ATELIER 2 : PROTOCOLE EN 4 ÉTAPES
  // ==========================================
  function renderMethode(container) {
    const { escapeHtml } = global.PlatformUtils;
    const casData = getData().demonstrationsCas.find((c) => c.id === localState.methode.currentCas) || getData().demonstrationsCas[0];

    const casSelector = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button type="button" class="btn-secondary ${localState.methode.currentCas === "cas1" ? "active" : ""}" data-cas="cas1">
            Cas n°1 : Phrase simple (1 prop.)
          </button>
          <button type="button" class="btn-secondary ${localState.methode.currentCas === "cas2" ? "active" : ""}" data-cas="cas2">
            Cas n°2 : Phrase complexe (2 props.)
          </button>
        </div>
      </div>
      <div class="sentence-box" style="margin-bottom:1.5rem;">« ${escapeHtml(casData.phrase)} »</div>
    `;

    let stepperNav = `<div class="stepper-nav">`;
    getData().memento.methode4Etapes.forEach((et) => {
      const isActive = et.etape === localState.methode.currentEtape;
      stepperNav += `
        <button type="button" class="step-btn ${isActive ? "active" : ""}" data-etape="${et.etape}">
          <span class="step-num">${et.etape}</span>
          <span>Étape ${et.etape} : ${escapeHtml(et.titre.split(" ")[0])}...</span>
        </button>
      `;
    });
    stepperNav += `</div>`;

    const etapeDef = getData().memento.methode4Etapes[localState.methode.currentEtape - 1];
    let stepContent = `
      <div class="step-content-box">
        <h3 style="color:var(--accent-navy); margin-bottom:0.25rem;">Étape ${etapeDef.etape} : ${escapeHtml(etapeDef.titre)}</h3>
        <p style="font-size:0.9rem; color:var(--accent-burgundy); font-weight:600; margin-bottom:1rem;">Règle d'or : ${escapeHtml(etapeDef.regle)}</p>
        <p style="margin-bottom:1.25rem;">${escapeHtml(etapeDef.action)}</p>
    `;

    if (localState.methode.currentEtape === 1) {
      stepContent += `
        <div style="background:var(--bg-surface-soft); padding:1.25rem; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <h4 style="margin-bottom:0.5rem; color:var(--accent-navy);">1. Repérage des verbes conjugués :</h4>
          <ul style="margin-left:1.5rem; margin-bottom:1rem;">
            ${casData.etape1.verbesConjugues.map((v) => `<li>Verbe : <strong>${escapeHtml(v.verbe)}</strong> (infinitif : <em>${escapeHtml(v.infinitif)}</em>, forme : ${escapeHtml(v.personne)})</li>`).join("")}
          </ul>
          <h4 style="margin-bottom:0.5rem; color:var(--accent-navy);">2. Découpage en propositions :</h4>
          <p style="font-family:var(--font-mono); font-size:1.05rem; background:#fff; padding:0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-light); margin-bottom:0.75rem;">
            ${escapeHtml(casData.etape1.decoupage)}
          </p>
          <p><strong>Nature de la structure :</strong> ${escapeHtml(casData.etape1.natureProposition)}</p>
        </div>
      `;
    } else if (localState.methode.currentEtape === 2) {
      stepContent += `<div style="display:flex; flex-direction:column; gap:1rem;">`;
      if (casData.etape2.blocs) {
        stepContent += `<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
          ${casData.etape2.blocs.map((b) => `
            <div style="background:var(--bg-surface-soft); padding:1rem; border-radius:var(--radius-sm); border-left:4px solid var(--accent-navy);">
              <strong style="font-size:1.05rem; color:var(--accent-navy);">${escapeHtml(b.bloc)}</strong>
              <p style="font-size:0.85rem; color:var(--ink-muted); margin:0.25rem 0;">Question : ${escapeHtml(b.question)}</p>
              <p style="font-size:0.9rem; font-weight:600; color:var(--accent-burgundy);">→ ${escapeHtml(b.fonction)}</p>
            </div>
          `).join("")}
        </div>`;
      } else {
        stepContent += casData.etape2.propositions.map((prop) => `
          <div style="background:var(--bg-surface-soft); padding:1rem; border-radius:var(--radius-sm); margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-navy); margin-bottom:0.75rem;">${escapeHtml(prop.nom)}</h4>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.75rem;">
              ${prop.blocs.map((b) => `
                <div style="background:#fff; padding:0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
                  <strong>${escapeHtml(b.bloc)}</strong>
                  <p style="font-size:0.8rem; color:var(--ink-muted); margin:0.2rem 0;">${escapeHtml(b.question)}</p>
                  <p style="font-size:0.85rem; font-weight:600; color:var(--accent-burgundy);">→ ${escapeHtml(b.fonction)}</p>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("");
      }
      stepContent += `</div>`;
    } else if (localState.methode.currentEtape === 3) {
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
              ${casData.etape3.mots.map((m) => `
                <tr>
                  <td><strong>${escapeHtml(m.mot)}</strong></td>
                  <td>${escapeHtml(m.nature)}</td>
                  <td>${escapeHtml(m.fonctionInterne)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    } else if (localState.methode.currentEtape === 4) {
      const tousBlocs = casData.etape2.blocs || casData.etape2.propositions.flatMap((p) => p.blocs);
      const ordreBlocs = [];
      const motsParBloc = {};
      casData.etape3.mots.forEach((m) => {
        const bloc = m.bloc || "Autres mots";
        if (!motsParBloc[bloc]) {
          ordreBlocs.push(bloc);
          motsParBloc[bloc] = [];
        }
        motsParBloc[bloc].push(m);
      });

      const lignesGrille = ordreBlocs.map((bloc) => {
        const def = tousBlocs.find((b) => b.bloc === bloc) || {};
        const mots = motsParBloc[bloc];
        return `
          <tr>
            <td><strong>${escapeHtml(bloc)}</strong></td>
            <td style="color:var(--accent-burgundy); font-weight:600;">${escapeHtml(def.fonction || "—")}</td>
            <td>${mots.map((m) => `<div><strong>${escapeHtml(m.mot)}</strong> : ${escapeHtml(m.nature)}</div>`).join("")}</td>
            <td>${mots.map((m) => `<div>${escapeHtml(m.fonctionInterne)}</div>`).join("")}</td>
          </tr>
        `;
      }).join("");

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
            <tbody>${lignesGrille}</tbody>
          </table>
        </div>
        <div style="display:flex; justify-content:flex-end; margin-top:1rem;">
          <button type="button" class="btn-secondary" id="print-methode-btn">🖨️ Imprimer la grille pour réviser</button>
        </div>
      `;
    }

    stepContent += `</div>`;
    container.innerHTML = casSelector + stepperNav + stepContent;

    container.querySelectorAll("[data-cas]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localState.methode.currentCas = btn.getAttribute("data-cas");
        localState.methode.currentEtape = 1;
        renderMethode(container);
      });
    });

    container.querySelectorAll("[data-etape]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localState.methode.currentEtape = parseInt(btn.getAttribute("data-etape"), 10);
        renderMethode(container);
      });
    });

    const printBtn = container.querySelector("#print-methode-btn");
    if (printBtn) printBtn.addEventListener("click", () => window.print());
  }

  // ==========================================
  // ATELIER 3 : DÉFIS ORTHOGRAPHE & ACCORDS
  // ==========================================
  function renderOrtho(container, subject, _mod, ctx) {
    const { escapeHtml } = global.PlatformUtils;
    const list = getData().orthographeDefis;
    const current = list[localState.ortho.currentIndex];
    const total = list.length;

    const gapText = localState.ortho.selectedOption !== null
      ? escapeHtml(current.options[localState.ortho.selectedOption])
      : " [ ? ] ";

    let html = `
      <div class="exercise-card">
        <div class="card-header-row">
          <span class="badge-tag">${escapeHtml(current.titre)} • Défi ${localState.ortho.currentIndex + 1} / ${total}</span>
          <div class="progress-indicator">Score Orthographe : ${localState.ortho.score} pt(s)</div>
        </div>
        <div class="fill-gap-sentence">
          ${escapeHtml(current.enonce).replace("____", `<span class="gap-highlight">${gapText}</span>`)}
        </div>
        <p style="margin-bottom:1rem; font-size:0.95rem; color:var(--ink-secondary);">
          Choisissez la graphie exacte pour compléter la phrase :
        </p>
        <div class="options-stack" style="margin-bottom:1.5rem;">
          ${current.options.map((opt, idx) => {
            let optClass = "option-btn";
            if (localState.ortho.selectedOption === idx) optClass += " selected";
            if (localState.ortho.isValidated) {
              if (idx === current.reponseCorrecte) optClass += " correct";
              else if (localState.ortho.selectedOption === idx) optClass += " wrong";
            }
            return `<button type="button" class="${optClass}" data-ortho-opt="${idx}" aria-pressed="${localState.ortho.selectedOption === idx}" ${localState.ortho.isValidated ? "disabled" : ""}>
              <span>${escapeHtml(opt)}</span>
            </button>`;
          }).join("")}
        </div>
    `;

    if (localState.ortho.isValidated) {
      const isOk = localState.ortho.selectedOption === current.reponseCorrecte;
      html += `
        <div class="feedback-box ${isOk ? "success" : "error"}" role="status">
          <h4>${isOk ? "✓ Accord / Orthographe parfaite !" : "✕ Erreur de graphie"}</h4>
          <div class="feedback-content">
            <p><strong>Règle d'or :</strong> ${escapeHtml(current.regle)}</p>
          </div>
        </div>
      `;
    }

    html += `
        <div class="action-toolbar">
          <div></div>
          <div>
            ${!localState.ortho.isValidated ? `
              <button type="button" class="btn-primary" id="ortho-val-btn" ${localState.ortho.selectedOption !== null ? "" : "disabled"}>Vérifier l'accord</button>
            ` : `
              <button type="button" class="btn-primary" id="ortho-next-btn">${localState.ortho.currentIndex < total - 1 ? "Défi suivant →" : "Recommencer la série"}</button>
            `}
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    container.querySelectorAll("[data-ortho-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localState.ortho.selectedOption = parseInt(btn.getAttribute("data-ortho-opt"), 10);
        renderOrtho(container, subject, _mod, ctx);
      });
    });

    const valBtn = container.querySelector("#ortho-val-btn");
    if (valBtn) {
      valBtn.addEventListener("click", () => {
        localState.ortho.isValidated = true;
        const isOk = localState.ortho.selectedOption === current.reponseCorrecte;
        if (isOk) localState.ortho.score += 10;
        global.PlatformState.recordAttempt(subject.id, isOk, 10, `grammaire:ortho:${current.id}`);
        if (ctx && typeof ctx.updateHeaderStats === "function") ctx.updateHeaderStats();
        renderOrtho(container, subject, _mod, ctx);
      });
    }

    const nextBtn = container.querySelector("#ortho-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (localState.ortho.currentIndex < total - 1) {
          localState.ortho.currentIndex += 1;
        } else {
          localState.ortho.currentIndex = 0;
          localState.ortho.score = 0;
        }
        localState.ortho.selectedOption = null;
        localState.ortho.isValidated = false;
        renderOrtho(container, subject, _mod, ctx);
      });
    }
  }

  // ==========================================
  // ATELIER 4 : DICTÉES VOCALES INTERACTIVES
  // ==========================================
  function playVoice(text, rate = 0.8) {
    if (!("speechSynthesis" in window)) {
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
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function renderDictees(container, subject, _mod, ctx) {
    const { escapeHtml } = global.PlatformUtils;
    const list = getData().dictees;
    const current = list[localState.dictees.currentIndex];
    const totalPhrases = current.phrases.length;
    const currentPhrase = current.phrases[localState.dictees.currentPhraseIndex];

    let selectorBtns = `<div style="display:flex; gap:0.5rem; margin-bottom:1.25rem; flex-wrap:wrap;">`;
    list.forEach((d, idx) => {
      const isActive = idx === localState.dictees.currentIndex;
      const shortTitle = `${d.titre.split(" : ")[0]} : ${d.titre.split(" : ")[1].split(" (")[0]}`;
      selectorBtns += `
        <button type="button" class="btn-secondary ${isActive ? "active" : ""}" style="${isActive ? "background:var(--accent-navy); color:#fff; font-weight:bold;" : ""}" data-dictee-select="${idx}">
          ${escapeHtml(shortTitle)}
        </button>
      `;
    });
    selectorBtns += `</div>`;

    let html = `
      <div class="exercise-card">
        <div class="card-header-row">
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <span class="badge-tag">${escapeHtml(current.difficulte)} • ${escapeHtml(current.theme)}</span>
          </div>
          <div class="progress-indicator">Phrase ${localState.dictees.currentPhraseIndex + 1} / ${totalPhrases}</div>
        </div>
        ${selectorBtns}
        <h3 style="font-size:1.25rem; margin-bottom:1rem; color:var(--accent-navy);">${escapeHtml(current.titre)}</h3>

        <div class="audio-player-panel">
          <div class="audio-controls-row">
            <div class="playback-btns">
              <button type="button" class="btn-audio" id="btn-play-all">▶️ Écouter tout le texte</button>
              <button type="button" class="btn-audio-sub" id="btn-stop-audio">⏹️ Arrêter</button>
            </div>
            <div class="speed-selector">
              <span>Allure :</span>
              <button type="button" class="speed-pill ${localState.dictees.speedRate === 0.8 ? "active" : ""}" data-speed="0.8">0.8x (Dictée)</button>
              <button type="button" class="speed-pill ${localState.dictees.speedRate === 1.0 ? "active" : ""}" data-speed="1.0">1.0x (Normal)</button>
            </div>
          </div>

          <div class="sentence-stepper-box">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <button type="button" class="btn-secondary" id="btn-prev-phrase" style="padding:0.4rem 0.75rem;" ${localState.dictees.currentPhraseIndex === 0 ? "disabled" : ""}>← Précédente</button>
              <span style="font-weight:600; font-size:0.9rem; color:var(--accent-navy);">
                Phrase ${localState.dictees.currentPhraseIndex + 1} / ${totalPhrases}
              </span>
              <button type="button" class="btn-secondary" id="btn-next-phrase" style="padding:0.4rem 0.75rem;" ${localState.dictees.currentPhraseIndex === totalPhrases - 1 ? "disabled" : ""}>Suivante →</button>
            </div>
            <button type="button" class="btn-audio" id="btn-play-phrase" style="background:var(--accent-burgundy);">🔊 Écouter cette phrase</button>
          </div>
        </div>

        <p style="font-size:0.95rem; margin-bottom:0.5rem; color:var(--ink-secondary);">
          Tapez le texte ci-dessous au rythme de la lecture vocale :
        </p>
        <textarea class="dictation-input-area" id="dictee-text-input" aria-label="Texte de la dictée" placeholder="Écoutez et écrivez ici... Prenez garde aux accords des participes passés et aux homophones.">${escapeHtml(localState.dictees.userText)}</textarea>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; font-size:0.85rem; color:var(--ink-muted);">
          <span id="dictee-word-count">${localState.dictees.userText.trim() ? localState.dictees.userText.trim().split(/\s+/).length : 0} mot(s) saisi(s)</span>
          <span>${current.texteComplet.trim().split(/\s+/).length} mots attendus</span>
        </div>

        <div class="action-toolbar" style="margin-top:0.5rem;">
          <button type="button" class="btn-secondary" id="btn-clear-dictee">Effacer</button>
          <button type="button" class="btn-primary" id="btn-valider-dictee">Valider et corriger ma dictée</button>
        </div>
    `;

    if (localState.dictees.isValidated && localState.dictees.diff) {
      const diff = localState.dictees.diff;
      html += `
        <div class="dictation-score-banner" style="margin-top:2rem;" role="status">
          <div>
            <div class="dictation-score-badge">${diff.score} / 20</div>
            <p style="font-weight:600; color:var(--ink-primary); margin:0.25rem 0 0;">${escapeHtml(diff.appreciation)}</p>
          </div>
          <div style="font-size:0.9rem; text-align:right;">
            <strong>${diff.correctWords} / ${diff.totalWords}</strong> mots exacts (${diff.pourcentage}%)
            <br>
            <span style="color:var(--state-error);">${diff.errorsCount} erreur(s)</span> •
            <span style="color:var(--state-success);">${diff.correctWords} sans faute</span>
          </div>
        </div>

        <h4 style="margin-bottom:0.5rem; color:var(--accent-navy);">Texte corrigé mot à mot :</h4>
        <div class="dictation-diff-box">${diff.renderedHtml}</div>

        <h4 style="margin-top:1.5rem; margin-bottom:0.5rem; color:var(--accent-navy);">Règles clés de cette dictée :</h4>
        <div class="grammar-cards-grid">
          ${current.vocabulaireCles.map((v) => `
            <div class="grammar-rule-card">
              <strong>${escapeHtml(v.mot)}</strong>
              <p style="margin-top:0.25rem; color:var(--ink-secondary);">${escapeHtml(v.regle)}</p>
            </div>
          `).join("")}
        </div>
      `;
    }

    html += `</div>`;
    container.innerHTML = html;

    container.querySelectorAll("[data-dictee-select]").forEach((btn) => {
      btn.addEventListener("click", () => {
        stopVoice();
        localState.dictees.currentIndex = parseInt(btn.getAttribute("data-dictee-select"), 10);
        localState.dictees.currentPhraseIndex = 0;
        localState.dictees.userText = "";
        localState.dictees.isValidated = false;
        localState.dictees.diff = null;
        renderDictees(container, subject, _mod, ctx);
      });
    });

    const playAllBtn = container.querySelector("#btn-play-all");
    if (playAllBtn) playAllBtn.addEventListener("click", () => playVoice(current.texteComplet, localState.dictees.speedRate));

    const stopAudioBtn = container.querySelector("#btn-stop-audio");
    if (stopAudioBtn) stopAudioBtn.addEventListener("click", () => stopVoice());

    const playPhraseBtn = container.querySelector("#btn-play-phrase");
    if (playPhraseBtn) playPhraseBtn.addEventListener("click", () => playVoice(currentPhrase.texte, localState.dictees.speedRate));

    const prevPhraseBtn = container.querySelector("#btn-prev-phrase");
    if (prevPhraseBtn) {
      prevPhraseBtn.addEventListener("click", () => {
        if (localState.dictees.currentPhraseIndex > 0) {
          localState.dictees.currentPhraseIndex -= 1;
          renderDictees(container, subject, _mod, ctx);
          playVoice(current.phrases[localState.dictees.currentPhraseIndex].texte, localState.dictees.speedRate);
        }
      });
    }

    const nextPhraseBtn = container.querySelector("#btn-next-phrase");
    if (nextPhraseBtn) {
      nextPhraseBtn.addEventListener("click", () => {
        if (localState.dictees.currentPhraseIndex < totalPhrases - 1) {
          localState.dictees.currentPhraseIndex += 1;
          renderDictees(container, subject, _mod, ctx);
          playVoice(current.phrases[localState.dictees.currentPhraseIndex].texte, localState.dictees.speedRate);
        }
      });
    }

    container.querySelectorAll("[data-speed]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localState.dictees.speedRate = parseFloat(btn.getAttribute("data-speed"));
        renderDictees(container, subject, _mod, ctx);
      });
    });

    const inputArea = container.querySelector("#dictee-text-input");
    if (inputArea) {
      inputArea.addEventListener("input", (e) => {
        localState.dictees.userText = e.target.value;
        localState.dictees.isValidated = false;
        const count = localState.dictees.userText.trim() ? localState.dictees.userText.trim().split(/\s+/).length : 0;
        const countEl = container.querySelector("#dictee-word-count");
        if (countEl) countEl.textContent = `${count} mot(s) saisi(s)`;
      });
    }

    const clearBtn = container.querySelector("#btn-clear-dictee");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        localState.dictees.userText = "";
        localState.dictees.isValidated = false;
        localState.dictees.diff = null;
        renderDictees(container, subject, _mod, ctx);
      });
    }

    const validerBtn = container.querySelector("#btn-valider-dictee");
    if (validerBtn) {
      validerBtn.addEventListener("click", () => {
        if (localState.dictees.isValidated) return;
        stopVoice();
        localState.dictees.isValidated = true;

        const expectedWords = current.texteComplet.trim().split(/\s+/);
        const userWords = localState.dictees.userText.trim() ? localState.dictees.userText.trim().split(/\s+/) : [];
        const tokens = global.GrammarDiff.diffWords(expectedWords, userWords);

        let correctCount = 0;
        let errorsCount = 0;
        const renderedTokens = tokens.map((token) => {
          if (token.type === "correct") {
            correctCount += 1;
            return `<span class="diff-token correct">${escapeHtml(token.expected)}</span>`;
          }
          if (token.type === "missing") {
            errorsCount += 1;
            return `<span class="diff-token missing" title="Mot manquant">[manquant : ${escapeHtml(token.expected)}]</span>`;
          }
          if (token.type === "extra") {
            errorsCount += 1;
            return `<span class="diff-token extra" title="Mot en trop">${escapeHtml(token.user)} (en trop)</span>`;
          }
          errorsCount += 1;
          const title = token.type === "accent" ? "Erreur d'accent ou de majuscule" : "Erreur orthographique";
          return `<span class="diff-token error" title="${title}">${escapeHtml(token.expected)} (écrit : ${escapeHtml(token.user)})</span>`;
        });

        const totalCompare = correctCount + errorsCount;
        const score = totalCompare ? Math.max(0, Math.round(20 * (correctCount / totalCompare))) : 0;
        const pourcentage = totalCompare ? Math.round((correctCount / totalCompare) * 100) : 0;

        let appreciation = "Des accords à retravailler, relisez attentivement les règles.";
        if (score === 20) appreciation = "Sans faute magistral ! Félicitations.";
        else if (score >= 16) appreciation = "Excellent travail ! Très bonne précision d'accord.";
        else if (score >= 12) appreciation = "Bonne maîtrise globale, quelques pièges d'accord à revoir.";

        localState.dictees.diff = {
          score,
          pourcentage,
          correctWords: correctCount,
          totalWords: totalCompare,
          errorsCount,
          appreciation,
          renderedHtml: renderedTokens.join(" ")
        };

        global.PlatformState.recordAttempt(subject.id, score >= 14, score * 5);
        if (ctx && typeof ctx.updateHeaderStats === "function") ctx.updateHeaderStats();
        renderDictees(container, subject, _mod, ctx);
      });
    }
  }

  // ==========================================
  // ATELIER 5 : GRILLE D'EXAMEN NUMÉRIQUE
  // ==========================================
  function getDefaultGridRows() {
    return [
      { group: "Le printemps", func: "Sujet du verbe « a été »", nature: "Nom commun", motFunc: "Noyau du GN sujet" },
      { group: "a été", func: "Noyau verbal", nature: "Verbe conjugué (être)", motFunc: "Centre de la proposition" },
      { group: "tardif", func: "Attribut du sujet", nature: "Adjectif qualificatif", motFunc: "Attribut du sujet « Le printemps »" },
      { group: "cette année", func: "CC de temps", nature: "Groupe nominal", motFunc: "Précise le moment" }
    ];
  }

  function renderGrille(container) {
    const { escapeHtml } = global.PlatformUtils;
    if (!localState.gridRows) {
      localState.gridRows = getDefaultGridRows();
    }

    container.innerHTML = `
      <div class="grid-builder-tools">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button type="button" class="btn-primary" id="add-grid-row-btn">➕ Ajouter une ligne</button>
            <button type="button" class="btn-secondary" id="load-preset-btn">📥 Charger l'exemple guidé</button>
            <button type="button" class="btn-secondary" id="clear-grid-btn">🗑️ Effacer la grille</button>
          </div>
          <button type="button" class="btn-secondary" id="print-grid-btn">🖨️ Imprimer la grille</button>
        </div>
      </div>

      <div class="exam-table-container">
        <table class="exam-table">
          <thead>
            <tr>
              <th class="col-group">1. Groupe de mots</th>
              <th class="col-func">2. Fonction du groupe</th>
              <th class="col-nature">3. Nature de chaque mot</th>
              <th class="col-detail">4. Fonction interne du mot</th>
              <th style="width:50px; text-align:center;">Action</th>
            </tr>
          </thead>
          <tbody id="custom-grid-body"></tbody>
        </table>
      </div>
    `;

    const tableBody = container.querySelector("#custom-grid-body");

    const syncFromDom = () => {
      localState.gridRows = Array.from(tableBody.querySelectorAll("tr")).map((tr) => {
        const inputs = tr.querySelectorAll("input");
        return {
          group: inputs[0].value,
          func: inputs[1].value,
          nature: inputs[2].value,
          motFunc: inputs[3].value
        };
      });
    };

    const appendRow = (row = { group: "", func: "", nature: "", motFunc: "" }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="text" value="${escapeHtml(row.group)}" placeholder="Ex: Entre les branches" style="width:100%; padding:0.4rem; border:1px solid var(--border-light); border-radius:3px;"></td>
        <td><input type="text" value="${escapeHtml(row.func)}" placeholder="Ex: CC de lieu" style="width:100%; padding:0.4rem; border:1px solid var(--border-light); border-radius:3px;"></td>
        <td><input type="text" value="${escapeHtml(row.nature)}" placeholder="Ex: Préposition" style="width:100%; padding:0.4rem; border:1px solid var(--border-light); border-radius:3px;"></td>
        <td><input type="text" value="${escapeHtml(row.motFunc)}" placeholder="Ex: Introduit le CC" style="width:100%; padding:0.4rem; border:1px solid var(--border-light); border-radius:3px;"></td>
        <td style="text-align:center;"><button type="button" class="btn-secondary del-row-btn" style="padding:0.25rem 0.5rem; color:var(--state-error);" aria-label="Supprimer cette ligne">✕</button></td>
      `;
      tableBody.appendChild(tr);
      tr.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", syncFromDom));
      tr.querySelector(".del-row-btn").addEventListener("click", () => {
        tr.remove();
        syncFromDom();
      });
    };

    localState.gridRows.forEach(appendRow);

    container.querySelector("#add-grid-row-btn").addEventListener("click", () => {
      appendRow();
      syncFromDom();
    });

    container.querySelector("#clear-grid-btn").addEventListener("click", () => {
      localState.gridRows = [];
      tableBody.innerHTML = "";
    });

    container.querySelector("#load-preset-btn").addEventListener("click", () => {
      const cas = getData().demonstrationsCas[0];
      localState.gridRows = cas.etape3.mots.map((m) => ({
        group: m.mot,
        func: "Groupe associé",
        nature: m.nature,
        motFunc: m.fonctionInterne
      }));
      tableBody.innerHTML = "";
      localState.gridRows.forEach(appendRow);
    });

    container.querySelector("#print-grid-btn").addEventListener("click", () => window.print());
  }

  // ==========================================
  // ATELIER 6 : MÉMENTO & RÈGLES GRAMMATICALES
  // ==========================================
  function renderMementoCardsInto(contentEl, filter = "") {
    const { escapeHtml, normalizeSearch } = global.PlatformUtils;
    const data = getData().memento;
    const query = normalizeSearch(filter);
    const matches = (value) => !query || normalizeSearch(value).includes(query);

    let html = `<div class="memento-grid">`;

    const variablesFiltrees = data.classesGrammaticales.variables.filter((v) =>
      matches(v.nom) || matches(v.definition) || matches(v.astuce)
    );
    if (variablesFiltrees.length > 0) {
      html += `
        <div class="memento-card">
          <h3>Classes variables (5 natures)</h3>
          <ul class="item-list">
            ${variablesFiltrees.map((v) => `
              <li>
                <strong>${escapeHtml(v.nom)}</strong>
                <span class="subtext">${escapeHtml(v.definition)}</span>
                <span class="subtext"><em>Sous-types :</em> ${escapeHtml(v.sousTypes)}</span>
                <span class="astuce">💡 ${escapeHtml(v.astuce)}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    }

    const invariablesFiltrees = data.classesGrammaticales.invariables.filter((v) =>
      matches(v.nom) || matches(v.definition) || matches(v.astuce)
    );
    if (invariablesFiltrees.length > 0) {
      html += `
        <div class="memento-card">
          <h3>Classes invariables (Ne s'accordent jamais)</h3>
          <ul class="item-list">
            ${invariablesFiltrees.map((v) => `
              <li>
                <strong>${escapeHtml(v.nom)}</strong>
                <span class="subtext">${escapeHtml(v.definition)}</span>
                <span class="subtext"><em>Exemples :</em> ${escapeHtml(v.exemples)}</span>
                <span class="astuce">💡 ${escapeHtml(v.astuce)}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    }

    const verbeFonctions = data.fonctions.autourVerbe.filter((f) =>
      matches(f.nom) || matches(f.role) || matches(f.exemple)
    );
    if (verbeFonctions.length > 0) {
      html += `
        <div class="memento-card">
          <h3>Fonctions autour du verbe</h3>
          <ul class="item-list">
            ${verbeFonctions.map((f) => `
              <li>
                <strong>${escapeHtml(f.nom)}</strong>
                ${f.question !== "—" ? `<span class="subtext"><em>Question clé :</em> ${escapeHtml(f.question)}</span>` : ""}
                <span class="subtext">${escapeHtml(f.role)}</span>
                <span class="astuce" style="background:#f4efe6; color:var(--ink-primary);">Ex: ${escapeHtml(f.exemple)}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    }

    const nomFonctions = data.fonctions.autourNom.filter((f) => matches(f.nom) || matches(f.role));
    const ccFonctions = data.fonctions.circonstanciels.filter((f) => matches(f.nom) || matches(f.role));
    if (nomFonctions.length > 0 || ccFonctions.length > 0) {
      html += `
        <div class="memento-card">
          <h3>Autour du nom & Circonstanciels</h3>
          <ul class="item-list">
            ${nomFonctions.map((f) => `
              <li>
                <strong>${escapeHtml(f.nom)}</strong>
                <span class="subtext">${escapeHtml(f.role)}</span>
                <span class="astuce" style="background:#f4efe6; color:var(--ink-primary);">Ex: ${escapeHtml(f.exemple)}</span>
              </li>
            `).join("")}
            ${ccFonctions.map((f) => `
              <li>
                <strong>${escapeHtml(f.nom)}</strong>
                <span class="subtext"><em>Question :</em> ${escapeHtml(f.question)} — ${escapeHtml(f.role)}</span>
                <span class="astuce" style="background:#f4efe6; color:var(--ink-primary);">Ex: ${escapeHtml(f.exemple)}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    }

    html += `</div>`;

    if (variablesFiltrees.length === 0 && invariablesFiltrees.length === 0 && verbeFonctions.length === 0 && nomFonctions.length === 0 && ccFonctions.length === 0) {
      html = `<div style="text-align:center; padding:3rem; color:var(--ink-muted);">Aucune règle ne correspond à « ${escapeHtml(filter)} ».</div>`;
    }

    contentEl.innerHTML = html;
  }

  function renderMemento(container) {
    const { escapeHtml } = global.PlatformUtils;
    container.innerHTML = `
      <div class="search-bar-wrap">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="search" id="memento-search" class="search-input" aria-label="Rechercher une notion" placeholder="Rechercher une notion (ex: pronom, COD, attribut, préposition, adverbe...)" value="${escapeHtml(localState.mementoQuery)}">
      </div>
      <div id="memento-content"></div>
    `;

    const contentEl = container.querySelector("#memento-content");
    renderMementoCardsInto(contentEl, localState.mementoQuery);

    const searchInput = container.querySelector("#memento-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        localState.mementoQuery = e.target.value;
        renderMementoCardsInto(contentEl, localState.mementoQuery.trim());
      });
    }
  }

  global.GrammaireRenderers = {
    renderPhrases,
    renderMethode,
    renderOrtho,
    renderDictees,
    renderGrille,
    renderMemento,
    stopVoice,
    resetLocalState: resetGrammaireLocalState
  };
})(typeof window !== "undefined" ? window : globalThis);
