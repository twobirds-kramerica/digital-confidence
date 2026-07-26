/* ============================================================================
   DCC v2 shared behaviour — Fable pass (2026-07-03)
   Text-size toggle (A− A A+) · dark-mode toggle · layered consent ·
   no-login Small Wins progress · read-aloud helper.
   Everything stores locally in the browser only. No accounts, no tracking.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document.documentElement;

  /* ---------- Locale — French pages set <html lang="fr-CA"> ---------------- */
  var IS_FR = (doc.getAttribute("lang") || "en").toLowerCase().indexOf("fr") === 0;

  /* ---------- Anchor-scroll offset — clear the sticky header exactly -------
     Site-wide fix for S-DCC-ANCHOR-SCROLL-UX-001 (2026-07-26): the header's
     real height varies with viewport width (its toolbar wraps onto 2-3 rows
     on narrow screens, ~74px up to ~180px+), and with the A-/A/A+ text-size
     toggle. A fixed CSS scroll-padding-top (core.css) covers the common
     single-row case as a no-JS fallback; this measures the header for real
     and re-scrolls so every anchor target — any element with an id, any page
     that loads dcc.js — lands cleanly below it, no prior section visible. */
  (function () {
    var header = document.querySelector(".site-header");
    function headerOffset() {
      return (header ? Math.ceil(header.getBoundingClientRect().height) : 74) + 16;
    }
    function scrollToId(id, behavior) {
      var el = document.getElementById(id);
      if (!el) return false;
      var y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset();
      window.scrollTo({ top: Math.max(y, 0), behavior: behavior || "smooth" });
      return true;
    }
    function isSamePagePath(pathPart) {
      if (pathPart === "") return true; // bare "#id" link
      var currentFile = location.pathname.split("/").pop() || "index.html";
      var linkFile = pathPart.split("/").pop() || "index.html";
      return currentFile === linkFile;
    }
    // Clicking a nav/in-page anchor link: intercept and scroll with the real offset.
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a[href*='#']") : null;
      if (!a) return;
      var href = a.getAttribute("href") || "";
      var hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;
      var id = href.slice(hashIdx + 1);
      if (!id || !isSamePagePath(href.slice(0, hashIdx))) return;
      if (!document.getElementById(id)) return; // not a target on this page — let it navigate
      e.preventDefault();
      if (scrollToId(id)) { try { history.pushState(null, "", "#" + id); } catch (err) {} }
    });
    // Landing directly on a page with a #hash (cross-page link, bookmark, refresh).
    // The browser's own native fragment-scroll can fire after our correction
    // (timing varies by browser/load speed) and would silently undo it, so
    // re-apply a couple of times shortly after in case that happens.
    function fixInitialHash() {
      if (!location.hash) return;
      var id = decodeURIComponent(location.hash.slice(1));
      scrollToId(id, "auto");
      setTimeout(function () { scrollToId(id, "auto"); }, 100);
      setTimeout(function () { scrollToId(id, "auto"); }, 400);
    }
    if (document.readyState === "complete") fixInitialHash();
    else window.addEventListener("load", fixInitialHash);
  })();

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
    themeBtn.textContent = dark
      ? (IS_FR ? "☀ Mode clair" : "☀ Light mode")
      : (IS_FR ? "🌙 Mode sombre" : "🌙 Dark mode");
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

  /* ---------- Display-settings expander -----------------------------------
     The text-size / dark-mode / read-aloud controls collapse behind a gear
     toggle so they stay one tap away without dominating the sticky header. */
  var settingsToggle = document.querySelector("[data-settings-toggle]");
  var displaySettings = document.getElementById("display-settings");
  if (settingsToggle && displaySettings) {
    settingsToggle.addEventListener("click", function () {
      var open = displaySettings.hidden;
      displaySettings.hidden = !open;
      settingsToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
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
    if (count) count.textContent = wins.length + (IS_FR ? " sur " : " of ") + total;
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
     Revision pass 2026-07-03 (note #8):
     · Voice tuned for hard-of-hearing listeners — en-CA preferred, slightly
       lower pitch (consonant clarity), slower-than-default base rate.
     · Speed control: Slower / Normal / Faster buttons ([data-read-rate]),
       remembered locally.
     · Read-along indicator: LIGHT BOLDING of the current word only —
       no highlight colour, no auto-scroll, no motion.
     Reads block-by-block through <main>; each block's words are wrapped in
     spans while it is being read, then its original HTML is restored. ---- */
  var readBtn = document.querySelector("[data-read-aloud]");
  if (readBtn) {
    var RATES = { slow: 0.6, normal: 0.85, fast: 1.25 };
    var rateKey = "normal";
    try { rateKey = localStorage.getItem("dccv2-read-rate") || "normal"; } catch (e) {}
    if (!RATES[rateKey]) rateKey = "normal";

    function reflectRate() {
      document.querySelectorAll("[data-read-rate]").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-read-rate") === rateKey ? "true" : "false");
      });
    }
    document.querySelectorAll("[data-read-rate]").forEach(function (b) {
      b.addEventListener("click", function () {
        rateKey = b.getAttribute("data-read-rate");
        try { localStorage.setItem("dccv2-read-rate", rateKey); } catch (e) {}
        reflectRate();
        if (reading) { // apply the new speed right away, from the current block
          var i = queueIndex;
          stopReading();
          startReading(i);
        }
      });
    });
    reflectRate();

    /* Voice choice — best-clarity heuristic for hard-of-hearing listeners:
       Canadian English first, then any English; prefer higher-quality
       natural/neural voices where the browser exposes them. */
    var chosenVoice = null;
    function pickVoice() {
      if (!("speechSynthesis" in window)) return;
      var voices = window.speechSynthesis.getVoices() || [];
      if (!voices.length) return;
      function score(v) {
        var s = 0, lang = (v.lang || "").toLowerCase(), name = (v.name || "");
        var wantExact = IS_FR ? "fr-ca" : "en-ca";
        var wantPrefix = IS_FR ? "fr" : "en";
        if (lang === wantExact) s += 40;
        else if (lang.indexOf(wantPrefix) === 0) s += 20;
        if (/natural|neural|online/i.test(name)) s += 10;
        if (v.localService) s += 3; // works offline, no network stutter
        return s;
      }
      voices.sort(function (a, b) { return score(b) - score(a); });
      if (score(voices[0]) > 0) chosenVoice = voices[0];
    }
    if ("speechSynthesis" in window) {
      pickVoice();
      window.speechSynthesis.onvoiceschanged = pickVoice;
    }

    /* Wrap every word of a block in a span, preserving inner markup.
       Returns the spans in reading order (matches textContent order). */
    function wrapWords(el) {
      var spans = [], offset = 0;
      function walk(node) {
        if (node.nodeType === 3) {
          var text = node.nodeValue;
          var frag = document.createDocumentFragment();
          var re = /\S+/g, m, last = 0;
          while ((m = re.exec(text)) !== null) {
            if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
            var sp = document.createElement("span");
            sp.className = "ra-word";
            sp.textContent = m[0];
            sp.dataset.raOffset = offset + m.index;
            spans.push(sp);
            frag.appendChild(sp);
            last = m.index + m[0].length;
          }
          if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
          offset += text.length;
          node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          Array.prototype.slice.call(node.childNodes).forEach(walk);
        }
      }
      Array.prototype.slice.call(el.childNodes).forEach(walk);
      return spans;
    }

    var reading = false, queue = [], queueIndex = 0;
    var activeEl = null, activeHTML = "", activeSpans = [];

    function restoreActive() {
      if (activeEl) { activeEl.innerHTML = activeHTML; activeEl = null; activeSpans = []; }
    }
    function stopReading() {
      reading = false;
      window.speechSynthesis && window.speechSynthesis.cancel();
      restoreActive();
      readBtn.setAttribute("aria-pressed", "false");
      readBtn.textContent = IS_FR ? "🔊 Lecture à voix haute" : "🔊 Read aloud";
    }
    function buildQueue() {
      var nodes = document.querySelectorAll("main h1, main h2, main h3, main p, main .choices button, main .mailrow");
      return Array.prototype.filter.call(nodes, function (n) {
        return n.textContent.trim() && !n.closest("[hidden]") && n.offsetParent !== null;
      });
    }
    function speakBlock(i) {
      if (!reading || i >= queue.length) { stopReading(); return; }
      queueIndex = i;
      restoreActive();
      activeEl = queue[i];
      activeHTML = activeEl.innerHTML;
      var text = activeEl.textContent;
      activeSpans = wrapWords(activeEl);

      /* Keep the block being read in view — smooth and block-level (never per
         word), so it works hands-free or on a big screen for a group. Skip the
         very first block so we do not yank the page away from the top. */
      try { if (i > 0) activeEl.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {}

      var u = new SpeechSynthesisUtterance(text);
      u.lang = IS_FR ? "fr-CA" : "en-CA";
      if (chosenVoice) u.voice = chosenVoice;
      u.rate = RATES[rateKey];
      u.pitch = 0.85; // slightly lower pitch — clearer for age-related hearing loss
      u.onboundary = function (ev) {
        if (ev.name && ev.name !== "word") return;
        var current = null;
        for (var k = 0; k < activeSpans.length; k++) {
          if (Number(activeSpans[k].dataset.raOffset) <= ev.charIndex) current = activeSpans[k];
          else break;
        }
        activeSpans.forEach(function (sp) { sp.classList.remove("current"); });
        if (current) current.classList.add("current");
      };
      u.onend = function () {
        if (reading) speakBlock(i + 1);
      };
      window.speechSynthesis.speak(u);
    }
    function startReading(fromIndex) {
      reading = true;
      readBtn.setAttribute("aria-pressed", "true");
      readBtn.textContent = IS_FR ? "⏹ Arrêter la lecture" : "⏹ Stop reading";
      queue = buildQueue();
      window.speechSynthesis.cancel();
      speakBlock(Math.min(fromIndex || 0, Math.max(queue.length - 1, 0)));
    }
    readBtn.addEventListener("click", function () {
      if (!("speechSynthesis" in window)) {
        readBtn.textContent = IS_FR
          ? "La lecture à voix haute n’est pas offerte dans ce navigateur"
          : "Read aloud is not available in this browser";
        return;
      }
      if (reading) { stopReading(); return; }
      startReading(0);
    });
  }

  /* ---------- External-link framing ----------------------------------------
     Every off-site link opens in a new tab and says so, in words, so nobody
     is silently taken away from the site mid-lesson. Runs on every page so
     generated module content is covered without hand-editing 29 files. */
  var extLinks = document.querySelectorAll('a[href^="http"]');
  for (var li = 0; li < extLinks.length; li++) {
    var extA = extLinks[li];
    if (extA.hostname === window.location.hostname) continue;
    extA.setAttribute("target", "_blank");
    var relParts = (extA.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
    if (relParts.indexOf("noopener") === -1) relParts.push("noopener");
    if (relParts.indexOf("noreferrer") === -1) relParts.push("noreferrer");
    extA.setAttribute("rel", relParts.join(" "));
    if (!extA.querySelector(".ext-note")) {
      var extNote = document.createElement("span");
      extNote.className = "ext-note";
      extNote.textContent = IS_FR ? " (s’ouvre dans un nouvel onglet)" : " (opens in a new tab)";
      extA.appendChild(extNote);
    }
  }
})();
