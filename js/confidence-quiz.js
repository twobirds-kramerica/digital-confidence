/*
 * DCC before/after confidence check - BETA COHORT ONLY
 * (S-DCC-BETA-CONFIDENCE-001, 2026-07-27)
 * ---------------------------------------------------------------------------
 * Ports the 5-point confidence instrument that has only ever existed under
 * /classic/ (classic/js/measurement.js) onto the live v2 module pages, rebuilt
 * on v2's Warm Hearth design tokens.
 *
 * WHAT IS PORTED, AND WHAT IS NOT
 *   Ported:     the instrument itself. One self-rated confidence question about
 *               the module's topic, on a 1 to 5 scale, asked once before the
 *               lesson and once after, with the delta shown back to the reader.
 *   Not ported: the classic five-question knowledge quiz that sat alongside it.
 *               v2 modules have their own inline click-quiz already, and a
 *               pre-lesson knowledge quiz would need 39 new question banks
 *               authored. The funder-grade statistic Aaron asked for is the
 *               confidence delta, and that is what this captures.
 *   Adapted:    classic used an <input type="range"> slider. This uses five
 *               labelled radio buttons at full tap-target size. A drag-slider
 *               is a known usability problem for the 65+ audience and conflicts
 *               with PRODUCT.md's large-target, one-thing-per-screen principles.
 *               The instrument (1 to 5 self-rating, pre and post) is unchanged.
 *
 * COHORT GATING - the important part
 *   This entire feature renders ONLY for the beta cohort, decided by the SAME
 *   signal S-DCC-BETA-DEMO-001 already established: window.DCCBeta.isBeta(),
 *   set by the ?beta=1 entry link and remembered in localStorage. A second,
 *   separate beta signal was considered and rejected: two signals can disagree,
 *   and a disagreement here is exactly the "is this row beta or not" ambiguity
 *   the whole design is meant to make impossible. One cohort definition, already
 *   reviewed under ADR-0027.
 *
 *   A general anonymous visitor sees nothing at all - no card, no request, no
 *   localStorage write. There is therefore no non-beta data path to mis-tag.
 *
 *   Client-side gating is convenience, not the guarantee. The guarantee is on
 *   the server: readings go to the dcc-beta-measurement Worker, which is bound
 *   to its own D1 database, asserts cohort='beta' itself, and writes a table
 *   whose CHECK constraint rejects any other value. See
 *   workers/dcc-beta-measurement/schema.sql.
 *
 * PII: no name, no raw email. If the tester gave an email at beta sign-up, the
 * SHA-256 hash their own browser computed (js/beta.js) is attached so before and
 * after can be paired across devices. If they skipped it, an opaque per-device
 * client id is used instead. Same discipline as the feedback widget, ADR-0027.
 *
 * Canadian English. No em-dashes. Load AFTER js/beta.js.
 */
