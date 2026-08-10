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
 * 2026-08-05 (S-DCC-UX-BATCH-001): the "More options" / "Fewer options"
 * toggle is GONE. It hid a panel whose only guaranteed member was the
 * rewatch-video link -- "Tell us who you are" is suppressed once the tester
 * has given a name, which every returning tester has, so in practice the
 * toggle expanded to reveal exactly one link. A disclosure control for one
 * item costs a click, an aria-expanded state, and roughly 70px of page-top
 * height to save one line. Every affordance now sits inline on the one row.
 * If this banner ever grows past three inline links, revisit -- but do not
 * reintroduce a toggle for two.
 *
 * This banner is also now the SINGLE beta surface on the landing page.
 * beta.js used to render its own returning-visitor bar ("Welcome back to the
 * beta site. Watch welcome video") directly underneath this one, duplicating
 * the rewatch link and asserting a return visit that had not happened. That
 * bar is suppressed wherever this banner runs (see beta.js renderBanner).
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
    rewatch: "Voir la vidéo de bienvenue",
    tellUs: "Dites-nous qui vous êtes",
    label: "Bandeau bêta",
    dismiss: "Masquer ce bandeau"
  } : {
    tag: "BETA",
    lead: "This is a test version.",
    body: "Tell us what is confusing and we will fix it.",
    feedback: "Give feedback",
    rewatch: "Watch welcome video",
    tellUs: "Tell us who you are",
    label: "Beta banner",
    dismiss: "Hide this banner"
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
      ".dcc-phase-banner__link{background:none;border:0;font:inherit;",
      "font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);color:var(--color-primary);",
      "text-decoration:underline;cursor:pointer;padding:var(--space-1) 0;min-height:var(--tap-target-min);",
      "flex:0 0 auto;}",
      /* Dismiss sits last in the row, visually separated from the links so it
         never reads as one more affordance to consider. Not a hard-coded
         glyph size: 20px matches the old .dcc-beta-bar-dismiss this replaces. */
      ".dcc-phase-banner__dismiss{background:none;border:0;color:var(--color-text-light);cursor:pointer;",
      "font-size:20px;line-height:1;padding:var(--space-1) var(--space-2);flex:0 0 auto;",
      "min-height:var(--tap-target-min);min-width:var(--tap-target-min);}",
      ".dcc-phase-banner__dismiss:hover,.dcc-phase-banner__dismiss:focus-visible{color:var(--color-text);}"
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

    // Inline, always visible. No disclosure toggle: see the header note.
    var rewatch = document.createElement("button");
    rewatch.type = "button";
    rewatch.className = "dcc-phase-banner__link";
    rewatch.textContent = T.rewatch;
    rewatch.addEventListener("click", function () {
      if (window.DCCBeta && window.DCCBeta.openWizardStep) { window.DCCBeta.openWizardStep(2, rewatch); }
    });
    row.appendChild(rewatch);

    if (window.DCCBeta && !window.DCCBeta.getName()) {
      var tellUs = document.createElement("button");
      tellUs.type = "button";
      tellUs.className = "dcc-phase-banner__link";
      tellUs.textContent = T.tellUs;
      tellUs.addEventListener("click", function () {
        if (window.DCCBeta && window.DCCBeta.openWizardStep) { window.DCCBeta.openWizardStep(3, tellUs); }
      });
      row.appendChild(tellUs);
    }

    // Carried over from the beta.js returning-visitor bar this banner
    // replaces: the beta notice is short-lived by design, and a tester who
    // has read it once should be able to put it away for the session.
    var dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.className = "dcc-phase-banner__dismiss";
    dismiss.setAttribute("aria-label", T.dismiss);
    dismiss.innerHTML = "<span aria-hidden=\"true\">&times;</span>";
    dismiss.addEventListener("click", function () { box.remove(); });
    row.appendChild(dismiss);

    box.appendChild(row);
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
