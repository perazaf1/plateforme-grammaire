/**
 * Contrôleur de la page d'accueil (index.html) :
 * Menu de sélection des matières, filtrage par domaine, recherche et compatibilité des anciens liens hash.
 */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const { escapeHtml, normalizeSearch } = window.PlatformUtils;
  const Catalog = window.PlatformCatalog;
  const State = window.PlatformState;

  const LEGACY_HASH_MAP = {
    phrases: "matiere.html?s=grammaire&sub=analyse&mod=phrases",
    quiz: "matiere.html?s=grammaire&sub=analyse&mod=quiz",
    methode: "matiere.html?s=grammaire&sub=analyse&mod=methode",
    grille: "matiere.html?s=grammaire&sub=analyse&mod=grille",
    orthographe: "matiere.html?s=grammaire&sub=orthographe&mod=orthographe",
    dictees: "matiere.html?s=grammaire&sub=orthographe&mod=dictees",
    memento: "matiere.html?s=grammaire&sub=memento&mod=memento",
    arts: "matiere.html?s=connaissance-arts&sub=global&mod=quiz"
  };

  function handleLegacyHashRedirect() {
    const raw = window.location.hash.replace(/^#/, "").trim();
    if (!raw || raw === "accueil") return false;
    if (LEGACY_HASH_MAP[raw]) {
      window.location.replace(LEGACY_HASH_MAP[raw]);
      return true;
    }
    const [sid, mid] = raw.split("/");
    if (Catalog.getCatalogEntry(sid)) {
      const target = mid
        ? `matiere.html?s=${encodeURIComponent(sid)}&mod=${encodeURIComponent(mid)}`
        : `matiere.html?s=${encodeURIComponent(sid)}`;
      window.location.replace(target);
      return true;
    }
    return false;
  }

  if (handleLegacyHashRedirect()) return;

  State.load();

  const filterHost = document.getElementById("catalog-filters");
  const searchInput = document.getElementById("catalog-search");
  const grid = document.getElementById("subjects-grid");
  const countEl = document.getElementById("catalog-count");

  const uiState = {
    category: "all",
    query: ""
  };

  function renderCategoryFilters() {
    if (!filterHost) return;
    const entries = Catalog.getCatalog();
    const categories = ["all", ...Array.from(new Set(entries.map((e) => e.category).filter(Boolean)))];

    filterHost.innerHTML = categories.map((cat) => {
      const label = cat === "all" ? `Toutes (${entries.length})` : cat;
      const isActive = uiState.category === cat;
      return `
        <button type="button" class="domain-pill ${isActive ? "active" : ""}" data-cat="${escapeHtml(cat)}" aria-pressed="${isActive}">
          ${escapeHtml(label)}
        </button>
      `;
    }).join("");

    filterHost.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        uiState.category = btn.getAttribute("data-cat");
        renderCategoryFilters();
        renderSubjects();
      });
    });
  }

  function renderSubjects() {
    if (!grid) return;
    const entries = Catalog.getCatalog();
    const qNorm = normalizeSearch(uiState.query.trim());

    const filtered = entries.filter((entry) => {
      if (uiState.category !== "all" && entry.category !== uiState.category) return false;
      if (!qNorm) return true;
      const haystack = [
        entry.title,
        entry.subtitle,
        entry.category,
        entry.description,
        ...(entry.subsectionsPreview || []).map((s) => `${s.title} ${s.meta}`)
      ].join(" ");
      return normalizeSearch(haystack).includes(qNorm);
    });

    if (countEl) {
      countEl.textContent = `${filtered.length} matière${filtered.length > 1 ? "s" : ""}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="exercise-card empty-state-card" style="grid-column: 1 / -1;">
          <h3>Aucune matière trouvée</h3>
          <p>Essayez un autre mot-clé ou réinitialisez le filtre par domaine.</p>
          <button type="button" class="btn-secondary" id="catalog-reset-search">Tout afficher</button>
        </div>
      `;
      const resetBtn = grid.querySelector("#catalog-reset-search");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          uiState.category = "all";
          uiState.query = "";
          if (searchInput) searchInput.value = "";
          renderCategoryFilters();
          renderSubjects();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map((entry) => {
      const subjectScore = State.getSubjectScore(entry.id);
      const doneCount = State.getSubjectMasteryCount(entry.id);
      const totalItems = entry.totalItems || 0;
      const pct = totalItems > 0 ? Math.min(100, Math.round((doneCount / totalItems) * 100)) : 0;

      const previewLinks = (entry.subsectionsPreview || []).slice(0, 4).map((sub) => `
        <a class="subsection-preview-link" href="matiere.html?s=${encodeURIComponent(entry.id)}&sub=${encodeURIComponent(sub.id)}">
          <span class="sub-prev-title">${escapeHtml(sub.title)}</span>
          <span class="sub-prev-meta">${escapeHtml(sub.meta)}</span>
        </a>
      `).join("");

      const remainingCount = Math.max(0, (entry.subsectionsPreview || []).length - 4);

      return `
        <article class="subject-card">
          <div class="subject-card-top">
            <div class="subject-card-title-row">
              <div class="subject-icon-box" aria-hidden="true">${escapeHtml(entry.icon || "📘")}</div>
              <div>
                <span class="badge-tag">${escapeHtml(entry.category || "Matière")}</span>
                <h3>${escapeHtml(entry.title)}</h3>
                <p class="subject-subtitle">${escapeHtml(entry.subtitle || "")}</p>
              </div>
            </div>
            <div class="stat-chip">${subjectScore} XP</div>
          </div>

          <p class="subject-description">${escapeHtml(entry.description || "")}</p>

          <div class="subject-progress-wrap">
            <div class="subject-progress-head">
              <span>${escapeHtml(entry.statsSummary || "")}</span>
              <span class="mono-counter">${pct}% maîtrisé</span>
            </div>
            <div class="fc-progress-bar" aria-hidden="true">
              <div class="fc-progress-fill" style="width:${pct}%"></div>
            </div>
          </div>

          <div class="subsection-preview-list" aria-label="Sous-sections de ${escapeHtml(entry.title)}">
            ${previewLinks}
            ${remainingCount > 0 ? `
              <a class="subsection-more-link" href="matiere.html?s=${encodeURIComponent(entry.id)}">
                + ${remainingCount} autre${remainingCount > 1 ? "s" : ""} sous-section${remainingCount > 1 ? "s" : ""}
              </a>
            ` : ""}
          </div>

          <div class="subject-card-footer">
            <a class="btn-primary subject-open-cta" href="matiere.html?s=${encodeURIComponent(entry.id)}">
              Voir les sous-sections →
            </a>
          </div>
        </article>
      `;
    }).join("");
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      uiState.query = e.target.value;
      renderSubjects();
    });
  }

  window.addEventListener("hashchange", handleLegacyHashRedirect);

  window.PlatformHeader.updateHeaderStats();
  window.PlatformHeader.bindResetButton(() => {
    renderSubjects();
  });
  renderCategoryFilters();
  renderSubjects();
});
