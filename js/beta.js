/*
 * DCC Beta Tester identity (ADR-0027, S-DCC-BETA-DEMO-001, 2026-07-26)
 * -----------------------------------------------------------------------
 * A distinct, opt-in flow for people who arrive via a beta-specific link
 * (?beta=1). General anonymous visitors are completely unaffected -- this
 * script does nothing unless the beta flag is present (URL param, once)
 * or already set on this device from a prior beta visit.
 *
 * Identity mechanism follows ADR-0027 exactly: email-as-key, no password.
 * The email a tester types is kept in localStorage on their own device
 * (so a return visit is recognized without retyping) and is POSTed to the
 * existing dcc-data Worker's /progress endpoint, which hashes it
 * server-side before storage -- nothing is ever stored in plaintext on
 * the server. This script never sends the raw email anywhere except that
 * one authorized endpoint, and never displays it beyond what the person
 * themselves typed into their own browser.
 *
 * No em-dashes. Canadian English.
 */
(function () {
  "use strict";

  var FLAG_KEY = "dccv2-beta";
  var EMAIL_KEY = "dccv2-beta-email";
  var WORKER = "https://dcc-data.twobirdsinnovation.workers.dev";

  if (window.__dccBetaLoaded) { return; }
  window.__dccBetaLoaded = true;

  function getParam(name) {
    try { return new URLSearchParams(window.location.search).get(name); }
    catch (e) { return null; }
  }
  function isBeta() {
    try { return window.localStorage.getItem(FLAG_KEY) === "1"; }
    catch (e) { return false; }
  }
  function setBeta(on) {
    try { window.localStorage.setItem(FLAG_KEY, on ? "1" : "0"); } catch (e) { /* ignore */ }
  }
  function getEmail() {
    try { return window.localStorage.getItem(EMAIL_KEY) || ""; }
    catch (e) { return ""; }
  }
  function setEmail(v) {
    try { window.localStorage.setItem(EMAIL_KEY, v || ""); } catch (e) { /* ignore */ }
  }

  function sha256Hex(str) {
    if (!window.crypto || !window.crypto.subtle) { return Promise.resolve(""); }
    var data = new TextEncoder().encode(String(str).trim().toLowerCase());
    return window.crypto.subtle.digest("SHA-256", data).then(function (buf) {
      return Array.from(new Uint8Array(buf)).map(function (b) {
        return b.toString(16).padStart(2, "0");
      }).join("");
    });
  }

  // Save-progress: sends the email to the ALREADY-DEPLOYED, ADR-0027-authorized
  // dcc-data Worker, which hashes it server-side (SHA-256) before writing to
  // D1. Best-effort; never blocks the UI.
  function saveProgressEmail(email) {
    if (!email || !window.fetch) { return; }
    window.fetch(WORKER + "/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, data: { betaJoinedAt: new Date().toISOString() } })
    }).catch(function () { /* best-effort; local flag already set */ });
  }

  window.DCCBeta = {
    isBeta: isBeta,
    getEmail: getEmail,
    getEmailHash: function () {
      var email = getEmail();
      if (!email) { return Promise.resolve(""); }
      return sha256Hex(email).catch(function () { return ""; });
    }
  };

  // ---- Welcome banner (text-only intro; full video system is out of
  //      scope for this pass -- tracked separately as S-DCC-VIDEO-SYSTEM) --
  function injectStyles() {
    if (document.getElementById("dcc-beta-styles")) { return; }
    var s = document.createElement("style");
    s.id = "dcc-beta-styles";
    s.textContent = [
      ".dcc-beta-banner{background:var(--color-accent-light);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-5);margin:0 0 var(--space-6);}",
      ".dcc-beta-banner h2{margin:0 0 var(--space-2);color:var(--color-primary);}",
      ".dcc-beta-banner p{margin:0 0 var(--space-3);max-width:60ch;}",
      ".dcc-beta-form{display:flex;gap:var(--space-2);flex-wrap:wrap;align-items:center;margin-top:var(--space-2);}",
      ".dcc-beta-form input[type=email]{flex:1 1 240px;min-height:var(--tap-target-min);padding:0 var(--space-3);border:1px solid var(--color-border);border-radius:var(--radius-sm);font:inherit;background:var(--color-surface);color:var(--color-text);}",
      ".dcc-beta-skip{background:none;border:none;color:var(--color-text-link);text-decoration:underline;cursor:pointer;font:inherit;min-height:var(--tap-target-min);padding:0 var(--space-2);}",
      ".dcc-beta-status{margin-top:var(--space-2);font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);}"
    ].join("");
    document.head.appendChild(s);
  }

  function elt(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  function renderBanner(main, returning) {
    injectStyles();
    var box = elt("section", "dcc-beta-banner");
    box.setAttribute("aria-label", "Beta tester welcome");

    box.appendChild(elt("h2", null, returning ? "Welcome back." : "Thank you for joining as a beta tester."));

    if (returning) {
      box.appendChild(elt("p", null,
        "Good to see you again. Look around at your own pace. If anything feels confusing or does not work, there is a Give feedback link at the bottom of every page."));
      var dismiss = elt("button", "dcc-beta-skip", "Got it");
      dismiss.type = "button";
      dismiss.addEventListener("click", function () { box.remove(); });
      box.appendChild(dismiss);
    } else {
      box.appendChild(elt("p", null,
        "You are one of the first people to see the Digital Confidence Centre. There is nothing to set up. Look around at your own pace, and if anything feels confusing or does not work, please tell us using the Give feedback link at the bottom of every page, or the box at the end of each lesson."));
      box.appendChild(elt("p", null,
        "If you would like us to remember you were here so you do not have to explain again next time, you can leave your email below. This is entirely optional."));

      var form = elt("form", "dcc-beta-form");
      form.setAttribute("aria-label", "Optional: remember me next time");
      var label = elt("label", "visually-hidden", "Your email (optional)");
      label.setAttribute("for", "dcc-beta-email");
      var input = elt("input");
      input.type = "email";
      input.id = "dcc-beta-email";
      input.placeholder = "Your email (optional)";
      input.autocomplete = "email";
      var submitBtn = elt("button", "btn btn-primary", "Remember me next time");
      submitBtn.type = "submit";
      var skipBtn = elt("button", "dcc-beta-skip", "No thanks, just let me look around");
      skipBtn.type = "button";
      var status = elt("div", "dcc-beta-status");

      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(submitBtn);
      form.appendChild(skipBtn);
      box.appendChild(form);
      box.appendChild(status);

      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var email = (input.value || "").trim();
        if (!email) { box.remove(); return; }
        setEmail(email);
        saveProgressEmail(email);
        status.textContent = "Thank you. We will remember you on this device.";
        window.setTimeout(function () { box.remove(); }, 1800);
      });
      skipBtn.addEventListener("click", function () { box.remove(); });
    }

    main.insertBefore(box, main.firstChild);
  }

  function boot() {
    var betaParam = getParam("beta");
    if (betaParam === "1" || betaParam === "true") { setBeta(true); }
    if (!isBeta()) { return; } // general anonymous visitor: experience is unchanged

    // The welcome banner is an opt-in per page (data-beta-banner on <main>).
    // beta.js is now loaded on every module page too, because the DCCBeta
    // identity API is what tags feedback and gates the beta confidence check
    // (S-DCC-BETA-CONFIDENCE-001). Repeating the welcome banner on all 39
    // module pages would be noise, so only the landing page opts in.
    var main = document.querySelector("#main[data-beta-banner]");
    if (!main) { return; }
    renderBanner(main, !!getEmail());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
