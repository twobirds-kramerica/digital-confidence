/*
 * DCC collapsible beta phase-banner (S-DCC-BETA-BANNER-RESEARCH-001, 2026-07-29)
 * ---------------------------------------------------------------------------
 * Rolls the beta-tester entry points that previously only lived on the
 * landing page (rewatch welcome video, tell us who you are) up to the top of
 * every module page too, as an in-flow banner -- not a floating overlay, per
 * PRODUCT.md anti-references and design principle 4 (nothing hovers over
 * readable content). Combines two options from
 * hal-stack/research/dcc-feedback-surface-research-2026-07-28.md:
 *
 *   Option B (phase banner): a slim, always-visible strip carrying a BETA
 *   label and a feedback link, in flow at the top of the page.
 *   Option A (beta tag): the same visual tag vocabulary as the end-of-lesson
 *   .dcc-fb-beta-tag pill (see feedback-inflow.js), reused here as the label.
 *
 * "Collapsible" per Aaron's sprint wording: the slim strip (label + feedback
 * link) is always shown -- that is the part research says must never be
 * hidden. A "More" toggle expands it in place to a full panel carrying the
 * rewatch-video and tell-us-who-you-are affordances, so those are not lost
 * on module pages, without permanently spending page-top real estate on them.
 *
 * Does nothing for a general anonymous visitor (DCCBeta.isBeta() false).
 * Depends on beta.js loading first (for window.DCCBeta) and
 * feedback-widget.js loading (for window.FieldFeedback) -- same load order
 * already used by feedback-inflow.js.
 *
 * Canadian English. No em-dashes.
 */
(function () {
  "use strict";

  if (window.__dccPhaseBannerLoaded) { return; }
  window.__dccPhaseBannerLoaded = true;

  var IS_FR = (document.documentElement.getAttribute("lang") || "en").toLowerCase().indexOf("fr") === 0;

  var T = IS_FR ? {
    tag: "BÊTA",
    lead: "Ceci est une version d'essai.",
    body: "Dites-nous ce qui porte à confusion et nous le corrigerons.",
    feedback: "Donner mon avis",
    more: "Plus d'options",
    less: "Moins d'options",
    rewatch: "Voir la vidéo de bienvenue",
    tellUs: "Dites-nous qui vous êtes",
    label: "Bandeau bêta"
  } : {
    tag: "BETA",
    lead: "This is a test version.",
    body: "Tell us what is confusing and we will fix it.",
    feedback: "Give feedback",
    more: "More options",
    less: "Fewer options",
    rewatch: "Watch welcome video",
    tellUs: "Tell us who you are",
    label: "Beta banner"
  };

  function injectStyles() {
    if (document.getElementById("dcc-phase-banner-styles")) { return; }
    var s = document.createElement("style");
    s.id = "dcc-phase-banner-styles";
    s.textContent = [
      ".dcc-phase-banner{border:1px solid var(--color-border);border-radius:var(--radius-md);",
      "background:var(--color-surface-alt);padding:var(--space-2) var(--space-4);margin:0 0 var(--space-6);}",
      ".dcc-phase-banner__row{display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap;}",
      ".dcc-phase-banner__tag{display:inline-block;background:var(--color-btn-primary-bg);",
      "color:var(--color-btn-primary-text);font-family:var(--font-heading);",
      "font-weight:var(--font-weight-semibold);font-size:var(--font-size-caption,.8rem);",
      "letter-spacing:.04em;padding:var(--space-1) var(--space-3);border-radius:var(--radius-sm);flex:0 0 auto;}",
      ".dcc-phase-banner__text{flex:1 1 auto;min-width:0;font-size:var(--font-size-sm);}",
      ".dcc-phase-banner__link,.dcc-phase-banner__toggle{background:none;border:0;font:inherit;",
      "font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);color:var(--color-primary);",
      "text-decoration:underline;cursor:pointer;padding:var(--space-1) 0;min-height:var(--tap-target-min);",
      "flex:0 0 auto;}",
      ".dcc-phase-banner__panel{margin-top:var(--space-3);padding-top:var(--space-3);",
      "border-top:1px solid var(--color-border);display:flex;gap:var(--space-4);flex-wrap:wrap;}",
      ".dcc-phase-banner__panel[hidden]{display:none;}",
      ".dcc-phase-banner__panel button{background:none;border:0;font:inherit;font-size:var(--font-size-sm);",
      "font-weight:var(--font-weight-semibold);color:var(--color-primary);text-decoration:underline;",
      "cursor:pointer;padding:var(--space-1) 0;min-height:var(--tap-target-min);}"
    ].join("");
    document.head.appendChild(s);
  }

  function openFeedback() {
    if (window.FieldFeedback && window.FieldFeedback.open) { window.FieldFeedback.open(); }
  }

  function build() {
    var box = document.createElement("section");
    box.className = "dcc-phase-banner";
    box.setAttribute("aria-label", T.label);

    var row = document.createElement("div");
    row.className = "dcc-phase-banner__row";

    var tag = document.createElement("span");
    tag.className = "dcc-phase-banner__tag";
    tag.textContent = T.tag;
    row.appendChild(tag);

    var text = document.createElement("span");
    text.className = "dcc-phase-banner__text";
    text.textContent = T.lead + " " + T.body;
    row.appendChild(text);

    var fb = document.createElement("button");
    fb.type = "button";
    fb.className = "dcc-phase-banner__link";
    fb.textContent = T.feedback;
    fb.addEventListener("click", openFeedback);
    row.appendChild(fb);

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "dcc-phase-banner__toggle";
    toggle.textContent = T.more;
    toggle.setAttribute("aria-expanded", "false");
    row.appendChild(toggle);

    box.appendChild(row);

    var panel = document.createElement("div");
    panel.className = "dcc-phase-banner__panel";
    panel.hidden = true;

    var rewatch = document.createElement("button");
    rewatch.type = "button";
    rewatch.textContent = T.rewatch;
    rewatch.addEventListener("click", function () {
      if (window.DCCBeta && window.DCCBeta.openWizardStep) { window.DCCBeta.openWizardStep(2, rewatch); }
    });
    panel.appendChild(rewatch);

    if (window.DCCBeta && !window.DCCBeta.getName()) {
      var tellUs = document.createElement("button");
      tellUs.type = "button";
      tellUs.textContent = T.tellUs;
      tellUs.addEventListener("click", function () {
        if (window.DCCBeta && window.DCCBeta.openWizardStep) { window.DCCBeta.openWizardStep(3, tellUs); }
      });
      panel.appendChild(tellUs);
    }

    box.appendChild(panel);

    toggle.addEventListener("click", function () {
      var open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? T.less : T.more;
    });

    return box;
  }

  function boot() {
    if (!window.DCCBeta || !window.DCCBeta.isBeta()) { return; }
    var main = document.querySelector("#main .container") || document.querySelector("#main");
    if (!main) { return; }
    injectStyles();
    main.insertBefore(build(), main.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
