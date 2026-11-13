/**
 * Contrôleur de la page matière (matiere.html) :
 * Charge dynamiquement les scripts de la matière sélectionnée,
 * gère la navigation par sous-sections (hub ou rail latéral) et les modules d'entraînement.
 */
document.addEventListener("DOMContentLoaded", async () => {
  "use strict";

  const { escapeHtml } = window.PlatformUtils;
  const Catalog = window.PlatformCatalog;
  const Registry = window.PlatformRegistry;
  const State = window.PlatformState;
  const Engines = window.PlatformEngines;

  State.load();
  window.PlatformHeader.updateHeaderStats();

  const params = new URLSearchParams(window.location.search);
  const subjectId = params.get("s");
  const initialSubId = params.get("sub");
  const initialModId = params.get("mod");

  const catalogEntry = subjectId ? Catalog.getCatalogEntry(subjectId) : null;
  if (!catalogEntry) {
    window.location.replace("index.html");
    return;
  }

  const loadingEl = document.getElementById("subject-loading");
  const workspaceEl = document.getElementById("subject-workspace");
  const breadcrumbSubWrapEl = document.getElementById("breadcrumb-subsection-wrap");
  const breadcrumbSubEl = document.getElementById("breadcrumb-subsection");
  const breadcrumbSubjectEl = document.getElementById("breadcrumb-subject");
  const railListEl = document.getElementById("subsections-rail");
  const hubViewEl = document.getElementById("subsections-hub-view");
  const hubGridEl = document.getElementById("subsections-hub-grid");
  const activeSubViewEl = document.getElementById("active-subsection-view");
  const moduleTabsList = document.getElementById("module-tabs");
  const moduleIntroEl = document.getElementById("module-intro");
  const moduleContainer = document.getElementById("module-container");

  try {
    await window.PlatformLoader.loadScriptsSequentially(catalogEntry.scripts);
  } catch (err) {
    if (loadingEl) {
      loadingEl.innerHTML = `
        <div class="exercise-card empty-state-card">
          <h3>Erreur de chargement</h3>
          <p>${escapeHtml(err.message)}</p>
          <a class="btn-primary" href="index.html">← Retour aux matières</a>
        </div>
      `;
    }
    return;
  }

  const subject = Registry.getSubject(catalogEntry.id);
  if (!subject) {
    window.location.replace("index.html");
    return;
  }

  document.title = `${subject.title} : Atelier d'Entraînement`;

  const viewState = {
    subsectionId: null, // null = hub des sous-sections
    moduleId: null
  };

  function syncUrl(subsectionId, moduleId) {
    const nextParams = new URLSearchParams();
    nextParams.set("s", subject.id);
    if (subsectionId) nextParams.set("sub", subsectionId);
    if (subsectionId && moduleId) nextParams.set("mod", moduleId);
    const nextUrl = `${window.location.pathname}?${nextParams.toString()}`;
    window.history.replaceState(null, "", nextUrl);
  }

  function renderSubjectBanner() {
    const titleEl = document.getElementById("workspace-subject-title");
    const subtitleEl = document.getElementById("workspace-subject-subtitle");
    const badgeEl = document.getElementById("workspace-subject-badge");
    const iconEl = document.getElementById("workspace-subject-icon");

    if (titleEl) titleEl.textContent = subject.title;
    if (subtitleEl) subtitleEl.textContent = subject.subtitle || "";
    if (badgeEl) badgeEl.textContent = subject.category || subject.badge || "Matière";
    if (iconEl) iconEl.textContent = subject.icon || "📘";
    if (breadcrumbSubjectEl) breadcrumbSubjectEl.textContent = subject.title;

    window.PlatformHeader.updateHeaderStats(subject.id);
  }

  function renderSubsectionRail() {
    if (!railListEl) return;
    const isHub = viewState.subsectionId === null;

    let html = `
      <button type="button" class="rail-item rail-overview ${isHub ? "active" : ""}" data-rail-hub="true">
        <span class="rail-item-title">Toutes les sous-sections</span>
        <span class="rail-item-meta">${subject.subsections.length} sections</span>
      </button>
    `;

    html += subject.subsections.map((sub) => {
      const isActive = viewState.subsectionId === sub.id;
      const prog = State.getSubsectionProgress(subject.id, sub.trackableIds);
      const progLabel = prog.total > 0 ? `${prog.pct}%` : `${(sub.modules || []).length} outils`;

      return `
        <button type="button" class="rail-item ${isActive ? "active" : ""}" data-rail-sub="${escapeHtml(sub.id)}">
          <div class="rail-item-row">
            <span class="rail-item-title">${escapeHtml(sub.shortLabel || sub.title)}</span>
            <span class="rail-item-pct ${prog.pct === 100 && prog.total > 0 ? "is-done" : ""}">${escapeHtml(progLabel)}</span>
          </div>
          ${prog.total > 0 ? `
            <div class="rail-mini-bar" aria-hidden="true">
              <div class="rail-mini-fill" style="width:${prog.pct}%"></div>
            </div>
          ` : ""}
        </button>
      `;
    }).join("");

    railListEl.innerHTML = html;

    const hubBtn = railListEl.querySelector("[data-rail-hub]");
    if (hubBtn) {
      hubBtn.addEventListener("click", () => openHub());
    }
    railListEl.querySelectorAll("[data-rail-sub]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openSubsection(btn.getAttribute("data-rail-sub"));
      });
    });
  }

  function renderHub() {
    if (!hubGridEl) return;

    hubGridEl.innerHTML = subject.subsections.map((sub) => {
      const prog = State.getSubsectionProgress(subject.id, sub.trackableIds);
      const modulesPills = (sub.modules || []).map((m) => `
        <button type="button" class="subject-module-chip" data-hub-sub="${escapeHtml(sub.id)}" data-hub-mod="${escapeHtml(m.id)}">
          <span>${escapeHtml(m.icon ? `${m.icon} ` : "")}${escapeHtml(m.label)}</span>
          ${m.badge ? `<span class="nav-badge">${escapeHtml(m.badge)}</span>` : ""}
        </button>
      `).join("");

      return `
        <article class="subsection-card">
          <div class="subsection-card-top">
            <div>
              <span class="badge-tag">${escapeHtml(sub.badge || `${(sub.modules || []).length} modules`)}</span>
              <h3>${escapeHtml(sub.title)}</h3>
            </div>
            ${prog.total > 0 ? `<span class="mono-counter">${prog.done} / ${prog.total}</span>` : ""}
          </div>

          ${sub.subtitle ? `<p class="subsection-card-desc">${escapeHtml(sub.subtitle)}</p>` : ""}

          ${prog.total > 0 ? `
            <div class="fc-progress-bar" aria-hidden="true">
              <div class="fc-progress-fill" style="width:${prog.pct}%"></div>
            </div>
          ` : ""}

          <div class="subject-modules-list">
            ${modulesPills}
          </div>

          <div class="subsection-card-foot">
            <button type="button" class="btn-primary" data-hub-sub="${escapeHtml(sub.id)}" data-hub-mod="${escapeHtml(sub.modules[0].id)}">
              Ouvrir cette sous-section →
            </button>
          </div>
        </article>
      `;
    }).join("");

    hubGridEl.querySelectorAll("[data-hub-sub]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openSubsection(btn.getAttribute("data-hub-sub"), btn.getAttribute("data-hub-mod"));
      });
    });
  }

  function notifyLeave() {
    if (typeof subject.onLeave === "function") {
      subject.onLeave();
    }
  }

  function openHub() {
    notifyLeave();
    viewState.subsectionId = null;
    viewState.moduleId = null;

    if (hubViewEl) hubViewEl.hidden = false;
    if (activeSubViewEl) activeSubViewEl.hidden = true;
    if (breadcrumbSubWrapEl) breadcrumbSubWrapEl.hidden = true;

    renderSubsectionRail();
    renderHub();
    syncUrl(null, null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderModuleTabs(subsection, activeModuleId) {
    if (!moduleTabsList) return;

    moduleTabsList.innerHTML = subsection.modules.map((mod) => {
      const isActive = mod.id === activeModuleId;
      return `
        <li role="presentation">
          <button
            type="button"
            id="tab-btn-${escapeHtml(mod.id)}"
            class="nav-tab-btn ${isActive ? "active" : ""}"
            data-module-id="${escapeHtml(mod.id)}"
            role="tab"
            aria-controls="module-container"
            aria-selected="${isActive}"
            tabindex="${isActive ? "0" : "-1"}">
            <span>${escapeHtml(mod.icon ? `${mod.icon} ` : "")}${escapeHtml(mod.label)}</span>
            ${mod.badge ? `<span class="nav-badge">${escapeHtml(mod.badge)}</span>` : ""}
          </button>
        </li>
      `;
    }).join("");

    const buttons = Array.from(moduleTabsList.querySelectorAll(".nav-tab-btn"));
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        openSubsection(subsection.id, btn.getAttribute("data-module-id"));
      });

      btn.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const offset = event.key === "ArrowRight" ? 1 : -1;
        const next = buttons[(buttons.indexOf(btn) + offset + buttons.length) % buttons.length];
        next.focus();
        openSubsection(subsection.id, next.getAttribute("data-module-id"));
      });
    });
  }

  function renderActiveModule(subsection, mod) {
    const subTitleEl = document.getElementById("active-subsection-title");
    const subProgressEl = document.getElementById("active-subsection-progress");
    const prog = State.getSubsectionProgress(subject.id, subsection.trackableIds);

    if (subTitleEl) subTitleEl.textContent = subsection.title;
    if (subProgressEl) {
      subProgressEl.hidden = prog.total === 0;
      subProgressEl.textContent = prog.total > 0 ? `${prog.done} / ${prog.total} maîtrisés (${prog.pct}%)` : "";
    }

    if (moduleIntroEl) {
      moduleIntroEl.innerHTML = `
        <div class="module-intro-head">
          <span class="badge-tag">${escapeHtml(mod.tag || subsection.shortLabel || subject.title)}</span>
          <h2>${escapeHtml(mod.title || mod.label)}</h2>
          ${mod.intro ? `<p>${escapeHtml(mod.intro)}</p>` : ""}
        </div>
      `;
    }

    if (!moduleContainer) return;
    moduleContainer.innerHTML = "";
    moduleContainer.setAttribute("aria-labelledby", `tab-btn-${mod.id}`);

    const ctx = {
      updateHeaderStats: () => window.PlatformHeader.updateHeaderStats(subject.id),
      onProgressChange: () => {
        const updated = State.getSubsectionProgress(subject.id, subsection.trackableIds);
        if (subProgressEl && updated.total > 0) {
          subProgressEl.textContent = `${updated.done} / ${updated.total} maîtrisés (${updated.pct}%)`;
        }
        renderSubsectionRail();
      }
    };

    if (mod.type === "quiz") {
      Engines.renderQuizModule(moduleContainer, subject, mod, ctx);
    } else if (mod.type === "flashcards") {
      Engines.renderFlashcardsModule(moduleContainer, subject, mod, ctx);
    } else if (mod.type === "reperes") {
      Engines.renderReperesModule(moduleContainer, subject, mod, ctx);
    } else if (mod.type === "custom" && typeof mod.render === "function") {
      mod.render(moduleContainer, subject, mod, ctx);
    } else {
      moduleContainer.innerHTML = `<div class="exercise-card"><p>Type de module non pris en charge.</p></div>`;
    }
  }

  function openSubsection(subsectionId, moduleId = null) {
    const subsection = Registry.getSubsection(subject, subsectionId);
    if (!subsection) {
      openHub();
      return;
    }

    if (viewState.subsectionId !== subsection.id || viewState.moduleId !== moduleId) {
      notifyLeave();
    }

    const targetMod = subsection.modules.find((m) => m.id === moduleId) || subsection.modules[0];
    viewState.subsectionId = subsection.id;
    viewState.moduleId = targetMod.id;

    if (hubViewEl) hubViewEl.hidden = true;
    if (activeSubViewEl) activeSubViewEl.hidden = false;
    if (breadcrumbSubWrapEl) breadcrumbSubWrapEl.hidden = false;
    if (breadcrumbSubEl) {
      breadcrumbSubEl.textContent = subsection.shortLabel || subsection.title;
    }

    renderSubsectionRail();
    renderModuleTabs(subsection, targetMod.id);
    renderActiveModule(subsection, targetMod);
    syncUrl(subsection.id, targetMod.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Breadcrumb click sur le nom de la matière -> retour au hub des sous-sections
  if (breadcrumbSubjectEl) {
    breadcrumbSubjectEl.addEventListener("click", () => openHub());
  }

  const backToHubBtn = document.getElementById("back-to-hub-btn");
  if (backToHubBtn) {
    backToHubBtn.addEventListener("click", () => openHub());
  }

  window.PlatformHeader.bindResetButton(() => {
    window.PlatformHeader.updateHeaderStats(subject.id);
    if (viewState.subsectionId) {
      openSubsection(viewState.subsectionId, viewState.moduleId);
    } else {
      openHub();
    }
  });

  if (loadingEl) loadingEl.hidden = true;
  if (workspaceEl) workspaceEl.hidden = false;
  renderSubjectBanner();

  // Routage initial : ?sub=...&mod=... ou ?mod=... ou Hub des sous-sections
  if (initialSubId && Registry.getSubsection(subject, initialSubId)) {
    openSubsection(initialSubId, initialModId);
  } else if (initialModId) {
    const matchedSub = Registry.findSubsectionByModule(subject, initialModId);
    if (matchedSub) {
      openSubsection(matchedSub.id, initialModId);
    } else {
      openHub();
    }
  } else {
    openHub();
  }
});
