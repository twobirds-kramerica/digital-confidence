/*
 * DCC device relevance -- "show me the steps for MY device"
 * (S-DCC-DEVICE-RELEVANCE-001, 2026-08-02)
 * ---------------------------------------------------------------------------
 * Problem (Aaron, 2026-08-02): lesson pages interleave iPhone steps with
 * Android steps (and occasionally Windows with Mac) in the same section. A
 * reader who owns exactly one of those has to read past everything that is
 * not theirs to find the two lines that are. For a low-confidence senior
 * reader that is not just noise, it is a place to get lost.
 *
 * PRIOR ART this is built from (not invented from scratch) --
 *   1. Be Connected (eSafety Commissioner, Australia) -- the closest real
 *      comparator: free government digital-literacy library for older adults.
 *      Its topic library is organised device-first (Apple iPhones / Android
 *      phones / Apple iPads / Android tablets / Windows laptops / Windows
 *      desktops / Apple laptops / Apple desktops) AND carries a persistent
 *      left-rail Device filter (Computer / Mobile phone / Tablet). Two levels:
 *      broad form factor, then OS. Critically it NEVER gates entry on the
 *      choice -- the filter is optional and everything shows by default.
 *   2. GCFGlobal -- keeps "iPhone Basics" and "Android Basics" as separate
 *      tracks rather than one merged page, i.e. separation-by-device is the
 *      settled pattern for this audience, not interleaving.
 *   3. Docusaurus <Tabs groupId> -- the settled TECHNICAL pattern for an
 *      OS choice that is remembered in localStorage and applies to every
 *      matching block across the whole site, not re-asked per page.
 * Full rationale: hal-stack/research/dcc-device-relevance-personalization-2026-08-02.md
 *
 * DESIGN DECISIONS (the questions Aaron left to judgment) --
 *   * NOT a sticky top bar. It would eat vertical space on exactly the
 *     audience that runs 125-200% browser zoom, and PRODUCT.md's anti-
 *     references rule out anything that hovers over readable content. Same
 *     reasoning already filed for the read-aloud control (see
 *     js/readaloud-discoverable.js). Instead: one in-flow line at the top of
 *     the page content, same slot as the Listen control, present on every
 *     page it is wired to -- persistent and subtle without floating.
 *   * Never a gate. Default state is "show everything", exactly as today.
 *     Nothing is hidden until the reader has explicitly said "not mine".
 *   * Only hide what was explicitly rejected. A block is hidden only when
 *     EVERY device it is tagged for has been explicitly marked "Not mine".
 *     An unanswered device never hides anything -- no guessing.
 *   * Never empty a section. If filtering would hide every option in a
 *     group, the group is left fully visible instead.
 *   * Nothing is lost. Each filtered group gets a plain-word "Also show the
 *     steps for ..." button, and print always shows everything.
 *   * Green check / red X, but never colour alone: each state carries a
 *     distinct glyph AND a word AND aria-pressed.
 *
 * MARKUP CONTRACT (additive attributes only, no content rewriting) --
 *   data-dcc-device="iphone"              on the block that is iPhone-only
 *   data-dcc-device="iphone ipad"         relevant to either (space separated)
 *   data-dcc-device-group                 on the parent that holds a set of
 *                                         device-specific siblings
 *   Device keys: iphone ipad android-phone android-tablet windows mac
 *
 * Static HTML/CSS/JS only. localStorage only, no network, no tracking.
 * Canadian English. No em-dashes.
 */
