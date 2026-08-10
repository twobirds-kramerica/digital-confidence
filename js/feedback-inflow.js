/*
 * DCC in-flow feedback surface (S-DCC-BETA-FEEDBACK-SURFACE-001, 2026-07-27)
 * ---------------------------------------------------------------------------
 * ROLLOUT, NOT A REBUILD. The feedback tool itself is the already-shipped,
 * already-reviewed feedback-widget.js (hashed-email beta tagging, PII discipline
 * per ADR-0027 and Anil's S-DCC-BETA-DEMO-001 review, field-feedback Worker and
 * KV backend). Nothing about capture, tagging, or transport changes here.
 *
 * What changes is WHERE it can be reached. Before this, the widget loaded on 2
 * of 41 pages, so a tester who got stuck inside a module had no way to say so.
 * It now loads on every Adult module page.
 *
 * WHY NOT THE FLOATING BUTTON
 *   PRODUCT.md anti-references name "floating overlays that cover content
 *   (? Help buttons, feedback bubbles)" as a current anti-pattern on the live
 *   site, and design principle 4 says nothing hovers over readable content. Per
 *   DESIGN GATE, anti-references outrank the plan. So this script sets
 *   window.FFW_NO_FAB before the widget boots, and provides two in-flow entry
 *   points instead:
 *
 *     1. A full-width "Tell us what you think" block at the end of the lesson,
 *        where someone has just finished something and has an opinion.
 *     2. A plain labelled "Give feedback" link in the site footer, so the offer
 *        is reachable from anywhere on the page without anything hovering.
 *
 * This must load BEFORE feedback-widget.js so the no-FAB flag is set at parse
 * time rather than racing the widget's own DOMContentLoaded boot.
 *
 * Canadian English. No em-dashes.
 */
(function () {
  "use strict";

  /* Read by feedback-widget.js at boot. Set synchronously, at parse time. */
  window.FFW_NO_FAB = true;

  if (window.__dccFeedbackInflowLoaded) { return; }
  window.__dccFeedbackInflowLoaded = true;

  var IS_FR = (document.documentElement.getAttribute("lang") || "en").toLowerCase().indexOf("fr") === 0;

  var T = IS_FR ? {
    title: "Dites-nous ce que vous en pensez",
    body: "Quelque chose vous a semble confus, ou n'a pas fonctionne? Dites-le nous. Cela prend une minute et cela nous aide beaucoup.",
    cta: "Donner mon avis sur cette lecon",
    ctaPage: "Donner mon avis sur cette page",
    footer: "Donner mon avis",
    betaTag: "Testeurs bêta",
    betaSentence: "Vous faites partie de nos testeurs bêta, alors votre avis compte doublement."
  } : {
    title: "Tell us what you think",
    body: "Did anything here feel confusing, or not work the way you expected? Please tell us. It takes a minute and it helps us more than you might think.",
    cta: "Give feedback on this lesson",
    ctaPage: "Give feedback on this page",
    footer: "Give feedback",
    betaTag: "Beta testers",
    betaSentence: "You are one of our beta testers, so this matters twice as much."
  };

  function injectStyles() {
    if (document.getElementById("dcc-fb-inflow-styles")) { return; }
    var s = document.createElement("style");
    s.id = "dcc-fb-inflow-styles";
    s.textContent = [
      ".dcc-fb-block{position:relative;background:var(--color-accent-light);border:1px solid var(--color-border);",
      "border-radius:var(--radius-lg);padding:var(--space-6);margin:var(--space-8) 0;}",
      ".dcc-fb-block h2{margin:0 0 var(--space-2);color:var(--color-primary);font-size:var(--font-size-h3);}",
      ".dcc-fb-block p{margin:0 0 var(--space-5);max-width:60ch;}",
      /* Option A, hal-stack/research/dcc-feedback-surface-research-2026-07-28.md:
         a pill straddling the block's top border, beta testers only. */
      ".dcc-fb-beta-tag{position:absolute;top:calc(-1 * var(--space-3));left:var(--space-5);",
      "max-width:calc(100% - (var(--space-5) * 2));box-sizing:border-box;",
      "background:var(--color-btn-primary-bg);color:var(--color-btn-primary-text);",
      "font-family:var(--font-heading);font-weight:var(--font-weight-semibold);",
      "font-size:var(--font-size-caption,.8rem);letter-spacing:.02em;",
      "padding:var(--space-1) var(--space-3);border-radius:var(--radius-pill);white-space:nowrap;}"
    ].join("");
    document.head.appendChild(s);
  }

  function openWidget() {
    if (window.FieldFeedback && window.FieldFeedback.open) { window.FieldFeedback.open(); }
  }

  function buildBlock(isLesson) {
    var box = document.createElement("section");
    box.className = "dcc-fb-block";
    box.setAttribute("aria-labelledby", "dcc-fb-h");

    var isBeta = !!(window.DCCBeta && window.DCCBeta.isBeta());
    var h = document.createElement("h2");
    h.id = "dcc-fb-h";
    if (isBeta) {
      var tag = document.createElement("p");
      tag.className = "dcc-fb-beta-tag";
      tag.textContent = T.betaTag;
      tag.setAttribute("aria-hidden", "true"); // decorative label; the real sentence below is announced instead
      box.appendChild(tag);
    }
    h.textContent = T.title;
    box.appendChild(h);

    var p = document.createElement("p");
    p.textContent = T.body;
    box.appendChild(p);

    if (isBeta) {
      var betaP = document.createElement("p");
      betaP.textContent = T.betaSentence;
      box.appendChild(betaP);
    }

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-primary";
    btn.textContent = isLesson ? T.cta : T.ctaPage;
    btn.addEventListener("click", openWidget);
    box.appendChild(btn);

    return box;
  }

  function addFooterLink() {
    var list = document.querySelector(".site-footer .footer-links");
    if (!list || list.querySelector("[data-dcc-fb-footer]")) { return; }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#";
    a.textContent = T.footer;
    a.setAttribute("data-dcc-fb-footer", "");
    a.addEventListener("click", function (ev) { ev.preventDefault(); openWidget(); });
    li.appendChild(a);
    list.appendChild(li);
  }

  function boot() {
    injectStyles();

    /* End-of-lesson block: after "Where to next" if present, otherwise at the
       end of the lesson container. Never above the content it comments on.

       Take the LAST .container in #main, not the first. A lesson page has one
       .container so the two are the same; the landing page has several (the
       beta banner strip, the hero, each lesson group), and querySelector
       returned the FIRST one -- so this "end of lesson" block was appended
       into the topmost strip and rendered near the top of the homepage,
       directly under the beta banner, breaking the rule the comment above
       states. Third stacked beta surface in Aaron's 2026-08-05 screenshot.
       S-DCC-UX-BATCH-001. */
    var containers = document.querySelectorAll("#main .container");
    var container = containers.length ? containers[containers.length - 1] : document.querySelector("#main");
    if (container) {
      var rel = container.querySelector("nav.related-modules");
      var block = buildBlock(!!container.querySelector(".lesson-back"));
      if (rel && rel.parentNode) { rel.parentNode.insertBefore(block, rel.nextSibling); }
      else { container.appendChild(block); }
    }

    addFooterLink();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
