/*
 * DCC Kids dyslexia-friendly / easy-reader font toggle
 * (S-DCC-UX-BATCH-2026-07-28-LATE item 4, 2026-08-23)
 * ---------------------------------------------------------------------------
 * Lexend, self-hosted at fonts/lexend/lexend-variable.woff2 (SIL OFL 1.1,
 * licence committed alongside at fonts/lexend/OFL.txt -- verified at source,
 * reserved name "RevReading Lexend"). One variable file, wght 100-900.
 *
 * Why Lexend and not Andika: per the ranked recommendation in
 * hal-stack/research/dcc-font-accessibility-research-2026-07-28.md (#1, high
 * confidence) -- it is the only candidate covering BOTH of Aaron's asks with
 * one font: dyslexia-friendly (designed against reading-proficiency research)
 * AND early-reader letterforms, because font-feature-settings 'ss01' swaps in
 * the single-storey a and g that early readers are taught to write. French
 * coverage (accents, oe ligature) and a.ss01/g.ss01 re-verified on this exact
 * woff2 binary with fontTools before shipping, per the "verify the glyph set
 * directly" constraint.
 *
 * Same opt-in pattern as the Adult OpenDyslexic toggle (css/tokens.css +
 * js/dcc.js): a labelled button, a class on <html>, localStorage persistence.
 * Own class + key (NOT the Adult "dyslexic-font" class): kids pages load
 * css/bundle.css, whose html.dyslexic-font rule would force OpenDyslexic --
 * the Adult decision. Kids' decided font is Lexend.
 */
(function () {
  "use strict";

  var KEY = "dcckids-lexend-font";
  var doc = document.documentElement;

  /* Resolve the font URL relative to THIS SCRIPT (kids root), not the page:
     index.html sits at kids/, activity pages at kids/<age>/. */
  var base = "";
  var cs = document.currentScript;
  if (cs && cs.src) { base = cs.src.slice(0, cs.src.lastIndexOf("/") + 1); }

  var style = document.createElement("style");
  style.id = "dcc-kids-font-styles";
  style.textContent = [
    "@font-face{font-family:'Lexend';src:url('", base, "fonts/lexend/lexend-variable.woff2') format('woff2');",
    "font-weight:100 900;font-style:normal;font-display:swap;}",
    /* ss01 = single-storey a/g, the early-reader letterforms. Applied with the
       font, one class does both jobs. */
    "html.kids-lexend body{font-family:'Lexend','Source Sans 3',sans-serif !important;",
    "font-feature-settings:'ss01' 1;}",
    ".kids-font-toggle-row{display:flex;justify-content:flex-end;max-width:960px;margin:0 auto;padding:0.25rem 1rem 0;}",
    ".kids-font-toggle{font:inherit;font-size:0.9rem;font-weight:600;color:var(--kids-primary,#1E5FBF);",
    "background:var(--kids-surface,#FFFFFF);border:1px solid var(--kids-border,#D3E2F5);",
    "border-radius:999px;padding:0.35rem 0.9rem;min-height:44px;cursor:pointer;}",
    ".kids-font-toggle[aria-pressed='true']{background:var(--kids-primary-light,#E7F0FC);",
    "border-color:var(--kids-primary,#1E5FBF);}",
    ".kids-font-toggle:focus-visible{outline:3px solid var(--kids-primary,#1E5FBF);outline-offset:2px;}"
  ].join("");
  document.head.appendChild(style);

  /* Apply the stored preference immediately, before first paint if possible. */
  var on = false;
  try { on = localStorage.getItem(KEY) === "1"; } catch (e) {}
  if (on) { doc.classList.add("kids-lexend"); }

  function mountButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "kids-font-toggle";
    /* Same label as the Adult toggle (one term per concept, product-wide) --
       and "dyslexia-friendly" is the phrase caregivers actually look for. */
    btn.textContent = "👓 Dyslexia-friendly font";
    btn.setAttribute("aria-pressed", doc.classList.contains("kids-lexend") ? "true" : "false");
    btn.addEventListener("click", function () {
      var next = !doc.classList.contains("kids-lexend");
      doc.classList.toggle("kids-lexend", next);
      btn.setAttribute("aria-pressed", next ? "true" : "false");
      try { localStorage.setItem(KEY, next ? "1" : "0"); } catch (e) {}
    });

    var row = document.createElement("div");
    row.className = "kids-font-toggle-row";
    row.appendChild(btn);

    var nav = document.querySelector("nav.kids-nav");
    if (nav && nav.parentNode) { nav.parentNode.insertBefore(row, nav.nextSibling); }
    else {
      var main = document.getElementById("main");
      if (main) { main.insertBefore(row, main.firstChild); }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountButton);
  } else {
    mountButton();
  }
})();
