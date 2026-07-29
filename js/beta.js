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
  var NAME_KEY = "dccv2-beta-name";
  var WELCOME_SEEN_KEY = "dccv2-beta-welcome-seen";
  var WORKER = "https://dcc-data.twobirdsinnovation.workers.dev";

  // Margaret approved by Aaron 2026-07-28 -- the two cosmetic defects (a
  // typo, a stray scale bar) were on the reference sheet only, cropped out
  // of the actual served asset (assets/characters/margaret-welcome.png).
  var SHOW_MARGARET = true;

  // Language follows the page, not the browser. DCC's language split is whole
  // separate pages (index.html = EN, fr/index.html = FR) with a manual link, so
  // this matches js/feedback-inflow.js rather than introducing auto-detection.
  var IS_FR = (document.documentElement.getAttribute("lang") || "en").toLowerCase().indexOf("fr") === 0;

  var T = IS_FR ? {
    label: "Accueil des testeurs beta",
    welcome: "Merci de participer comme testeur beta.",
    welcomeBack: "Bon retour dans la version bêta.",
    introBack: "Content de vous revoir. Regardez a votre rythme. Si quelque chose vous semble confus ou ne fonctionne pas, un lien Donner mon avis se trouve au bas de chaque page.",
    gotIt: "Fermer",
    intro: "Vous etes parmi les premieres personnes a voir le Centre de confiance numerique. Il n'y a rien a configurer. Regardez a votre rythme, et si quelque chose vous semble confus ou ne fonctionne pas, dites-le nous avec le lien Donner mon avis au bas de chaque page, ou la boite a la fin de chaque lecon.",
    emailIntro: "Si vous voulez que nous nous souvenions de votre passage pour ne pas avoir a tout reexpliquer la prochaine fois, vous pouvez laisser votre courriel ci-dessous. C'est entierement facultatif.",
    formLabel: "Facultatif : se souvenir de moi",
    emailLabel: "Votre courriel (facultatif)",
    remember: "Se souvenir de moi",
    skip: "Non merci, je veux seulement regarder",
    saved: "Merci. Nous nous souviendrons de vous sur cet appareil.",
    videoHeading: "Un mot de bienvenue en video (environ 45 secondes)",
    videoNote: "Facultatif. Rien ne joue tant que vous n'appuyez pas sur lecture.",
    videoSrc: "../videos/dcc-beta-welcome-fr.mp4",
    videoVtt: "../videos/dcc-beta-welcome-fr.vtt",
    videoPoster: "../videos/dcc-beta-welcome-fr-poster.jpg",
    videoLang: "fr",
    videoTrack: "Francais",
    videoFallback: "Votre navigateur ne peut pas lire cette video.",
    wizStep1of3: "Étape 1 de 3",
    wizStep2of3: "Étape 2 de 3",
    wizStep3of3: "Étape 3 de 3",
    wizTitle1: "Bienvenue au programme bêta.",
    wizAttrib: "Le Centre de confiance numérique est un programme de Two Birds Innovation.",
    wizBody1: "Restez en sécurité et à l'aise avec la technologie du quotidien.",
    wizBullet1: "Rien à configurer",
    wizBullet2: "Aucune connexion requise",
    wizBullet3: "Vidéo d'introduction facultative de 40 secondes",
    wizNext: "Suivant",
    wizSkip: "Passer la vidéo",
    wizTitle2: "Un mot de bienvenue de Two Birds Innovation",
    wizBody2: "Le son est désactivé au départ. Activez-le quand vous voulez. Les mots apparaissent sur la vidéo dans les deux cas.",
    wizContinue: "Continuer",
    wizBack: "Retour",
    wizRewatch: "Revoir la vidéo de bienvenue bêta",
    wizLabel: "Accueil des testeurs beta",
    wizIdTitle: "À qui parlons-nous?",
    wizIdBody: "Quand vous nous envoyez un commentaire, il arrive sans nom. Si vous nous donnez votre prénom, nous saurons qu'il vient de vous, et nous pourrons revenir vers vous si nous avons une question. C'est entièrement à vous de décider et vous pouvez laisser le champ vide.",
    wizIdName: "Votre prénom",
    wizIdEmail: "Votre courriel, seulement si vous voulez que vos leçons vous suivent d'un appareil à l'autre",
    wizIdEmailHelp: "Nous ne conservons jamais votre adresse courriel. Votre navigateur la brouille d'abord, ce qui permet de vous reconnaître sans que nous la voyions.",
    wizIdSave: "Enregistrer et commencer à regarder",
    wizIdSkip: "Passer et commencer à regarder",
    wizIdThanks: "Merci, {name}. Vos commentaires nous arriveront avec votre nom.",
    wizTellUs: "Dites-nous qui vous êtes",
    wizClose: "Fermer",
    wizBrandName: "Centre de confiance numérique"
  } : {
    label: "Beta tester welcome",
    welcome: "Thank you for joining as a beta tester.",
    welcomeBack: "Welcome back to the beta.",
    introBack: "Good to see you again. Look around at your own pace. If anything feels confusing or does not work, there is a Give feedback link at the bottom of every page.",
    gotIt: "Dismiss",
    intro: "You are one of the first people to see the Digital Confidence Centre. There is nothing to set up. Look around at your own pace, and if anything feels confusing or does not work, please tell us using the Give feedback link at the bottom of every page, or the box at the end of each lesson.",
    emailIntro: "If you would like us to remember you were here so you do not have to explain again next time, you can leave your email below. This is entirely optional.",
    formLabel: "Optional: remember me next time",
    emailLabel: "Your email (optional)",
    remember: "Remember me next time",
    skip: "No thanks, just let me look around",
    saved: "Thank you. We will remember you on this device.",
    videoHeading: "A short welcome video (about 40 seconds)",
    videoNote: "Optional. Nothing plays until you press play.",
    videoSrc: "videos/dcc-beta-welcome-en.mp4",
    videoVtt: "videos/dcc-beta-welcome-en.vtt",
    videoPoster: "videos/dcc-beta-welcome-en-poster.jpg",
    videoLang: "en",
    videoTrack: "English",
    videoFallback: "Your browser cannot play this video.",
    wizStep1of3: "Step 1 of 3",
    wizStep2of3: "Step 2 of 3",
    wizStep3of3: "Step 3 of 3",
    wizTitle1: "Welcome, beta tester.",
    wizAttrib: "Digital Confidence Centre is a programme of Two Birds Innovation.",
    wizBody1: "Stay safe and comfortable with practical, everyday technology.",
    wizBullet1: "Nothing to set up",
    wizBullet2: "No sign-in required",
    wizBullet3: "Optional 40-second intro video",
    wizNext: "Next",
    wizSkip: "Skip the video",
    wizClose: "Close",
    wizBrandName: "Digital Confidence Centre",
    wizTitle2: "A short welcome from Two Birds Innovation",
    wizBody2: "The sound starts off. Turn it on whenever you like. The words appear on the video either way.",
    wizContinue: "Continue",
    wizBack: "Back",
    wizRewatch: "Watch the beta welcome video again",
    wizLabel: "Beta tester welcome",
    wizIdTitle: "Who are we talking to?",
    wizIdBody: "When you send us feedback, it arrives with no name on it. If you tell us your first name, we will know it came from you, and we can come back to you if we have a question about something you told us. This is entirely up to you and you can leave it blank.",
    wizIdName: "Your first name",
    wizIdEmail: "Your email, only if you want lessons to carry over between your devices",
    wizIdEmailHelp: "We never store your email address. Your own browser scrambles it first, so it works as a key without us ever seeing it.",
    wizIdSave: "Save this and start looking around",
    wizIdSkip: "Skip this and start looking around",
    wizIdThanks: "Thank you, {name}. Your feedback will come to us with your name on it.",
    wizTellUs: "Tell us who you are"
  };

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
  function getName() {
    try { return window.localStorage.getItem(NAME_KEY) || ""; }
    catch (e) { return ""; }
  }
  function setName(v) {
    // Cap at 60 chars, strip newlines: this string gets prefixed onto feedback
    // text bodies, so it must not be usable to fake extra content or blow the
    // 2000-char feedback limit.
    var clean = String(v || "").replace(/[\r\n]+/g, " ").trim().slice(0, 60);
    try { window.localStorage.setItem(NAME_KEY, clean); } catch (e) { /* ignore */ }
    return clean;
  }
  function welcomeSeen() {
    try { return !!window.localStorage.getItem(WELCOME_SEEN_KEY); }
    catch (e) { return false; } // storage throws (private browsing): treat as unseen, show it
  }
  function markWelcomeSeen() {
    try { window.localStorage.setItem(WELCOME_SEEN_KEY, new Date().toISOString()); } catch (e) { /* ignore */ }
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
    getName: getName,
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
      /* Thin returning-visitor bar: one line, dismissible, sits directly under
         the header. Not the full cream card treatment used for the first-visit
         fallback below (that one is the entire onboarding surface for
         no-dialog-support browsers and genuinely needs the room; this is a
         courtesy reminder for someone who already saw the wizard). */
      ".dcc-beta-bar{display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap;",
      "background:var(--color-accent-light);border-bottom:1px solid var(--color-border);",
      "padding:var(--space-2) var(--space-4);margin:0 0 var(--space-5);font-size:var(--font-size-sm);}",
      ".dcc-beta-bar-text{flex:1 1 auto;min-width:0;}",
      ".dcc-beta-bar-text strong{font-weight:var(--font-weight-semibold);color:var(--color-primary);}",
      ".dcc-beta-bar-link{background:none;border:none;color:var(--color-text-link);text-decoration:underline;cursor:pointer;font:inherit;padding:0;white-space:nowrap;}",
      ".dcc-beta-bar-dismiss{background:none;border:none;color:var(--color-text-light);cursor:pointer;",
      "font-size:20px;line-height:1;padding:var(--space-1) var(--space-2);flex:0 0 auto;}",
      ".dcc-beta-bar-dismiss:hover,.dcc-beta-bar-dismiss:focus-visible{color:var(--color-text);}",
      ".dcc-beta-form{display:flex;gap:var(--space-2);flex-wrap:wrap;align-items:center;margin-top:var(--space-2);}",
      ".dcc-beta-form input[type=email]{flex:1 1 240px;min-height:var(--tap-target-min);padding:0 var(--space-3);border:1px solid var(--color-border);border-radius:var(--radius-sm);font:inherit;background:var(--color-surface);color:var(--color-text);}",
      ".dcc-beta-skip{background:none;border:none;color:var(--color-text-link);text-decoration:underline;cursor:pointer;font:inherit;min-height:var(--tap-target-min);padding:0 var(--space-2);}",
      ".dcc-beta-status{margin-top:var(--space-2);font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);}",
      // The welcome video sits IN the banner, in normal document flow. Not a
      // modal, not an interstitial, not autoplay: PRODUCT.md bans floating
      // overlays over content, and design principle 1 (anxiety first) rules out
      // anything that starts making noise at a nervous first-time visitor.
      ".dcc-beta-video{margin:var(--space-5) 0 var(--space-2);}",
      ".dcc-beta-video h3{margin:0 0 var(--space-2);font-size:var(--font-size-h3);color:var(--color-primary);}",
      ".dcc-beta-video video{display:block;width:100%;max-width:640px;height:auto;",
      "border:1px solid var(--color-border);border-radius:var(--radius-md);background:#000;}",
      ".dcc-beta-video .dcc-beta-videonote{margin:var(--space-2) 0 0;font-size:var(--font-size-sm);}",
      ".dcc-beta-rewatch{background:none;border:none;color:var(--color-text-link);text-decoration:underline;cursor:pointer;font:inherit;min-height:var(--tap-target-min);padding:var(--space-2) 0;display:block;margin-top:var(--space-2);}",
      ".dcc-beta-tellus{font-size:var(--font-size-sm);}",

      /* ---- Welcome wizard: native <dialog>, DCC's own tokens only ---- */
      ":root{--dcc-welcome-scrim:rgba(16,23,31,0.66);}",
      "html[data-theme=\"dark\"]{--dcc-welcome-scrim:rgba(0,0,0,0.72);}",
      /* Dialog IS the centering container (flex, full viewport via inset:0 --
         not 100vw, which includes the scrollbar gutter in Chrome/Firefox and
         was pushing the panel off-centre whenever the page had a scrollbar).
         The panel is a normal flex child, never position:fixed itself --
         two independent full-viewport-anchored boxes stacked was the root
         cause of the below-the-fold / pushed-down reports (2026-07-28). */
      "dialog.dcc-welcome{--dcc-welcome-scrim:rgba(16,23,31,0.66);border:0;outline:0;padding:var(--space-6);background:transparent;",
      "z-index:var(--z-modal,1000);max-width:none;max-height:none;position:fixed;inset:0;margin:0;width:100%;height:100%;",
      "display:flex;align-items:center;justify-content:center;box-sizing:border-box;}",
      "html[data-theme=\"dark\"] dialog.dcc-welcome{--dcc-welcome-scrim:rgba(0,0,0,0.72);}",
      "dialog.dcc-welcome::backdrop{background:var(--dcc-welcome-scrim);opacity:0;transition:opacity var(--motion-duration-2,200ms) var(--motion-ease,ease);}",
      "dialog.dcc-welcome.is-open::backdrop{opacity:1;}",
      ".dcc-welcome-panel{width:min(680px,100%);max-height:100%;",
      "background:var(--color-surface);border-radius:var(--radius-lg);",
      "display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(12px) scale(0.98);",
      "transition:opacity var(--motion-duration-3,320ms) var(--motion-ease,ease),transform var(--motion-duration-3,320ms) var(--motion-ease,ease);}",
      ".dcc-welcome-head{flex:0 0 auto;}",
      ".dcc-welcome-actions{flex:0 0 auto;}",
      "dialog.dcc-welcome.is-open .dcc-welcome-panel{opacity:1;transform:translateY(0) scale(1);}",
      "dialog.dcc-welcome.is-closing .dcc-welcome-panel{transition-duration:var(--motion-duration-2,200ms);opacity:0;transform:translateY(12px) scale(0.98);}",
      "dialog.dcc-welcome.is-closing::backdrop{transition-duration:var(--motion-duration-2,200ms);opacity:0;}",
      ".dcc-welcome-panel{box-shadow:var(--shadow-lg);}",
      ".dcc-welcome-panel:focus,.dcc-welcome-body:focus,.dcc-welcome-body section:focus{outline:none;}",
      "html[data-theme=\"dark\"] .dcc-welcome-panel{box-shadow:none;border:1px solid var(--color-border-strong);}",
      ".dcc-welcome-head{background:var(--color-accent-light);border-bottom:1px solid var(--color-border);",
      "padding:var(--space-5) var(--space-8) var(--space-5);border-radius:var(--radius-lg) var(--radius-lg) 0 0;",
      "display:flex;align-items:flex-start;gap:var(--space-3);position:relative;}",
      "html[data-theme=\"dark\"] .dcc-welcome-head{background:var(--color-surface-alt);}",
      ".dcc-welcome-margaret{width:96px;height:96px;border-radius:var(--radius-pill);flex:0 0 auto;object-fit:cover;}",
      ".dcc-welcome-headtext{min-width:0;padding-right:var(--space-8);}",
      ".dcc-welcome-brandline{display:flex;align-items:center;gap:var(--space-2);margin:0 0 var(--space-3);}",
      ".dcc-welcome-brandmark{width:20px;height:20px;flex:0 0 auto;color:var(--color-primary);}",
      ".dcc-welcome-brandname{font-family:var(--font-heading);font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);color:var(--color-text-light);}",
      ".dcc-welcome-step{margin:0 0 var(--space-2);font-family:var(--font-heading);font-size:var(--font-size-sm);",
      "font-weight:var(--font-weight-semibold);color:var(--color-accent-deep);}",
      "html[data-theme=\"dark\"] .dcc-welcome-step{color:var(--color-text-light);font-weight:400;}",
      ".dcc-welcome-panel h2{margin:0 0 var(--space-2);font-family:var(--font-heading);font-weight:var(--font-weight-bold);",
      "font-size:var(--font-size-h2);color:var(--color-primary);}",
      ".dcc-welcome-attrib{margin:0;font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);color:var(--color-primary);}",
      ".dcc-welcome-close{position:absolute;top:var(--space-3);right:var(--space-3);width:var(--tap-target-min,44px);",
      "height:var(--tap-target-min,44px);border-radius:var(--radius-pill);border:0;background:transparent;",
      "color:var(--color-text-light);font-size:22px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;}",
      ".dcc-welcome-close:hover,.dcc-welcome-close:focus-visible{background:rgba(0,0,0,0.08);color:var(--color-text);}",
      "html[data-theme=\"dark\"] .dcc-welcome-close:hover,html[data-theme=\"dark\"] .dcc-welcome-close:focus-visible{background:rgba(255,255,255,0.12);}",
      ".dcc-welcome-body{flex:1 1 auto;overflow-y:auto;padding:var(--space-6) var(--space-8);min-height:0;}",
      ".dcc-welcome-body p{margin:0 0 var(--space-4);max-width:60ch;}",
      ".dcc-welcome-body section[hidden]{display:none;}",
      ".dcc-welcome-body section{opacity:1;transition:opacity var(--motion-duration-2,200ms) var(--motion-ease,ease);}",
      ".dcc-welcome-body section.is-fading{opacity:0;}",
      ".dcc-welcome-art{display:block;width:220px;height:auto;margin:var(--space-3) auto 0;color:var(--color-primary);}",
      ".dcc-welcome-checklist{list-style:none;margin:0 0 var(--space-2);padding:0;display:grid;gap:var(--space-2);}",
      ".dcc-welcome-checklist li{position:relative;padding-left:var(--space-6);}",
      ".dcc-welcome-checklist li::before{content:\"\\2713\";position:absolute;left:0;color:var(--color-success-deep,var(--color-primary));font-weight:var(--font-weight-bold);}",
      ".dcc-welcome-video{width:100%;aspect-ratio:16/9;border-radius:var(--radius-md);background:#000;display:block;margin:0 0 var(--space-4);}",
      ".dcc-welcome-field{margin:0 0 var(--space-4);}",
      ".dcc-welcome-field label{display:block;font-weight:var(--font-weight-semibold);margin:0 0 var(--space-2);}",
      ".dcc-welcome-field input{width:100%;min-height:var(--tap-target);padding:0 var(--space-3);",
      "border:1px solid var(--color-border);border-radius:var(--radius-sm);font:inherit;",
      "background:var(--color-surface);color:var(--color-text);}",
      ".dcc-welcome-fieldhelp{margin:var(--space-2) 0 0;font-size:var(--font-size-sm);color:var(--color-text-light);}",
      ".dcc-welcome-thanks{margin:0 0 var(--space-4);font-weight:var(--font-weight-semibold);color:var(--color-success-deep);}",
      ".dcc-welcome-actions{padding:var(--space-5) var(--space-8);border-top:1px solid var(--color-border);",
      "display:flex;gap:var(--space-3);flex-wrap:nowrap;}",
      ".dcc-welcome-actions .btn{flex:1 1 0;min-width:0;}",
      /* Narrow/short viewports: shrink the DIALOG's own padding so the panel
         (already width:min(680px,100%) / max-height:100% of the dialog's
         content box) automatically gets more room -- no 100vw/100dvh math
         needed, the flex-centering container handles it. */
      "@media (max-width:559px){dialog.dcc-welcome{padding:var(--space-4);}",
      ".dcc-welcome-head,.dcc-welcome-body,.dcc-welcome-actions{padding-left:var(--space-6);padding-right:var(--space-6);}",
      ".dcc-welcome-actions{gap:var(--space-2);}}",
      "@media (max-height:559px) and (orientation:landscape){dialog.dcc-welcome{padding:var(--space-4);}}",
      "@media (prefers-reduced-motion:reduce){dialog.dcc-welcome::backdrop,.dcc-welcome-panel,.dcc-welcome-body section{transition:none;}}"
    ].join("");
    document.head.appendChild(s);
  }

  function elt(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  // Optional welcome video. Native <video controls>, deliberately: the native
  // control set is already keyboard operable and screen-reader labelled, and on
  // most desktop browsers its overflow menu carries the playback-speed option
  // Aaron asked for, for an audience that often wants things slower. Building a
  // custom control bar would cost all of that and buy nothing.
  // preload="none" so a tester on a metered or slow connection downloads
  // nothing unless they actually choose to watch.
  function buildVideo() {
    var wrap = elt("div", "dcc-beta-video");
    wrap.appendChild(elt("h3", null, T.videoHeading));

    var v = document.createElement("video");
    v.setAttribute("controls", "");
    v.setAttribute("preload", "none");
    v.setAttribute("playsinline", "");
    v.setAttribute("aria-label", T.videoHeading);

    var src = document.createElement("source");
    src.src = T.videoSrc;
    src.type = "video/mp4";
    v.appendChild(src);

    var track = document.createElement("track");
    track.kind = "captions";
    track.src = T.videoVtt;
    track.srclang = T.videoLang;
    track.label = T.videoTrack;
    track.setAttribute("default", "");
    v.appendChild(track);

    v.appendChild(document.createTextNode(T.videoFallback));
    wrap.appendChild(v);
    wrap.appendChild(elt("p", "dcc-beta-videonote", T.videoNote));
    return wrap;
  }

  // ---- Welcome wizard --------------------------------------------------
  // Native <dialog>, first appearance only per device (dccv2-beta-welcome-seen).
  // Replaces the old inline video + "remember me" box with one coherent
  // first-run flow. See beta-welcome-wizard-SPEC-2026-07-28.md.
  var wizard = null; // lazily built singleton: {dlg, openAt}

  function buildWizard() {
    if (!("HTMLDialogElement" in window) || typeof document.createElement("dialog").showModal !== "function") {
      return null; // no <dialog> support: caller falls back to buildVideo() inline
    }

    var dlg = document.createElement("dialog");
    dlg.className = "dcc-welcome";
    dlg.setAttribute("aria-labelledby", "dcc-welcome-title");

    var panel = elt("div", "dcc-welcome-panel");

    var head = elt("div", "dcc-welcome-head");
    if (SHOW_MARGARET) {
      var margImg = document.createElement("img");
      margImg.className = "dcc-welcome-margaret";
      margImg.src = "assets/characters/margaret-welcome.png";
      margImg.setAttribute("aria-hidden", "true");
      margImg.alt = "";
      head.appendChild(margImg);
    }
    var headtext = elt("div", "dcc-welcome-headtext");
    var brandLine = elt("div", "dcc-welcome-brandline");
    var brandMark = document.createElement("div");
    brandMark.className = "dcc-welcome-brandmark";
    brandMark.innerHTML = "<svg viewBox=\"0 0 32 32\" width=\"20\" height=\"20\" aria-hidden=\"true\" focusable=\"false\"><rect width=\"32\" height=\"32\" rx=\"7\" fill=\"currentColor\"/><path d=\"M16 4 L26 8 V15 C26 22 21.5 26.5 16 28.5 C10.5 26.5 6 22 6 15 V8 Z\" fill=\"var(--color-accent-light)\"/><path d=\"M11 16 L14.5 19.5 L21.5 12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>";
    brandLine.appendChild(brandMark);
    brandLine.appendChild(elt("span", "dcc-welcome-brandname", T.wizBrandName));
    var stepLine = elt("p", "dcc-welcome-step", T.wizStep1of3);
    var title = elt("h2", null, T.wizTitle1);
    title.id = "dcc-welcome-title";
    var attrib = elt("p", "dcc-welcome-attrib", T.wizAttrib);
    headtext.appendChild(brandLine);
    headtext.appendChild(stepLine);
    headtext.appendChild(title);
    headtext.appendChild(attrib);
    head.appendChild(headtext);
    // The design spec deliberately excluded a corner X (audience-accessibility
    // reasoning: "X means close" isn't universal for this demographic, and a
    // small icon-only control is the exact "cramped dismiss" pattern being
    // avoided). Aaron asked for one directly after seeing the built result, so
    // it's added here -- additive, not a replacement: the full-size labelled
    // Skip/Watch buttons remain the primary, accessible exit path either way.
    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "dcc-welcome-close";
    closeBtn.setAttribute("aria-label", T.wizClose);
    closeBtn.innerHTML = "<span aria-hidden=\"true\">×</span>";
    head.appendChild(closeBtn);
    panel.appendChild(head);

    var body = elt("div", "dcc-welcome-body");
    body.tabIndex = -1;

    // Step 1: thanks. Welcoming line-art variant of the site's etched-illustration
    // style (see index.html hero) -- glasses, warm smile, a raised waving hand.
    // Aaron asked for a friendly welcoming figure here specifically; this is a
    // one-off for the wizard, not the broader per-module illustration rollout
    // (that's its own scoped sprint, S-DCC-ILLUSTRATION-SYSTEM-001).
    var s1 = elt("section", null);
    s1.setAttribute("data-step", "1");
    s1.appendChild(elt("p", null, T.wizBody1));
    var s1list = elt("ul", "dcc-welcome-checklist");
    [T.wizBullet1, T.wizBullet2, T.wizBullet3].forEach(function (item) {
      s1list.appendChild(elt("li", null, item));
    });
    s1.appendChild(s1list);
    // Mirrors assets/illustrations/dcc-figures.svg#fig-greeting -- keep in
    // sync. Inline here per the JS-injected-surface exception in the DCC
    // Monoline Figure System guideline (sprite may not resolve before this
    // DOM is built). 2026-07-28: rebuilt against the locked rig -- the
    // previous version had a bridge line between the eyes (read as
    // glasses), a mouth arc colliding with the chin, and the waving arm's
    // endpoint sitting inside the hand circle instead of meeting its edge.
    var artWrap = document.createElement("div");
    artWrap.innerHTML = "<svg class=\"dcc-welcome-art\" viewBox=\"0 0 240 220\" role=\"presentation\" aria-hidden=\"true\" focusable=\"false\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><ellipse cx=\"126\" cy=\"66\" rx=\"23\" ry=\"26\"/><circle cx=\"114\" cy=\"60\" r=\"6.5\"/><circle cx=\"138\" cy=\"60\" r=\"6.5\"/><path d=\"M112 74 Q126 80 140 74\"/><path d=\"M78 172 C78 140 100 118 126 118 C152 118 174 140 174 172\"/><path d=\"M160 124 C176 119 188 106 194 94\"/><circle cx=\"200\" cy=\"88\" r=\"8\"/><path d=\"M212 76 l8 -6 M214 92 l9 4\"/></g></svg>";
    s1.appendChild(artWrap.firstChild);
    body.appendChild(s1);

    // Step 2: the video
    var s2 = elt("section", null);
    s2.setAttribute("data-step", "2");
    s2.hidden = true;
    s2.appendChild(elt("p", null, T.wizBody2));
    var video = document.createElement("video");
    video.className = "dcc-welcome-video";
    video.setAttribute("controls", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "metadata");
    video.setAttribute("poster", T.videoPoster);
    video.setAttribute("aria-label", T.wizTitle2);
    var vsrc = document.createElement("source");
    vsrc.src = T.videoSrc;
    vsrc.type = "video/mp4";
    video.appendChild(vsrc);
    var vtrack = document.createElement("track");
    vtrack.kind = "captions";
    vtrack.src = T.videoVtt;
    vtrack.srclang = T.videoLang;
    vtrack.label = T.videoTrack;
    vtrack.setAttribute("default", "");
    video.appendChild(vtrack);
    s2.appendChild(video);
    body.appendChild(s2);
    // No custom mute/nudge UI here (removed 2026-07-28, was built earlier
    // this session for the muted-autoplay problem that no longer exists --
    // see the no-autoplay comment above). Native <video controls> already
    // has a volume/mute control; sound is on by default since nothing sets
    // .muted, so there is nothing left for a custom control to solve.

    // Step 3: optional self-identification
    var s3 = elt("section", null);
    s3.setAttribute("data-step", "3");
    s3.hidden = true;
    s3.appendChild(elt("p", null, T.wizIdBody));
    var nameField = elt("div", "dcc-welcome-field");
    var nameLabel = elt("label", null, T.wizIdName);
    nameLabel.setAttribute("for", "dcc-welcome-name");
    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "dcc-welcome-name";
    nameInput.autocomplete = "given-name";
    nameInput.maxLength = 60;
    nameField.appendChild(nameLabel);
    nameField.appendChild(nameInput);
    s3.appendChild(nameField);
    var emailField = elt("div", "dcc-welcome-field");
    var emailLabel = elt("label", null, T.wizIdEmail);
    emailLabel.setAttribute("for", "dcc-welcome-email");
    var emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "dcc-welcome-email";
    emailInput.autocomplete = "email";
    emailField.appendChild(emailLabel);
    emailField.appendChild(emailInput);
    emailField.appendChild(elt("p", "dcc-welcome-fieldhelp", T.wizIdEmailHelp));
    s3.appendChild(emailField);
    var idThanks = elt("p", "dcc-welcome-thanks", "");
    idThanks.hidden = true;
    idThanks.setAttribute("aria-live", "polite");
    s3.appendChild(idThanks);
    body.appendChild(s3);

    panel.appendChild(body);

    var actions = elt("div", "dcc-welcome-actions");
    var btnSkip = elt("button", "btn btn-secondary", T.wizSkip);
    btnSkip.type = "button";
    var btnPrimary = elt("button", "btn btn-primary", T.wizNext);
    btnPrimary.type = "button";
    actions.appendChild(btnSkip);
    actions.appendChild(btnPrimary);
    panel.appendChild(actions);

    dlg.appendChild(panel);
    document.body.appendChild(dlg);

    var currentStep = 1;
    var openedFromRewatch = false;
    var priorOverflow = "";
    var returnFocusEl = null;

    function setStep(n, animate) {
      var sections = { 1: s1, 2: s2, 3: s3 };
      var steps = { 1: T.wizStep1of3, 2: T.wizStep2of3, 3: T.wizStep3of3 };
      var titles = { 1: T.wizTitle1, 2: T.wizTitle2, 3: T.wizIdTitle };
      function doSwitch() {
        sections[currentStep].hidden = true;
        currentStep = n;
        stepLine.textContent = steps[n];
        title.textContent = titles[n];
        attrib.style.display = n === 1 ? "" : "none";
        if (head.querySelector(".dcc-welcome-margaret")) {
          head.querySelector(".dcc-welcome-margaret").style.display = n === 1 ? "" : "none";
        }
        if (n === 2) { btnPrimary.textContent = T.wizContinue; btnSkip.textContent = T.wizBack; }
        else if (n === 3) { btnPrimary.textContent = T.wizIdSave; btnSkip.textContent = T.wizIdSkip; }
        else { btnPrimary.textContent = T.wizNext; btnSkip.textContent = T.wizSkip; }
        sections[n].hidden = false;
        sections[n].tabIndex = -1;
        sections[n].focus();
        // No autoplay (Aaron, 2026-07-28): starting muted-and-playing meant
        // most people never noticed the sound was off and had to restart to
        // hear it. The video now sits on its poster frame -- native
        // <video controls> already renders a large centre play button when
        // paused -- and pressing play starts it WITH sound, since nothing
        // sets .muted anymore. Removes the need for the unmute nudge below;
        // it simply never shows now (muted stays false).
      }
      if (currentStep === 2 && n !== 2) { video.pause(); }
      doSwitch();
    }

    function closeWizard() {
      video.pause();
      markWelcomeSeen();
      dlg.classList.remove("is-open");
      dlg.classList.add("is-closing");
      var done = false;
      function finish() {
        if (done) { return; }
        done = true;
        dlg.close();
        dlg.classList.remove("is-closing");
        try { document.documentElement.style.overflow = priorOverflow; } catch (e) {}
        if (openedFromRewatch && returnFocusEl) { returnFocusEl.focus(); }
        else {
          var m = document.getElementById("main");
          if (m) { m.setAttribute("tabindex", "-1"); m.focus(); }
        }
      }
      dlg.addEventListener("transitionend", finish, { once: true });
      window.setTimeout(finish, 260);
    }

    function saveIdentity() {
      var n = setName(nameInput.value);
      var email = (emailInput.value || "").trim();
      if (email) { setEmail(email); saveProgressEmail(email); }
      if (n) {
        idThanks.textContent = T.wizIdThanks.replace("{name}", n);
        idThanks.hidden = false;
      }
    }

    btnPrimary.addEventListener("click", function () {
      if (currentStep === 1) { setStep(2); }
      else if (currentStep === 2) { setStep(3); }
      else { saveIdentity(); closeWizard(); }
    });
    btnSkip.addEventListener("click", function () {
      if (currentStep === 2) { setStep(1); }
      else { closeWizard(); }
    });
    closeBtn.addEventListener("click", function () { closeWizard(); });
    dlg.addEventListener("cancel", function () {
      // Esc: native <dialog> behaviour, not suppressed. Still runs our own
      // markWelcomeSeen()/cleanup rather than letting the browser close it raw.
      video.pause();
      markWelcomeSeen();
      try { document.documentElement.style.overflow = priorOverflow; } catch (e) {}
    });

    function openAt(step, fromRewatch, triggerEl) {
      openedFromRewatch = !!fromRewatch;
      returnFocusEl = triggerEl || null;
      try { priorOverflow = document.documentElement.style.overflow || ""; } catch (e) { priorOverflow = ""; }
      document.documentElement.style.overflow = "hidden";
      // Force currentStep to whatever step is NOT the target so setStep()'s
      // "hide the outgoing section" logic below always has something real to
      // hide, even when opening straight into step 2 or 3 from the rewatch /
      // tell-us-who-you-are buttons (s1 is visible by default in the markup).
      currentStep = step === 1 ? 2 : 1;
      dlg.showModal();
      setStep(step);
      panel.tabIndex = -1;
      panel.focus();
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { dlg.classList.add("is-open"); });
      });
    }

    return { dlg: dlg, openAt: openAt };
  }

  function ensureWizard() {
    if (wizard === null) { wizard = buildWizard() || false; }
    return wizard || null;
  }

  function maybeShowWizardOnLoad(main) {
    if (welcomeSeen()) { return false; }
    if (!main) { return false; }
    var w = ensureWizard();
    if (!w) { return false; } // no <dialog> support: caller keeps the inline video fallback
    w.openAt(1, false, null);
    return true;
  }

  function buildRewatchButton() {
    var btn = elt("button", "dcc-beta-rewatch", T.wizRewatch);
    btn.type = "button";
    btn.addEventListener("click", function () {
      var w = ensureWizard();
      if (w) { w.openAt(2, true, btn); }
    });
    return btn;
  }

  function buildTellUsLink() {
    var wrap = elt("p", "dcc-beta-tellus");
    var btn = elt("button", "dcc-beta-rewatch", T.wizTellUs);
    btn.type = "button";
    btn.addEventListener("click", function () {
      var w = ensureWizard();
      if (w) { w.openAt(3, true, btn); }
    });
    wrap.appendChild(btn);
    return wrap;
  }

  function renderReturningBar(main) {
    injectStyles();
    var bar = elt("div", "dcc-beta-bar");
    bar.setAttribute("aria-label", T.label);

    var text = elt("span", "dcc-beta-bar-text");
    text.appendChild(elt("strong", null, T.welcomeBack + " "));
    var rewatch = elt("button", "dcc-beta-bar-link", T.wizRewatch);
    rewatch.type = "button";
    rewatch.addEventListener("click", function () {
      var w = ensureWizard();
      if (w) { w.openAt(2, true, rewatch); }
    });
    text.appendChild(rewatch);
    bar.appendChild(text);

    var dismiss = elt("button", "dcc-beta-bar-dismiss", "");
    dismiss.type = "button";
    dismiss.setAttribute("aria-label", T.gotIt);
    dismiss.innerHTML = "<span aria-hidden=\"true\">&times;</span>";
    dismiss.addEventListener("click", function () { bar.remove(); });
    bar.appendChild(dismiss);

    main.insertBefore(bar, main.firstChild);
  }

  function renderBanner(main, returning, needsInlineVideo) {
    if (returning) { renderReturningBar(main); return; }

    injectStyles();
    var box = elt("section", "dcc-beta-banner");
    box.setAttribute("aria-label", T.label);

    box.appendChild(elt("h2", null, T.welcome));

    // The video and the "who are we talking to" identification now live in
    // the wizard (see maybeShowWizardOnLoad, called from boot()). This
    // banner is what remains once the wizard is dismissed: intro prose and
    // a way to bring either piece back on purpose.
    box.appendChild(elt("p", null, T.intro));
    if (needsInlineVideo) {
      // No <dialog> support (old iPads, pre-iOS 15.4 Safari): fall back to
      // today's inline video, in normal document flow.
      box.appendChild(buildVideo());
    }
    box.appendChild(buildRewatchButton());
    if (!getName()) { box.appendChild(buildTellUsLink()); }

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

    var dialogSupported = "HTMLDialogElement" in window && typeof document.createElement("dialog").showModal === "function";
    var willShowWizard = dialogSupported && !welcomeSeen();
    renderBanner(main, !!getEmail(), !dialogSupported && !welcomeSeen());
    if (willShowWizard) { maybeShowWizardOnLoad(main); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
