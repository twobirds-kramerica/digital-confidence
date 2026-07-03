/* ============================================================================
   DCC v2 shared behaviour — Fable pass (2026-07-03)
   Text-size toggle (A− A A+) · dark-mode toggle · layered consent ·
   no-login Small Wins progress · read-aloud helper.
   Everything stores locally in the browser only. No accounts, no tracking.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document.documentElement;

  /* ---------- Text size (A− A A+) — class already set inline in <head> ---- */
  var SIZES = ["s", "m", "l"];
  function currentSize() {
    for (var i = 0; i < SIZES.length; i++) {
      if (doc.classList.contains("text-size-" + SIZES[i])) return SIZES[i];
    }
    return null; // default 19px, between s and m
  }
  function setSize(size) {
    SIZES.forEach(function (s) { doc.classList.remove("text-size-" + s); });
    if (size) doc.classList.add("text-size-" + size);
    try { localStorage.setItem("dccv2-text-size", size || ""); } catch (e) {}
    document.querySelectorAll("[data-text-size]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-text-size") === (size || "default") ? "true" : "false");
    });
  }
  document.querySelectorAll("[data-text-size]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var v = btn.getAttribute("data-text-size");
      setSize(v === "default" ? null : v);
    });
  });
  // Reflect stored state on the buttons at load
  (function () {
    var s = currentSize();
    document.querySelectorAll("[data-text-size]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-text-size") === (s || "default") ? "true" : "false");
    });
  })();

  /* ---------- Dark mode toggle -------------------------------------------- */
  var themeBtn = document.querySelector("[data-theme-toggle]");
  function labelTheme() {
    if (!themeBtn) return;
    var dark = doc.getAttribute("data-theme") === "dark";
    themeBtn.textContent = dark ? "☀ Light mode" : "🌙 Dark mode";
    themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = doc.getAttribute("data-theme") === "dark" ? "light" : "dark";
      doc.setAttribute("data-theme", next);
      try { localStorage.setItem("dccv2-theme", next); } catch (e) {}
      labelTheme();
    });
    labelTheme();
  }

  /* ---------- Layered consent ---------------------------------------------
     One plain line + Accept / Reject / Preferences reveal.
     Stored locally; nothing is sent anywhere. Functional is always on
     (it is what remembers your text size). ------------------------------- */
  var consentBar = document.getElementById("consent-bar");
  if (consentBar) {
    var saved = null;
    try { saved = localStorage.getItem("dccv2-consent"); } catch (e) {}
    if (!saved) {
      consentBar.hidden = false;
      document.body.classList.add("consent-open");
    }
    function closeConsent(value) {
      try { localStorage.setItem("dccv2-consent", JSON.stringify(value)); } catch (e) {}
      consentBar.hidden = true;
      document.body.classList.remove("consent-open");
    }
    var prefs = document.getElementById("consent-prefs");
    var btnAccept = document.getElementById("consent-accept");
    var btnReject = document.getElementById("consent-reject");
    var btnPrefs = document.getElementById("consent-prefs-toggle");
    var btnSave = document.getElementById("consent-save");
    if (btnAccept) btnAccept.addEventListener("click", function () {
      closeConsent({ functional: true, performance: true, marketing: true });
    });
    if (btnReject) btnReject.addEventListener("click", function () {
      closeConsent({ functional: true, performance: false, marketing: false });
    });
    if (btnPrefs) btnPrefs.addEventListener("click", function () {
      var open = !prefs.hidden;
      prefs.hidden = open;
      btnPrefs.setAttribute("aria-expanded", open ? "false" : "true");
    });
    if (btnSave) btnSave.addEventListener("click", function () {
      closeConsent({
        functional: true,
        performance: !!document.getElementById("consent-performance").checked,
        marketing: !!document.getElementById("consent-marketing").checked
      });
    });
  }

  /* ---------- Small Wins — no-login micro-progression ---------------------
     Pages call DCC.smallWins(pageKey, totalSteps). Steps are recorded with
     DCC.winStep(pageKey, stepName). Bar + count update immediately. ------ */
  var SW_PREFIX = "dccv2-wins-";
  function winsFor(key) {
    try { return JSON.parse(localStorage.getItem(SW_PREFIX + key)) || []; }
    catch (e) { return []; }
  }
  function renderWins(key, total) {
    var wins = winsFor(key);
    var fill = document.querySelector('[data-sw-fill="' + key + '"]');
    var count = document.querySelector('[data-sw-count="' + key + '"]');
    if (fill) fill.style.width = Math.min(100, Math.round(wins.length / total * 100)) + "%";
    if (count) count.textContent = wins.length + " of " + total;
    return wins.length;
  }
  window.DCC = window.DCC || {};
  window.DCC.smallWins = renderWins;
  window.DCC.winStep = function (key, step, total) {
    var wins = winsFor(key);
    if (wins.indexOf(step) === -1) {
      wins.push(step);
      try { localStorage.setItem(SW_PREFIX + key, JSON.stringify(wins)); } catch (e) {}
    }
    return renderWins(key, total);
  };
  window.DCC.winCount = function (key) { return winsFor(key).length; };

  /* ---------- Read aloud (Web Speech API) ---------------------------------
     Same approach as the scam-defence prototype: en-CA, gentle rate,
     reads the page's headings and paragraphs inside <main>. ------------- */
  var readBtn = document.querySelector("[data-read-aloud]");
  if (readBtn) {
    var reading = false;
    function stopReading() {
      reading = false;
      window.speechSynthesis && window.speechSynthesis.cancel();
      readBtn.setAttribute("aria-pressed", "false");
      readBtn.textContent = "🔊 Read aloud";
    }
    readBtn.addEventListener("click", function () {
      if (!("speechSynthesis" in window)) {
        readBtn.textContent = "Read aloud is not available in this browser";
        return;
      }
      if (reading) { stopReading(); return; }
      reading = true;
      readBtn.setAttribute("aria-pressed", "true");
      readBtn.textContent = "⏹ Stop reading";
      var nodes = document.querySelectorAll("main h1, main h2, main h3, main p, main button, main .mfrom, main .msub");
      var text = Array.prototype.map.call(nodes, function (n) { return n.textContent.trim(); })
        .filter(Boolean).join(". ");
      var u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      u.lang = "en-CA";
      u.onend = stopReading;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    });
  }
})();
