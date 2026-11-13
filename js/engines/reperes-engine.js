/**
 * Moteur de fiches de cours & repères (fil conducteur, chronologie, noms clés, notions).
 * S'adapte automatiquement à une sous-section (1 cours) ou à toute la matière (N cours).
 */
(function (global) {
  "use strict";

  const moduleStates = new Map();

  function getState(key) {
    if (!moduleStates.has(key)) {
      moduleStates.set(key, {
        courseFilter: "all",
        query: ""
      });
    }
    return moduleStates.get(key);
  }

  function renderTableSection(title, col1, col2, rows, escapeHtml) {
    if (!rows || rows.length === 0) return "";
    return `
      <div class="repere-table-block">
        <h4>${escapeHtml(title)} <span class="repere-count">(${rows.length})</span></h4>
        <div class="exam-table-container">
          <table class="exam-table repere-table">
            <thead>
              <tr>
                <th style="width:28%;">${escapeHtml(col1)}</th>
                <th>${escapeHtml(col2)}</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(([k, v]) => `
                <tr>
                  <td><strong>${escapeHtml(k)}</strong></td>
                  <td>${escapeHtml(v)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderReperesModule(container, subject, moduleDef) {
    const { escapeHtml, normalizeSearch } = global.PlatformUtils;
    const state = getState(`${subject.id}:${moduleDef.id}:${moduleDef.title || ""}`);
    const courses = Array.isArray(moduleDef.courses)
      ? moduleDef.courses
      : (Array.isArray(subject.courses) ? subject.courses : []);

    const controlsHtml = `
      ${courses.length > 1 ? `
        <div class="filter-toolbar">
          <label for="repere-course-select" class="filter-toolbar-label">Cours :</label>
          <div class="filter-select-wrap">
            <select id="repere-course-select" class="filter-select" aria-label="Filtrer les repères par cours">
              <option value="all">Tous les cours (${courses.length})</option>
              ${courses.map((c) => `
                <option value="${c.num}" ${state.courseFilter === String(c.num) ? "selected" : ""}>Cours ${c.num} : ${escapeHtml(c.title)}</option>
              `).join("")}
            </select>
          </div>
        </div>
      ` : ""}
      <div class="search-bar-wrap">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="search" id="repere-search-input" class="search-input" aria-label="Rechercher dans les fiches" placeholder="Rechercher une date, un personnage, un concept..." value="${escapeHtml(state.query)}">
      </div>
    `;

    const buildResultsHtml = () => {
      const queryNorm = normalizeSearch(state.query.trim());
      const matchesRow = ([k, v]) => !queryNorm || normalizeSearch(k).includes(queryNorm) || normalizeSearch(v).includes(queryNorm);
      const visibleCourses = courses.length === 1
        ? courses
        : courses.filter((c) => state.courseFilter === "all" || String(c.num) === state.courseFilter);

      const cardsHtml = visibleCourses.map((course) => {
        const chrono = (course.chronologie || []).filter(matchesRow);
        const noms = (course.noms || []).filter(matchesRow);
        const notions = (course.notions || []).filter(matchesRow);
        const filMatches = !queryNorm || normalizeSearch(course.title).includes(queryNorm) || normalizeSearch(course.filConducteur).includes(queryNorm);

        if (queryNorm && !filMatches && chrono.length === 0 && noms.length === 0 && notions.length === 0) {
          return "";
        }

        return `
          <article class="exercise-card repere-course-card">
            <div class="card-header-row">
              <span class="badge-tag">Cours ${course.num}</span>
              <div class="mono-counter">${chrono.length + noms.length + notions.length} repères</div>
            </div>
            <h3 class="repere-course-title">${escapeHtml(course.title)}</h3>
            ${course.filConducteur ? `
              <div class="fil-conducteur-box">
                <strong>Fil conducteur :</strong> ${escapeHtml(course.filConducteur)}
              </div>
            ` : ""}
            ${renderTableSection("Chronologie essentielle", "Date", "Événement", chrono, escapeHtml)}
            ${renderTableSection("Noms et personnages clés", "Nom", "Rôle / à retenir", noms, escapeHtml)}
            ${renderTableSection("Concepts et notions essentiels", "Notion", "Définition", notions, escapeHtml)}
          </article>
        `;
      }).join("");

      return cardsHtml || `
        <div class="exercise-card empty-state-card">
          <p>Aucun repère ne correspond à « ${escapeHtml(state.query)} ».</p>
        </div>
      `;
    };

    container.innerHTML = controlsHtml + `<div id="repere-results">${buildResultsHtml()}</div>`;

    const resultsEl = container.querySelector("#repere-results");
    const courseSel = container.querySelector("#repere-course-select");
    if (courseSel) {
      courseSel.addEventListener("change", (e) => {
        state.courseFilter = e.target.value;
        if (resultsEl) resultsEl.innerHTML = buildResultsHtml();
      });
    }

    const searchInput = container.querySelector("#repere-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.query = e.target.value;
        if (resultsEl) resultsEl.innerHTML = buildResultsHtml();
      });
    }
  }

  global.PlatformEngines = global.PlatformEngines || {};
  global.PlatformEngines.renderReperesModule = renderReperesModule;
})(typeof window !== "undefined" ? window : globalThis);