(function () {
  "use strict";

  if (window.__dccDevicePrefLoaded) { return; }
  window.__dccDevicePrefLoaded = true;

  var STORE_KEY = "dccv2-devices";
  var PAGE_KEY = "dccv2-devices-page:" + location.pathname;
  var DISMISS_KEY = "dccv2-devices-invite-dismissed";

  var IS_FR = (document.documentElement.getAttribute("lang") || "en").toLowerCase().indexOf("fr") === 0;

  var DEVICES = [
    { key: "iphone",         group: "phone",    en: "iPhone",             fr: "iPhone" },
    { key: "android-phone",  group: "phone",    en: "Android phone",      fr: "Téléphone Android" },
    { key: "ipad",           group: "tablet",   en: "iPad",               fr: "iPad" },
    { key: "android-tablet", group: "tablet",   en: "Android tablet",     fr: "Tablette Android" },
    { key: "windows",        group: "computer", en: "Windows computer",   fr: "Ordinateur Windows" },
    { key: "mac",            group: "computer", en: "Mac computer",       fr: "Ordinateur Mac" }
  ];

  var GROUPS = [
    { key: "phone",    en: "Phone",    fr: "Téléphone" },
    { key: "tablet",   en: "Tablet",   fr: "Tablette" },
    { key: "computer", en: "Computer", fr: "Ordinateur" }
  ];

  var T = IS_FR ? {
    region: "Vos appareils",
    invite: "Voulez-vous voir seulement les étapes pour vos propres appareils ?",
    inviteBtn: "Choisir mes appareils",
    notNow: "Pas maintenant",
    showingFor: "Affichage des étapes pour :",
    showingAll: "Affichage des étapes pour tous les appareils.",
    change: "Modifier",
    done: "Terminé",
    heading: "Quels appareils utilisez-vous ?",
    lead: "Cochez ce que vous avez. Nous masquerons les étapes qui ne vous concernent pas. Vous pouvez changer d'avis à tout moment.",
    have: "Oui, j'ai cela",
    notMine: "Pas le mien",
    reset: "Tout afficher de nouveau",
    scopeAsk: "Appliquer ce changement à tout le site, ou seulement à cette page ?",
    scopeAll: "Tout le site",
    scopePage: "Seulement cette page",
    alsoShow: "Afficher aussi les étapes pour",
    hiddenNote: "Des étapes pour d'autres appareils sont masquées.",
    and: "et"
  } : {
    region: "Your devices",
    invite: "Would you like to see only the steps for your own devices?",
    inviteBtn: "Choose my devices",
    notNow: "Not now",
    showingFor: "Showing steps for:",
    showingAll: "Showing steps for all devices.",
    change: "Change",
    done: "Done",
    heading: "Which devices do you use?",
    lead: "Tick what you have. We will hide the steps that are not yours. You can change this any time.",
    have: "Yes, I have this",
    notMine: "Not mine",
    reset: "Show everything again",
    scopeAsk: "Apply this change to the whole site, or just this page?",
    scopeAll: "The whole site",
    scopePage: "Just this page",
    alsoShow: "Also show the steps for",
    hiddenNote: "Steps for other devices are hidden.",
    and: "and"
  };

  /* ---------------------------------------------------------------- storage */

  function readJSON(store, key) {
    try {
      var raw = store.getItem(key);
      if (!raw) { return null; }
      var v = JSON.parse(raw);
      return (v && typeof v === "object" && v.devices) ? v.devices : null;
    } catch (e) { return null; }
  }

  function writeJSON(store, key, devices) {
    try { store.setItem(key, JSON.stringify({ v: 1, devices: devices })); } catch (e) {}
  }

  // Site-wide preference, or a page-only override that beats it for this page.
  var siteDevices = readJSON(window.localStorage, STORE_KEY) || {};
  var pageDevices = null;
  try { pageDevices = readJSON(window.sessionStorage, PAGE_KEY); } catch (e) { pageDevices = null; }

  var devices = pageDevices ? clone(pageDevices) : clone(siteDevices);
  var pageOnly = !!pageDevices;

  function clone(o) {
    var out = {}, k;
    for (k in o) { if (Object.prototype.hasOwnProperty.call(o, k)) { out[k] = o[k]; } }
    return out;
  }

  function anyAnswered() {
    for (var i = 0; i < DEVICES.length; i++) {
      if (typeof devices[DEVICES[i].key] === "boolean") { return true; }
    }
    return false;
  }

  function label(key) {
    for (var i = 0; i < DEVICES.length; i++) {
      if (DEVICES[i].key === key) { return IS_FR ? DEVICES[i].fr : DEVICES[i].en; }
    }
    return key;
  }

  function ownedLabels() {
    var out = [];
    for (var i = 0; i < DEVICES.length; i++) {
      if (devices[DEVICES[i].key] === true) { out.push(IS_FR ? DEVICES[i].fr : DEVICES[i].en); }
    }
    return out;
  }

  function joinList(arr) {
    if (arr.length === 0) { return ""; }
    if (arr.length === 1) { return arr[0]; }
    return arr.slice(0, -1).join(", ") + " " + T.and + " " + arr[arr.length - 1];
  }

  /* ------------------------------------------------------------------ style */

  function injectStyles() {
    if (document.getElementById("dcc-devices-styles")) { return; }
    var s = document.createElement("style");
    s.id = "dcc-devices-styles";
    s.textContent = [
      /* The in-flow card. Never fixed, never floating: it scrolls with the
         page so it cannot cover prose at 200% zoom. */
      ".dcc-devices{margin:0 0 var(--space-6);border:1px solid var(--color-border);",
      "border-radius:var(--radius-md);background:var(--color-surface);padding:var(--space-3) var(--space-4);}",
      ".dcc-devices-summary{display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-2) var(--space-3);}",
      ".dcc-devices-summary p{margin:0;font-size:var(--font-size-sm);line-height:1.5;flex:1 1 260px;}",
      ".dcc-devices-summary .btn{flex:0 0 auto;}",
      ".dcc-devices-panel{margin-top:var(--space-4);border-top:1px solid var(--color-divider);padding-top:var(--space-4);}",
      ".dcc-devices-panel[hidden]{display:none;}",
      ".dcc-devices-panel h3{margin:0 0 var(--space-2);font-size:var(--font-size-h4);}",
      ".dcc-devices-panel .dcc-devices-lead{margin:0 0 var(--space-4);font-size:var(--font-size-sm);}",
      ".dcc-devices-group{margin:0 0 var(--space-4);}",
      ".dcc-devices-group > h4{margin:0 0 var(--space-2);font-size:var(--font-size-sm);",
      "text-transform:uppercase;letter-spacing:.04em;color:var(--color-text-light);}",
      ".dcc-devices-row{display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-2) var(--space-3);",
      "padding:var(--space-2) 0;border-bottom:1px solid var(--color-divider);}",
      ".dcc-devices-row:last-child{border-bottom:0;}",
      ".dcc-devices-row .dcc-devices-name{flex:1 1 180px;font-weight:var(--font-weight-semibold);}",
      /* Toggle buttons. Shape + word + colour, never colour alone. */
      ".dcc-dev-btn{display:inline-flex;align-items:center;gap:var(--space-2);min-height:var(--tap-target-min,44px);",
      "padding:var(--space-2) var(--space-3);border:2px solid var(--color-border-strong);border-radius:var(--radius-md);",
      "background:var(--color-surface);color:var(--color-text);font-family:var(--font-heading);",
      "font-size:var(--font-size-sm);cursor:pointer;}",
      ".dcc-dev-btn:hover{background:var(--color-surface-alt);}",
      ".dcc-dev-glyph{font-weight:var(--font-weight-bold);font-size:1.1em;line-height:1;}",
      ".dcc-dev-yes[aria-pressed=\"true\"]{background:var(--color-success-light);border-color:var(--color-success);color:var(--color-success-deep);}",
      ".dcc-dev-yes[aria-pressed=\"true\"] .dcc-dev-glyph{color:var(--color-success-deep);}",
      ".dcc-dev-no[aria-pressed=\"true\"]{background:var(--color-error-light);border-color:var(--color-error);color:var(--color-error);}",
      ".dcc-dev-no[aria-pressed=\"true\"] .dcc-dev-glyph{color:var(--color-error);}",
      ".dcc-devices-actions{display:flex;flex-wrap:wrap;gap:var(--space-3);margin-top:var(--space-4);}",
      /* Scope question -- same quiet inline strip pattern as the beta bar. */
      ".dcc-devices-scope{margin-top:var(--space-4);padding:var(--space-3);border-radius:var(--radius-md);",
      "background:var(--color-info-light);border:1px solid var(--color-border);}",
      ".dcc-devices-scope[hidden]{display:none;}",
      ".dcc-devices-scope p{margin:0 0 var(--space-3);font-size:var(--font-size-sm);}",
      ".dcc-devices-scope .dcc-devices-actions{margin-top:0;}",
      /* Filtered-out content + the per-section escape hatch. */
      ".dcc-device-off{display:none;}",
      ".dcc-device-restore{margin:var(--space-3) 0 0;font-size:var(--font-size-sm);}",
      ".dcc-device-restore .btn{margin-inline-start:var(--space-2);}",
      "@media print{.dcc-device-off{display:revert !important;}.dcc-devices,.dcc-device-restore{display:none !important;}}"
    ].join("");
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------------------- dom  */

  function elt(tag, attrs, kids) {
    var n = document.createElement(tag), k;
    if (attrs) {
      for (k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) { continue; }
        if (k === "text") { n.textContent = attrs[k]; }
        else if (k === "className") { n.className = attrs[k]; }
        else if (attrs[k] === true) { n.setAttribute(k, ""); }
        else if (attrs[k] !== false && attrs[k] != null) { n.setAttribute(k, attrs[k]); }
      }
    }
    if (kids) { for (var i = 0; i < kids.length; i++) { if (kids[i]) { n.appendChild(kids[i]); } } }
    return n;
  }

  /* --------------------------------------------------------------- filtering */

  // A block is hidden only when EVERY device it is tagged for is explicitly
  // "not mine". Unanswered devices never hide anything.
  function blockIsRejected(el) {
    var tags = (el.getAttribute("data-dcc-device") || "").split(/\s+/);
    var sawOne = false;
    for (var i = 0; i < tags.length; i++) {
      if (!tags[i]) { continue; }
      sawOne = true;
      if (devices[tags[i]] !== false) { return false; }
    }
    return sawOne;
  }

  function clearFilter() {
    var off = document.querySelectorAll(".dcc-device-off");
    for (var i = 0; i < off.length; i++) { off[i].classList.remove("dcc-device-off"); }
    var notes = document.querySelectorAll(".dcc-device-restore");
    for (var j = 0; j < notes.length; j++) { notes[j].parentNode.removeChild(notes[j]); }
    renumberAll();
  }

  // Walkthrough step numbers are hardcoded literals in the HTML, so hiding
  // step 2 of 3 would otherwise leave the reader looking at "1, 3". These
  // spans are aria-hidden decoration, so rewriting them is safe. The original
  // value is stashed once so "show everything again" restores it exactly.
  function renumberAll() {
    var wts = document.querySelectorAll(".walkthrough");
    for (var w = 0; w < wts.length; w++) { renumber(wts[w]); }
  }

  function renumber(walkthrough) {
    var steps = walkthrough.querySelectorAll(".wt-step");
    var n = 0;
    for (var i = 0; i < steps.length; i++) {
      var num = steps[i].querySelector(".step-num");
      if (!num) { continue; }
      if (num.getAttribute("data-dcc-num-orig") === null) {
        num.setAttribute("data-dcc-num-orig", num.textContent);
      }
      if (steps[i].classList.contains("dcc-device-off")) { continue; }
      n++;
      // Only renumber where the original was a plain number; leave anything
      // else (a glyph, a letter) exactly as the author wrote it.
      if (/^\s*\d+\s*$/.test(num.getAttribute("data-dcc-num-orig"))) {
        num.textContent = String(n);
      }
    }
    if (n === steps.length) {
      // Nothing hidden here: put every number back to what the author wrote.
      for (var j = 0; j < steps.length; j++) {
        var s = steps[j].querySelector(".step-num");
        if (s && s.getAttribute("data-dcc-num-orig") !== null) {
          s.textContent = s.getAttribute("data-dcc-num-orig");
        }
      }
    }
  }

  function applyFilter() {
    clearFilter();
    if (!anyAnswered()) { return; }

    var groups = document.querySelectorAll("[data-dcc-device-group]");
    for (var g = 0; g < groups.length; g++) {
      var group = groups[g];
      var blocks = group.querySelectorAll("[data-dcc-device]");
      var toHide = [], hiddenNames = {}, i;

      for (i = 0; i < blocks.length; i++) {
        if (blockIsRejected(blocks[i])) { toHide.push(blocks[i]); }
      }

      // Never empty a section: if every option would go, leave the lot alone.
      if (toHide.length === 0 || toHide.length >= blocks.length) { continue; }

      for (i = 0; i < toHide.length; i++) {
        toHide[i].classList.add("dcc-device-off");
        var tags = (toHide[i].getAttribute("data-dcc-device") || "").split(/\s+/);
        for (var t = 0; t < tags.length; t++) { if (tags[t]) { hiddenNames[tags[t]] = true; } }
      }

      var names = [], k;
      for (k in hiddenNames) { if (Object.prototype.hasOwnProperty.call(hiddenNames, k)) { names.push(label(k)); } }

      var restore = elt("p", { className: "dcc-device-restore" }, [
        elt("span", { text: T.hiddenNote + " " })
      ]);
      var btn = elt("button", { type: "button", className: "btn btn-quiet",
        text: T.alsoShow + " " + joinList(names) });
      (function (grp, node) {
        btn.addEventListener("click", function () {
          var hidden = grp.querySelectorAll(".dcc-device-off");
          for (var h = 0; h < hidden.length; h++) { hidden[h].classList.remove("dcc-device-off"); }
          node.parentNode.removeChild(node);
          renumberAll();
        });
      })(group, restore);
      restore.appendChild(btn);
      // After the group, never inside it: a <ul> group cannot legally hold a <p>.
      if (group.parentNode) { group.parentNode.insertBefore(restore, group.nextSibling); }
    }
    renumberAll();
  }

  /* ------------------------------------------------------------------- card */

  var summaryText, panel, scopeStrip, changeBtn, dirty = false;

  function refreshSummary() {
    var owned = ownedLabels();
    if (!anyAnswered()) {
      summaryText.textContent = T.invite;
      changeBtn.textContent = T.inviteBtn;
    } else if (owned.length) {
      summaryText.textContent = T.showingFor + " " + joinList(owned) + ".";
      changeBtn.textContent = T.change;
    } else {
      summaryText.textContent = T.showingAll;
      changeBtn.textContent = T.change;
    }
  }

  function persist(scope) {
    if (scope === "page") {
      pageOnly = true;
      try { writeJSON(window.sessionStorage, PAGE_KEY, devices); } catch (e) {}
    } else {
      pageOnly = false;
      try { window.sessionStorage.removeItem(PAGE_KEY); } catch (e) {}
      siteDevices = clone(devices);
      writeJSON(window.localStorage, STORE_KEY, devices);
    }
  }

  function buildRow(dev) {
    var yes = elt("button", { type: "button", className: "dcc-dev-btn dcc-dev-yes",
      "aria-pressed": devices[dev.key] === true ? "true" : "false" }, [
      elt("span", { className: "dcc-dev-glyph", "aria-hidden": "true", text: "✓" }),
      elt("span", { text: T.have })
    ]);
    var no = elt("button", { type: "button", className: "dcc-dev-btn dcc-dev-no",
      "aria-pressed": devices[dev.key] === false ? "true" : "false" }, [
      elt("span", { className: "dcc-dev-glyph", "aria-hidden": "true", text: "✕" }),
      elt("span", { text: T.notMine })
    ]);

    var name = IS_FR ? dev.fr : dev.en;
    yes.setAttribute("aria-label", name + ": " + T.have);
    no.setAttribute("aria-label", name + ": " + T.notMine);

    function set(val) {
      // Tapping the already-pressed state clears the answer (back to unknown).
      devices[dev.key] = (devices[dev.key] === val) ? undefined : val;
      if (devices[dev.key] === undefined) { delete devices[dev.key]; }
      yes.setAttribute("aria-pressed", devices[dev.key] === true ? "true" : "false");
      no.setAttribute("aria-pressed", devices[dev.key] === false ? "true" : "false");
      onChange();
    }
    yes.addEventListener("click", function () { set(true); });
    no.addEventListener("click", function () { set(false); });

    return elt("div", { className: "dcc-devices-row" }, [
      elt("span", { className: "dcc-devices-name", text: name }),
      yes, no
    ]);
  }

  // Whether we already had a saved site-wide preference when this page loaded.
  var hadSavedPref = (function () {
    for (var i = 0; i < DEVICES.length; i++) {
      if (typeof siteDevices[DEVICES[i].key] === "boolean") { return true; }
    }
    return false;
  })();

  function onChange() {
    applyFilter();
    refreshSummary();
    if (hadSavedPref) {
      // Changing an existing preference mid-session: ask the scope question
      // rather than silently rewriting the site-wide setting. Until answered,
      // the change applies to this page only -- the safe default.
      dirty = true;
      persist("page");
      scopeStrip.hidden = false;
    } else {
      // First-ever setup: no scope question, the obvious intent is site-wide.
      persist("site");
    }
  }

  function build() {
    injectStyles();

    summaryText = elt("p", {});
    changeBtn = elt("button", { type: "button", className: "btn btn-secondary",
      "aria-expanded": "false", "aria-controls": "dcc-devices-panel" });

    var summary = elt("div", { className: "dcc-devices-summary" }, [summaryText, changeBtn]);

    panel = elt("div", { className: "dcc-devices-panel", id: "dcc-devices-panel", hidden: true });
    panel.appendChild(elt("h3", { text: T.heading }));
    panel.appendChild(elt("p", { className: "dcc-devices-lead", text: T.lead }));

    for (var g = 0; g < GROUPS.length; g++) {
      var gwrap = elt("div", { className: "dcc-devices-group" }, [
        elt("h4", { text: IS_FR ? GROUPS[g].fr : GROUPS[g].en })
      ]);
      for (var d = 0; d < DEVICES.length; d++) {
        if (DEVICES[d].group === GROUPS[g].key) { gwrap.appendChild(buildRow(DEVICES[d])); }
      }
      panel.appendChild(gwrap);
    }

    var resetBtn = elt("button", { type: "button", className: "btn btn-quiet", text: T.reset });
    resetBtn.addEventListener("click", function () {
      devices = {};
      try { window.localStorage.removeItem(STORE_KEY); } catch (e) {}
      try { window.sessionStorage.removeItem(PAGE_KEY); } catch (e) {}
      siteDevices = {}; hadSavedPref = false; pageOnly = false;
      scopeStrip.hidden = true;
      var btns = panel.querySelectorAll(".dcc-dev-btn");
      for (var i = 0; i < btns.length; i++) { btns[i].setAttribute("aria-pressed", "false"); }
      applyFilter();
      refreshSummary();
    });

    var doneBtn = elt("button", { type: "button", className: "btn btn-primary", text: T.done });
    doneBtn.addEventListener("click", function () { togglePanel(false); });

    panel.appendChild(elt("div", { className: "dcc-devices-actions" }, [doneBtn, resetBtn]));

    // Scope question -- shown only after changing an existing preference.
    scopeStrip = elt("div", { className: "dcc-devices-scope", hidden: true, role: "group",
      "aria-label": T.scopeAsk });
    scopeStrip.appendChild(elt("p", { text: T.scopeAsk }));
    var allBtn = elt("button", { type: "button", className: "btn btn-primary", text: T.scopeAll });
    var pgBtn = elt("button", { type: "button", className: "btn btn-secondary", text: T.scopePage });
    allBtn.addEventListener("click", function () { persist("site"); dirty = false; scopeStrip.hidden = true; });
    pgBtn.addEventListener("click", function () { persist("page"); dirty = false; scopeStrip.hidden = true; });
    scopeStrip.appendChild(elt("div", { className: "dcc-devices-actions" }, [allBtn, pgBtn]));
    panel.appendChild(scopeStrip);

    function togglePanel(open) {
      panel.hidden = !open;
      changeBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { panel.scrollIntoView({ block: "nearest" }); }
    }
    changeBtn.addEventListener("click", function () { togglePanel(panel.hidden); });

    var card = elt("section", { className: "dcc-devices", "aria-label": T.region }, [summary, panel]);

    var main = document.querySelector("#main > .container") || document.querySelector("#main");
    if (!main) { return; }
    // Sit directly under the Listen control if that ran first, otherwise at
    // the very top of the page content.
    var listen = main.querySelector(":scope > .dcc-listen");
    if (listen && listen.nextSibling) { main.insertBefore(card, listen.nextSibling); }
    else if (listen) { main.appendChild(card); }
    else { main.insertBefore(card, main.firstChild); }

    refreshSummary();
    applyFilter();
  }

  function boot() {
    // Nothing device-specific on this page and no preference to report? Then
    // this control has no job here -- do not add furniture for its own sake.
    if (!document.querySelector("[data-dcc-device]") && !anyAnswered()) { return; }
    build();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
