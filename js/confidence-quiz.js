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
    badge: "Bêta",
    beforeTitle: "Avant de commencer",
    beforeQ: "Quel est votre niveau d'aisance avec {topic} en ce moment?",
    afterTitle: "Maintenant que vous avez termine",
    afterQ: "Quel est votre niveau d'aisance avec {topic} maintenant?",
    why: "Une seule question, pas de bonne reponse. Votre reponse est envoyee de facon anonyme - juste un code aleatoire pour cet appareil - pour voir si les lecons aident. Vous pouvez passer.",
    lo: "Pas du tout a l'aise",
    hi: "Tres a l'aise",
    scaleWords: ["Pas du tout", "Un peu", "Assez", "Plutot", "Tres"],
    save: "Envoyer ma reponse",
    skip: "Passer cette question",
    pick: "Veuillez choisir un chiffre de 1 a 5.",
    savedBefore: "Merci. Votre reponse a ete envoyee, sans votre nom. Nous vous reposerons la question a la fin de la lecon.",
    savedAfter: "Merci. Votre reponse a ete envoyee, sans votre nom.",
    resultUp: "Votre aisance est passee de {a} sur 5 a {b} sur 5.",
    resultSame: "Votre aisance est restee a {a} sur 5.",
    resultDown: "Votre aisance est passee de {a} sur 5 a {b} sur 5.",
    resultSolo: "Votre reponse: {b} sur 5.",
    onlyAfter: "Vous n'aviez pas repondu avant la lecon, alors il n'y a rien a comparer. Ce n'est pas grave."
  } : {
    badge: "Beta",
    beforeTitle: "Before you start",
    beforeQ: "How confident do you feel about {topic} right now?",
    afterTitle: "Now that you have finished",
    afterQ: "How confident do you feel about {topic} now?",
    why: "One question, no right answer. Your answer is sent anonymously - just a random code for this device - so we can see whether the lessons help. You can skip it.",
    lo: "Not at all confident",
    hi: "Very confident",
    scaleWords: ["Not at all", "A little", "Fairly", "Quite", "Very"],
    save: "Send my answer",
    skip: "Skip this question",
    pick: "Please choose a number from 1 to 5.",
    savedBefore: "Thank you. Your answer has been sent, without your name. We will ask you again at the end of the lesson.",
    savedAfter: "Thank you. Your answer has been sent, without your name.",
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
      /* Aaron, 2026-08-02: "topic" was too vague on its own -- name the
         actual lesson topic inline and make that word/phrase visually
         unmistakable (not just present in prose). */
      ".dcc-conf-topic{font-weight:var(--font-weight-bold);font-size:1.15em;color:var(--color-primary);}",
      ".dcc-conf .dcc-conf-why{margin:0 0 var(--space-5);color:var(--color-text-light);",
      "font-size:var(--font-size-sm);max-width:60ch;}",
      ".dcc-conf-scale{display:grid;grid-template-columns:repeat(5,1fr);gap:var(--space-2);margin:0 0 var(--space-5);padding:0;border:0;}",
      ".dcc-conf-scale legend{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}",
      ".dcc-conf-opt{display:flex;flex-direction:column;align-items:center;gap:var(--space-1);}",
      ".dcc-conf-opt input{position:absolute;width:1px;height:1px;opacity:0;}",
      ".dcc-conf-opt label{display:flex;align-items:center;justify-content:center;min-height:var(--tap-target-min,48px);",
      "width:100%;padding:var(--space-3);background:var(--color-surface);border:2px solid var(--color-border-strong);",
      "border-radius:var(--radius-md);font-family:var(--font-heading);font-size:var(--font-size-h4);",
      "font-weight:var(--font-weight-bold);color:var(--color-text);cursor:pointer;}",
      ".dcc-conf-opt label:hover{border-color:var(--color-primary);}",
      ".dcc-conf-opt input:checked + label{background:var(--color-primary);color:var(--color-primary-contrast);",
      "border-color:var(--color-primary);}",
      ".dcc-conf-opt input:focus-visible + label{outline:var(--focus-ring-width,3px) solid var(--focus-ring-color);outline-offset:2px;}",
      ".dcc-conf-optlabel{font-size:var(--font-size-sm);color:var(--color-text);text-align:center;line-height:1.3;",
      "text-wrap:balance;}",
      "@media (max-width:400px){.dcc-conf-optlabel{position:absolute;width:1px;height:1px;overflow:hidden;",
      "clip:rect(0 0 0 0);white-space:nowrap;}}",
      ".dcc-conf-actions{display:flex;gap:var(--space-3);flex-wrap:wrap;align-items:center;justify-content:flex-end;}",
      ".dcc-conf-msg{margin:var(--space-4) 0 0;font-weight:var(--font-weight-semibold);color:var(--color-success-deep);}",
      ".dcc-conf-warn{margin:var(--space-3) 0 0;font-weight:var(--font-weight-semibold);color:var(--color-error);}",
      ".dcc-conf-result{font-size:var(--font-size-lead);line-height:var(--line-height-lead);margin:0;}"
    ].join("");
    document.head.appendChild(s);
  }

  function elt(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  /* Short per-module topic phrase, e.g. "Scam protection" (p.lesson-category,
     present on all 39 module pages). h1 titles are deliberately excluded --
     often evocative/non-literal ("The Escape Hatch") and name nothing, which
     is the same failure this whole feature exists to avoid (see the 2026-07-29
     comment below). Falls back to the h1 only if lesson-category is missing. */
  function topicText(container) {
    var cat = container.querySelector("p.lesson-category");
    if (cat && cat.textContent.trim()) {
      return cat.textContent.replace(/^[^A-Za-z0-9]+/, "").trim().toLowerCase();
    }
    var h1 = container.querySelector("h1");
    return h1 ? h1.textContent.trim() : (IS_FR ? "ce sujet" : "this topic");
  }

  /* Builds T.beforeQ/T.afterQ ("...{topic}...") as mixed text/element nodes so
     the inserted topic phrase can carry its own visible emphasis (Aaron,
     2026-08-02: the word/phrase being asked about must be unmistakable, not
     just present in prose). */
  function questionNodes(tpl, topic) {
    var parts = tpl.split("{topic}");
    var frag = document.createDocumentFragment();
    frag.appendChild(document.createTextNode(parts[0]));
    frag.appendChild(elt("strong", "dcc-conf-topic", topic));
    frag.appendChild(document.createTextNode(parts[1] || ""));
    return frag;
  }

  /* ---- Card ------------------------------------------------------------- */
  function buildCard(phase, topic, onDone) {
    var qTpl = phase === "before" ? T.beforeQ : T.afterQ;
    var box = elt("section", "dcc-conf");
    box.setAttribute("aria-label", phase === "before" ? T.beforeTitle : T.afterTitle);

    box.appendChild(elt("span", "dcc-conf-badge", T.badge));
    box.appendChild(elt("h2", null, phase === "before" ? T.beforeTitle : T.afterTitle));
    var qP = elt("p", "dcc-conf-q");
    qP.appendChild(questionNodes(qTpl, topic));
    box.appendChild(qP);
    box.appendChild(elt("p", "dcc-conf-why", T.why));

    var fs = elt("fieldset", "dcc-conf-scale");
    var legend = elt("legend");
    legend.appendChild(questionNodes(qTpl, topic));
    fs.appendChild(legend);
    var name = "dcc-conf-" + phase;
    for (var i = 1; i <= 5; i++) {
      var wrap = elt("div", "dcc-conf-opt");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = name;
      input.id = name + "-" + i;
      input.value = String(i);
      var word = T.scaleWords[i - 1];
      var label = elt("label", null, String(i));
      label.setAttribute("for", input.id);
      label.setAttribute("aria-label", i + " " + (IS_FR ? "sur" : "out of") + " 5, " + word.toLowerCase());
      wrap.appendChild(input);
      wrap.appendChild(label);
      wrap.appendChild(elt("span", "dcc-conf-optlabel", word));
      fs.appendChild(wrap);
    }
    box.appendChild(fs);

    var actions = elt("div", "dcc-conf-actions");
    var saveBtn = elt("button", "btn btn-primary", T.save);
    saveBtn.type = "button";
    var skipBtn = elt("button", "btn btn-secondary", T.skip);
    skipBtn.type = "button";
    // Secondary (Skip) left, primary (Send) right -- Aaron, 2026-07-28:
    // affirmative action goes on the right, skip/back on the left.
    actions.appendChild(skipBtn);
    actions.appendChild(saveBtn);
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

    /* BEFORE: high in the page, but after p.lead -- not just after the
       reassurance line. Real bug, 2026-07-29 (Aaron, module-1.html "The
       Escape Hatch"): with the old anchor (reassurance only), this card
       landed directly under the title, before the one-line plain-language
       description of what the lesson topic actually is. A first-time
       visitor was asked "how confident do you feel about this topic"
       having seen only a title (often an evocative/non-literal name like
       "The Escape Hatch") with zero context for what it means. p.lead
       exists on all 39 module pages -- verified before relying on it. */
    var topic = topicText(container);

    if (!st.beforeDone) {
      var anchorTop = container.querySelector("p.lead") || container.querySelector("p.reassurance") || container.querySelector("h1");
      if (anchorTop) {
        var beforeCard = buildCard("before", topic, function (value, box) {
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

    var afterCard = buildCard("after", topic, function (value, box) {
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
