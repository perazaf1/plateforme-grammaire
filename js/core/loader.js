/**
 * Chargeur séquentiel de scripts par matière.
 * Fonctionne sans bundler sur Netlify, serveur HTTP local et file://.
 */
(function (global) {
  "use strict";

  const loadedScripts = new Set();

  function loadScript(src) {
    if (loadedScripts.has(src)) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = () => {
        loadedScripts.add(src);
        resolve();
      };
      script.onerror = () => reject(new Error(`Impossible de charger le script : ${src}`));
      document.body.appendChild(script);
    });
  }

  async function loadScriptsSequentially(paths) {
    for (const src of paths || []) {
      await loadScript(src);
    }
  }

  global.PlatformLoader = {
    loadScript,
    loadScriptsSequentially
  };
})(typeof window !== "undefined" ? window : globalThis);
