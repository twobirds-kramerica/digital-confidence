/* ============================================================================
   DCC v2 — Manage-my-data control (S-DCC-LAYER0-FIXES-001, 2026-08-04)
   Save my progress / Restore my progress / Clear my data.
   Implements hal-stack/standards/base-security.md §6 (user data deletion)
   and gives progress a way to survive a cleared cache — no login, no
   server, everything stays on this device. Loaded on privacy.html (full
   save/restore/clear control) and index.html (clear-only entry point,
   S-DCC-SHARED-TERMINAL-EXIT-001 2026-08-12, for shared/library
   terminals — see .session-exit there). Element lookups below are all
   guarded, so a page missing some of the buttons/inputs is fine.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document.documentElement;
  var IS_FR = (doc.getAttribute("lang") || "en").toLowerCase().indexOf("fr") === 0;

  /* ---------- Which localStorage keys belong to DCC ------------------------
     Prefixes cover the vast majority (module progress, quiz state, theme,
     text size, city, onboarding). A short explicit list covers the older,
     un-prefixed keys (userName, finalQuizScore, etc. — see the name-key
     consolidation done in the same sprint, and classic/js/storage-keys.js).
     Deliberately NOT a blanket localStorage.clear() — only DCC's own keys
     are ever touched, even though this origin only ever holds DCC data. */
  var PREFIXES = ["dc-", "dcc-", "dccv2-", "dcc_"];
  var EXTRA_KEYS = [
    "userName", "finalQuizUnlocked", "finalQuizScore", "finalQuizDate",
    "emailCaptured", "emailCaptureDate", "userEmail",
    "analytics_consent", "privacyConsentGiven", "privacyConsentDate",
    "yt_intercept_dismissed", "brenda-font-size", "brenda-theme"
  ];
  function isDccKey(key) {
    for (var i = 0; i < PREFIXES.length; i++) {
      if (key.indexOf(PREFIXES[i]) === 0) return true;
    }
    return EXTRA_KEYS.indexOf(key) !== -1;
  }
  function collectDccData() {
    var data = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && isDccKey(k)) data[k] = localStorage.getItem(k);
      }
    } catch (e) {}
    return data;
  }

  function showStatus(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.classList.toggle("is-error", !!isError);
    el.classList.toggle("is-success", !isError);
  }

  /* ---------- Save my progress (download a small .json file) --------------- */
  function saveProgress(statusEl) {
    var data = collectDccData();
    var keyCount = Object.keys(data).length;
    if (!keyCount) {
      showStatus(statusEl, IS_FR
        ? "Rien à enregistrer pour l'instant — aucune progression n'est encore stockée sur cet appareil."
        : "Nothing to save yet — no progress is stored on this device yet.", true);
      return;
    }
    var payload = {
      source: "dcc-progress-export",
      exportedAt: new Date().toISOString(),
      data: data
    };
    var blob;
    try {
      blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    } catch (e) {
      showStatus(statusEl, IS_FR ? "Impossible d'enregistrer le fichier sur cet appareil." : "Could not build the save file on this device.", true);
      return;
    }
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    var stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = "dcc-progress-" + stamp + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    showStatus(statusEl, IS_FR
      ? "Enregistré : dcc-progress-" + stamp + ".json — gardez ce fichier en lieu sûr."
      : "Saved: dcc-progress-" + stamp + ".json — keep this file somewhere safe.", false);
  }

  /* ---------- Restore my progress (read a previously-saved .json file) ----- */
  function restoreProgress(file, statusEl) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      var parsed;
      try {
        parsed = JSON.parse(e.target.result);
      } catch (err) {
        showStatus(statusEl, IS_FR
          ? "Ce fichier n'a pas pu être lu. Choisissez le fichier .json que vous avez enregistré."
          : "That file could not be read. Please choose the .json file you saved earlier.", true);
        return;
      }
      var data = parsed && parsed.data && typeof parsed.data === "object" ? parsed.data : null;
      if (!data) {
        showStatus(statusEl, IS_FR
          ? "Ce fichier ne ressemble pas à un fichier de progression du Centre de confiance numérique."
          : "That does not look like a Digital Confidence Centre progress file.", true);
        return;
      }
      var restored = 0;
      try {
        Object.keys(data).forEach(function (k) {
          if (isDccKey(k)) {
            localStorage.setItem(k, data[k]);
            restored++;
          }
        });
      } catch (err) {}
      if (!restored) {
        showStatus(statusEl, IS_FR ? "Aucune donnée reconnue dans ce fichier." : "No recognizable data was found in that file.", true);
        return;
      }
      showStatus(statusEl, IS_FR
        ? "Restauré : " + restored + " élément(s). Actualisation de la page…"
        : "Restored " + restored + " saved item" + (restored === 1 ? "" : "s") + ". Reloading this page now…", false);
      setTimeout(function () { window.location.reload(); }, 1200);
    };
    reader.onerror = function () {
      showStatus(statusEl, IS_FR ? "Impossible de lire ce fichier." : "Could not read that file.", true);
    };
    reader.readAsText(file);
  }

  /* ---------- Clear my data (in-product control — base-security.md §6) ----- */
  function clearData(statusEl) {
    var confirmMsg = IS_FR
      ? "Ceci effacera votre progression, votre nom et vos préférences enregistrés sur cet appareil. Cette action est irréversible. Continuer?"
      : "This will erase your saved progress, name, and preferences on this device. This cannot be undone. Continue?";
    if (!window.confirm(confirmMsg)) return;
    var removed = 0;
    try {
      var keys = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && isDccKey(k)) keys.push(k);
      }
      keys.forEach(function (k) {
        localStorage.removeItem(k);
        removed++;
      });
    } catch (e) {}
    showStatus(statusEl, IS_FR
      ? "Terminé. " + removed + " élément(s) effacé(s) de cet appareil."
      : "Done. " + removed + " saved item" + (removed === 1 ? "" : "s") + " cleared from this device.", false);
  }

  /* ---------- Wire the buttons ---------------------------------------------- */
  var statusEl = document.getElementById("dcc-data-status");
  var saveBtn = document.querySelector("[data-dcc-save-progress]");
  var restoreBtn = document.querySelector("[data-dcc-restore-progress-btn]");
  var restoreFile = document.getElementById("dcc-restore-file");
  var clearBtn = document.querySelector("[data-dcc-clear-data]");

  if (saveBtn) saveBtn.addEventListener("click", function () { saveProgress(statusEl); });
  if (restoreBtn && restoreFile) {
    restoreBtn.addEventListener("click", function () { restoreFile.click(); });
    restoreFile.addEventListener("change", function () {
      var file = restoreFile.files && restoreFile.files[0];
      restoreProgress(file, statusEl);
      restoreFile.value = "";
    });
  }
  if (clearBtn) clearBtn.addEventListener("click", function () { clearData(statusEl); });
})();