(function () {
  "use strict";

  var ENDPOINT = "https://dcc-beta-measurement.twobirdsinnovation.workers.dev/confidence";
  var STORE_PREFIX = "dccv2-conf-";
  var CID_KEY = "dccv2-cid";

  if (window.__dccConfidenceLoaded) { return; }
  window.__dccConfidenceLoaded = true;

  var IS_FR = (document.documentElement.getAttribute("lang") || "en").toLowerCase().indexOf("fr") === 0;

  var T = IS_FR ? {
    badge: "Groupe d'essai",
    beforeTitle: "Avant de commencer",
    beforeQ: "Quel est votre niveau d'aisance avec ce sujet en ce moment?",
    afterTitle: "Maintenant que vous avez termine",
    afterQ: "Quel est votre niveau d'aisance avec ce sujet maintenant?",
    why: "Une seule question. Il n'y a pas de bonne reponse. Cela nous aide a mesurer si les lecons aident vraiment.",
    lo: "Pas du tout a l'aise",
    hi: "Tres a l'aise",
    save: "Enregistrer ma reponse",
    skip: "Passer cette question",
    pick: "Veuillez choisir un chiffre de 1 a 5.",
    savedBefore: "Merci. Votre reponse est enregistree. Nous vous reposerons la question a la fin.",
    savedAfter: "Merci. Votre reponse est enregistree.",
    resultUp: "Votre aisance est passee de {a} sur 5 a {b} sur 5.",
    resultSame: "Votre aisance est restee a {a} sur 5.",
    resultDown: "Votre aisance est passee de {a} sur 5 a {b} sur 5.",
    resultSolo: "Votre reponse: {b} sur 5.",
    onlyAfter: "Vous n'aviez pas repondu avant la lecon, alors il n'y a rien a comparer. Ce n'est pas grave."
  } : {
    badge: "Beta group",
    beforeTitle: "Before you start",
    beforeQ: "How confident do you feel about this topic right now?",
    afterTitle: "Now that you have finished",
    afterQ: "How confident do you feel about this topic now?",
    why: "One question. There is no right answer. It helps us measure whether the lessons actually help.",
    lo: "Not at all confident",
    hi: "Very confident",
    save: "Save my answer",
    skip: "Skip this question",
    pick: "Please choose a number from 1 to 5.",
    savedBefore: "Thank you. Your answer is saved. We will ask again at the end.",
    savedAfter: "Thank you. Your answer is saved.",
    resultUp: "Your confidence went from {a} out of 5 to {b} out of 5.",
    resultSame: "Your confidence stayed at {a} out of 5.",
    resultDown: "Your confidence went from {a} out of 5 to {b} out of 5.",
    resultSolo: "Your answer: {b} out of 5.",
    onlyAfter: "You did not answer before the lesson, so there is nothing to compare. That is perfectly fine."
  };

  /* ---- Storage ---------------------------------------------------------- */
  function moduleId() {
    var f = (window.location.pathname.split("/").pop() || "").replace(/\.html$/i, "");
    return f || "unknown-module";
  }

  function load(id) {
    try { return JSON.parse(window.localStorage.getItem(STORE_PREFIX + id) || "{}"); }
    catch (e) { return {}; }
  }

  function save(id, state) {
    try { window.localStorage.setItem(STORE_PREFIX + id, JSON.stringify(state)); }
    catch (e) { /* private mode: the reading is still sent to the Worker */ }
  }

  /* Opaque, random, per-device. Not derived from anything about the person.
     Its only job is pairing a before reading with its after reading. */
  function clientId() {
    try {
      var v = window.localStorage.getItem(CID_KEY);
      if (!v) {
        v = "c" + Math.random().toString(36).slice(2) + Date.now().toString(36);
        window.localStorage.setItem(CID_KEY, v);
      }
      return v;
    } catch (e) { return ""; }
  }

  /* ---- Send ------------------------------------------------------------- */
  function send(phase, value) {
    if (!window.fetch) { return; }
    var emailHashPromise = (window.DCCBeta && window.DCCBeta.getEmailHash)
      ? window.DCCBeta.getEmailHash()
      : Promise.resolve("");

    emailHashPromise.then(function (hash) {
      return window.fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module: moduleId(),
          phase: phase,
          confidence: value,
          lang: IS_FR ? "fr-CA" : "en-CA",
          emailHash: hash || null,
          cid: clientId()
        }),
        keepalive: true
      });
    }).catch(function () {
      /* Best effort. The reading is already kept in this browser, and the
         before/after result the reader sees is computed locally, so a network
         failure never breaks their experience. */
    });
  }

  /* ---- Styles (injected once, all v2 tokens) ---------------------------- */
  function injectStyles() {
    if (document.getElementById("dcc-conf-styles")) { return; }
    var s = document.createElement("style");
    s.id = "dcc-conf-styles";
    s.textContent = [
      ".dcc-conf{background:var(--color-surface-primary);border:1px solid var(--color-border);",
      "border-radius:var(--radius-lg);padding:var(--space-6);margin:var(--space-8) 0;}",
      ".dcc-conf-badge{display:inline-block;background:var(--color-accent-light);color:var(--color-accent-deep);",
      "font-family:var(--font-heading);font-size:var(--font-size-sm);font-weight:var(--font-weight-bold);",
      "border-radius:var(--radius-sm);padding:var(--space-1) var(--space-3);margin-bottom:var(--space-3);}",
      ".dcc-conf h2{margin:0 0 var(--space-2);color:var(--color-primary);font-size:var(--font-size-h3);}",
      ".dcc-conf .dcc-conf-q{margin:0 0 var(--space-2);font-weight:var(--font-weight-semibold);}",
      ".dcc-conf .dcc-conf-why{margin:0 0 var(--space-5);color:var(--color-text-light);",
      "font-size:var(--font-size-sm);max-width:60ch;}",
      ".dcc-conf-scale{display:flex;gap:var(--space-2);flex-wrap:wrap;margin:0 0 var(--space-3);padding:0;border:0;}",
      ".dcc-conf-scale legend{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}",
      ".dcc-conf-opt{flex:1 1 96px;}",
      ".dcc-conf-opt input{position:absolute;width:1px;height:1px;opacity:0;}",
      ".dcc-conf-opt label{display:flex;align-items:center;justify-content:center;min-height:var(--tap-target-min,48px);",
      "min-width:48px;padding:var(--space-3);background:var(--color-surface);border:2px solid var(--color-border-strong);",
      "border-radius:var(--radius-md);font-family:var(--font-heading);font-size:var(--font-size-h4);",
      "font-weight:var(--font-weight-bold);color:var(--color-text);cursor:pointer;}",
      ".dcc-conf-opt label:hover{border-color:var(--color-primary);}",
      ".dcc-conf-opt input:checked + label{background:var(--color-primary);color:var(--color-primary-contrast);",
      "border-color:var(--color-primary);}",
      ".dcc-conf-opt input:focus-visible + label{outline:3px solid var(--color-accent);outline-offset:2px;}",
      ".dcc-conf-ends{display:flex;justify-content:space-between;gap:var(--space-4);",
      "color:var(--color-text-light);font-size:var(--font-size-sm);margin:0 0 var(--space-5);}",
      ".dcc-conf-actions{display:flex;gap:var(--space-3);flex-wrap:wrap;align-items:center;}",
      ".dcc-conf-skip{background:none;border:0;color:var(--color-text-link);text-decoration:underline;",
      "cursor:pointer;font:inherit;min-height:var(--tap-target-min,48px);padding:0 var(--space-2);}",
      ".dcc-conf-msg{margin:var(--space-4) 0 0;font-weight:var(--font-weight-semibold);color:var(--color-success-deep);}",
      ".dcc-conf-warn{margin:var(--space-3) 0 0;font-weight:var(--font-weight-semibold);color:var(--color-error);}",
      ".dcc-conf-result{font-size:var(--font-size-lead);line-height:var(--line-height-lead);margin:0;}",
      "@media (max-width:520px){.dcc-conf-opt{flex:1 1 18%;}}"
    ].join("");
    document.head.appendChild(s);
  }

  function elt(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  /* ---- Card ------------------------------------------------------------- */
  function buildCard(phase, onDone) {
    var box = elt("section", "dcc-conf");
    box.setAttribute("aria-label", phase === "before" ? T.beforeTitle : T.afterTitle);

    box.appendChild(elt("span", "dcc-conf-badge", T.badge));
    box.appendChild(elt("h2", null, phase === "before" ? T.beforeTitle : T.afterTitle));
    box.appendChild(elt("p", "dcc-conf-q", phase === "before" ? T.beforeQ : T.afterQ));
    box.appendChild(elt("p", "dcc-conf-why", T.why));

    var fs = elt("fieldset", "dcc-conf-scale");
    fs.appendChild(elt("legend", null, phase === "before" ? T.beforeQ : T.afterQ));
    var name = "dcc-conf-" + phase;
    for (var i = 1; i <= 5; i++) {
      var wrap = elt("div", "dcc-conf-opt");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = name;
      input.id = name + "-" + i;
      input.value = String(i);
      var label = elt("label", null, String(i));
      label.setAttribute("for", input.id);
      label.setAttribute("aria-label", i + " " + (i === 1 ? T.lo : (i === 5 ? T.hi : "")));
      wrap.appendChild(input);
      wrap.appendChild(label);
      fs.appendChild(wrap);
    }
    box.appendChild(fs);

    var ends = elt("div", "dcc-conf-ends");
    ends.appendChild(elt("span", null, "1 " + T.lo));
    ends.appendChild(elt("span", null, "5 " + T.hi));
    box.appendChild(ends);

    var actions = elt("div", "dcc-conf-actions");
    var saveBtn = elt("button", "btn btn-primary", T.save);
    saveBtn.type = "button";
    var skipBtn = elt("button", "dcc-conf-skip", T.skip);
    skipBtn.type = "button";
    actions.appendChild(saveBtn);
    actions.appendChild(skipBtn);
    box.appendChild(actions);

    var warn = elt("p", "dcc-conf-warn");
    warn.setAttribute("role", "alert");
    box.appendChild(warn);

    saveBtn.addEventListener("click", function () {
      var picked = box.querySelector('input[name="' + name + '"]:checked');
      if (!picked) { warn.textContent = T.pick; return; }
      warn.textContent = "";
      onDone(parseInt(picked.value, 10), box);
    });

    skipBtn.addEventListener("click", function () { onDone(null, box); });

    return box;
  }

  function fill(tpl, a, b) {
    return tpl.replace("{a}", a).replace("{b}", b);
  }

  function resultText(before, after) {
    if (typeof before !== "number") { return T.onlyAfter + " " + fill(T.resultSolo, before, after); }
    if (after > before) { return fill(T.resultUp, before, after); }
    if (after < before) { return fill(T.resultDown, before, after); }
    return fill(T.resultSame, before, after);
  }

  /* ---- Boot ------------------------------------------------------------- */
  function boot() {
    /* Beta cohort only. Anonymous visitors: no render, no storage, no request. */
    if (!window.DCCBeta || !window.DCCBeta.isBeta || !window.DCCBeta.isBeta()) { return; }

    var container = document.querySelector("#main .container");
    if (!container) { return; }

    var id = moduleId();
    var st = load(id);
    injectStyles();

    /* BEFORE: high in the page, after the reassurance line so the first thing a
       nervous reader meets is still the reassurance, not a question. */
    if (!st.beforeDone) {
      var anchorTop = container.querySelector("p.reassurance") || container.querySelector("h1");
      if (anchorTop) {
        var beforeCard = buildCard("before", function (value, box) {
          var s2 = load(id);
          s2.beforeDone = true;
          if (value === null) { s2.beforeSkipped = true; }
          else { s2.before = value; send("before", value); }
          save(id, s2);
          box.innerHTML = "";
          if (value !== null) { box.appendChild(elt("p", "dcc-conf-msg", T.savedBefore)); }
          else { box.remove(); }
        });
        anchorTop.parentNode.insertBefore(beforeCard, anchorTop.nextSibling);
      }
    }

    /* AFTER: at the end of the lesson, before "Where to next". */
    var anchorEnd = container.querySelector("nav.related-modules")
      || container.querySelector("section.send-lesson");
    if (!anchorEnd) { return; }

    if (st.afterDone) {
      if (typeof st.after === "number") {
        var doneBox = elt("section", "dcc-conf");
        doneBox.setAttribute("aria-label", T.afterTitle);
        doneBox.appendChild(elt("span", "dcc-conf-badge", T.badge));
        doneBox.appendChild(elt("h2", null, T.afterTitle));
        doneBox.appendChild(elt("p", "dcc-conf-result", resultText(st.before, st.after)));
        anchorEnd.parentNode.insertBefore(doneBox, anchorEnd);
      }
      return;
    }

    var afterCard = buildCard("after", function (value, box) {
      var s3 = load(id);
      s3.afterDone = true;
      if (value === null) { s3.afterSkipped = true; save(id, s3); box.remove(); return; }
      s3.after = value;
      save(id, s3);
      send("after", value);
      box.innerHTML = "";
      box.appendChild(elt("span", "dcc-conf-badge", T.badge));
      box.appendChild(elt("h2", null, T.afterTitle));
      box.appendChild(elt("p", "dcc-conf-result", resultText(s3.before, value)));
      box.appendChild(elt("p", "dcc-conf-msg", T.savedAfter));
    });
    anchorEnd.parentNode.insertBefore(afterCard, anchorEnd);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
