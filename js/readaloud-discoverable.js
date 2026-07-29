/*
 * DCC discoverable read-aloud control (S-DCC-READALOUD-DISCRETE-UX-001, 2026-07-29)
 * ---------------------------------------------------------------------------
 * Relocates the existing read-aloud button + speed control out of the
 * "Display settings" gear panel (where it was buried alongside unrelated
 * text-size controls) to a small, always-visible, collapsed-by-default
 * control at the top of the page content.
 *
 * Per hal-stack/research/dcc-readaloud-discoverability-research-2026-07-29.md
 * Option A (recommended, ~85% confidence): a per-page in-flow "Listen to
 * this page" button directly above the page content, word-labelled (not an
 * icon-only affordance), collapsed to one button; clicking it starts
 * reading AND reveals the existing Slower/Normal/Faster speed control in
 * place. Prior art: ReadSpeaker's own placement guidance, Medium/Washington
 * Post/LA Times' converged "Listen" pattern, and DEEP/Dementia Voices (a
 * cognitive-impairment-audience site using the same plain-word pattern).
 * Deliberately in-flow, never floating -- Option C (a floating pill) was
 * explicitly rejected in that research for conflicting with PRODUCT.md's
 * anti-reference against floating overlays and failing WCAG 1.4.10 reflow
 * at the 125-200% zoom this audience actually uses.
 *
 * This script MOVES the existing DOM nodes (readBtn + rate-group) rather
 * than cloning them, so js/dcc.js's already-attached click handlers keep
 * working untouched -- the read-aloud ENGINE (voice choice, rate control,
 * word-by-word highlighting) is not rebuilt or modified, only its entry
 * point's location and expand/collapse behaviour. Depends on dcc.js having
 * already run (its script tag must load before this one) so the click
 * handler is bound before this script relocates the node.
 *
 * Text-size controls (A-/A/A+) are untouched and stay in Display settings --
 * only the read-aloud group moves.
 *
 * Canadian English. No em-dashes.
 */
(function () {
  "use strict";

  if (window.__dccReadAloudDiscoverableLoaded) { return; }
  window.__dccReadAloudDiscoverableLoaded = true;

  var IS_FR = (document.documentElement.getAttribute("lang") || "en").toLowerCase().indexOf("fr") === 0;

  function injectStyles() {
    if (document.getElementById("dcc-listen-styles")) { return; }
    var s = document.createElement("style");
    s.id = "dcc-listen-styles";
    s.textContent = [
      ".dcc-listen{margin:0 0 var(--space-6);}",
      ".dcc-listen-panel{margin-top:var(--space-3);}",
      ".dcc-listen-panel[hidden]{display:none;}"
    ].join("");
    document.head.appendChild(s);
  }

  function boot() {
    var group = document.querySelector(".read-group");
    if (!group) { return; } // page has no read-aloud wired (e.g. no dcc.js): nothing to relocate

    var readBtn = group.querySelector("[data-read-aloud]");
    if (!readBtn) { return; }

    var main = document.querySelector("#main .container") || document.querySelector("#main");
    if (!main) { return; }

    injectStyles();

    var rateGroup = group.querySelector(".rate-group");

    var wrap = document.createElement("section");
    wrap.className = "dcc-listen";
    wrap.setAttribute("aria-label", IS_FR ? "Lecture à voix haute" : "Read aloud");

    wrap.appendChild(readBtn); // moved, not cloned: dcc.js's click handler stays attached

    if (rateGroup) {
      var panel = document.createElement("div");
      panel.className = "dcc-listen-panel";
      panel.hidden = true;
      panel.appendChild(rateGroup); // moved: dcc.js's rate-button handlers stay attached
      wrap.appendChild(panel);

      // dcc.js's own click handler (bound before this script ran, same script-
      // load order every page uses) already flips aria-pressed on this same
      // click before this listener runs, since it was attached first.
      readBtn.addEventListener("click", function () {
        panel.hidden = readBtn.getAttribute("aria-pressed") !== "true";
      });
    }

    group.remove(); // the now-empty original wrapper left behind in Display settings
    main.insertBefore(wrap, main.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
