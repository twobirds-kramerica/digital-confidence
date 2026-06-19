/* =============================================================
   Digital Confidence Centre — First-Time Visitor Onboarding
   Goal-based 4-step setup: goal → tailored message → device → name
   Stores: dcc_onboarded, dcc_goal, dcc_device, dcc_name
   Replaces the simple welcome splash for brand-new visitors.
   ============================================================= */
(function () {
  'use strict';

  /* ── Already onboarded? ─────────────────────────────────────────────── */
  if (localStorage.getItem('dcc_onboarded')) return;

  /* ── Block the old welcome splash from showing ─────────────────────── */
  /* (welcome-splash.js checks dc-splash-seen before doing anything) */
  localStorage.setItem('dc-splash-seen', 'true');

  /* ── Language detection ─────────────────────────────────────────────── */
  var isFr = (navigator.language || '').toLowerCase().startsWith('fr');
  /* Respect previously set language preference */
  var storedLang = localStorage.getItem('dc-lang');
  if (storedLang === 'fr') isFr = true;
  if (storedLang === 'en') isFr = false;

  /* ── State ─────────────────────────────────────────────────────────── */
  var state = { goal: '', device: '', name: '', step: 1 };

  /* ── Translations ─────────────────────────────────────────────────── */
  var T = {
    en: {
      skip:        'Skip setup — browse now',
      step1_title: 'Welcome to Digital Confidence Centre',
      step1_sub:   'This free site helps you feel safe and confident with your phone, tablet, and computer.',
      step1_q:     'What brings you here today?',
      goal_safety: 'I want to feel safer online',
      goal_family: 'I want to connect with family',
      goal_setup:  'Someone set this up for me',
      step2_safety_title: 'Great choice!',
      step2_safety_body:  "Let\u2019s start with Module 2: The Security Shield \u2014 it shows you exactly how to spot scams, protect your personal information, and stay safe online. It takes about 20 minutes.",
      step2_safety_cta:   'Take me to Module 2 \u2192',
      step2_family_title: 'Perfect!',
      step2_family_body:  "Module 8: Stay Connected covers video calls on FaceTime, WhatsApp, and Zoom. It\u2019s easy to follow, even if you\u2019ve never done it before.",
      step2_family_cta:   'Take me to Module 8 \u2192',
      step2_setup_title:  'Welcome!',
      step2_setup_body:   "This site will help you learn at your own pace \u2014 no pressure, no wrong answers, no deadlines. Start whenever you\u2019re ready.",
      step2_setup_cta:    'Take me to Module 1 \u2192',
      step2_continue:     'Continue to next step \u2192',
      step3_title: 'What device are you using?',
      step3_sub:   'This helps us show you the right instructions.',
      device_ipad:    'iPad',
      device_iphone:  'iPhone',
      device_computer:'Computer or Laptop',
      device_notsure: 'Not sure',
      step4_title: 'One last thing!',
      step4_sub:   'What can we call you? (You can skip this)',
      name_placeholder: 'Your first name',
      name_skip:   'Skip — continue without a name',
      name_next:   'Continue \u2192',
      final_title: "You\u2019re all set",
      final_title_name: "You\u2019re all set, {name}!",
      final_body:  "Your first lesson is ready. You can come back any time \u2014 your progress is saved automatically.",
      final_cta:   "Let\u2019s begin \u2192"
    },
    fr: {
      skip:        'Passer la configuration \u2014 parcourir maintenant',
      step1_title: 'Bienvenue au Centre de confiance num\u00e9rique',
      step1_sub:   'Ce site gratuit vous aide \u00e0 vous sentir en s\u00e9curit\u00e9 et \u00e0 l\u2019aise avec votre t\u00e9l\u00e9phone, votre tablette et votre ordinateur.',
      step1_q:     'Qu\u2019est-ce qui vous am\u00e8ne ici aujourd\u2019hui\u00a0?',
      goal_safety: 'Je veux me sentir plus en s\u00e9curit\u00e9 en ligne',
      goal_family: 'Je veux rester en contact avec ma famille',
      goal_setup:  'Quelqu\u2019un a configur\u00e9 ceci pour moi',
      step2_safety_title: 'Excellent choix\u00a0!',
      step2_safety_body:  'Commen\u00e7ons par le Module 2\u00a0: Le Bouclier de s\u00e9curit\u00e9 \u2014 il vous montre comment rep\u00e9rer les arnaques, prot\u00e9ger vos informations et rester en s\u00e9curit\u00e9 en ligne. Il dure environ 20 minutes.',
      step2_safety_cta:   'Aller au Module 2 \u2192',
      step2_family_title: 'Parfait\u00a0!',
      step2_family_body:  'Le Module 8 explique les appels vid\u00e9o sur FaceTime, WhatsApp et Zoom. Il est facile \u00e0 suivre, m\u00eame si vous ne l\u2019avez jamais fait.',
      step2_family_cta:   'Aller au Module 8 \u2192',
      step2_setup_title:  'Bienvenue\u00a0!',
      step2_setup_body:   "Ce site vous aidera \u00e0 apprendre \u00e0 votre propre rythme \u2014 sans pression, sans mauvaises r\u00e9ponses, sans \u00e9ch\u00e9ances.",
      step2_setup_cta:    'Aller au Module 1 \u2192',
      step2_continue:     'Continuer \u2192',
      step3_title: 'Quel appareil utilisez-vous\u00a0?',
      step3_sub:   'Cela nous aide \u00e0 vous montrer les bonnes instructions.',
      device_ipad:    'iPad',
      device_iphone:  'iPhone',
      device_computer:'Ordinateur ou portable',
      device_notsure: 'Je ne suis pas s\u00fbr(e)',
      step4_title: 'Une derni\u00e8re chose\u00a0!',
      step4_sub:   'Comment peut-on vous appeler\u00a0? (Vous pouvez passer cette \u00e9tape)',
      name_placeholder: 'Votre pr\u00e9nom',
      name_skip:   'Passer \u2014 continuer sans nom',
      name_next:   'Continuer \u2192',
      final_title: 'Tout est pr\u00eat',
      final_title_name: 'Tout est pr\u00eat, {name}\u00a0!',
      final_body:  'Votre premi\u00e8re le\u00e7on est pr\u00eate. Vous pouvez revenir n\u2019importe quand \u2014 votre progression est enregistr\u00e9e automatiquement.',
      final_cta:   'Commen\u00e7ons \u2192'
    }
  };

  function t(key) { return (isFr ? T.fr : T.en)[key] || key; }

  /* ── Goal → module mapping ─────────────────────────────────────────── */
  var GOAL_MODULE = { safety: 'module-2.html', family: 'module-8.html', setup: 'module-1.html' };

  /* ── Build overlay ─────────────────────────────────────────────────── */
  function buildOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'dcc-onboarding-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', isFr ? 'Configuration initiale' : 'Getting started');
    overlay.style.cssText = [
      'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999',
      'background:rgba(10,20,50,0.97)',
      'display:flex;align-items:center;justify-content:center',
      'padding:16px;box-sizing:border-box'
    ].join(';');

    var card = document.createElement('div');
    card.id = 'dcc-ob-card';
    card.style.cssText = [
      'background:#fff;border-radius:16px;max-width:520px;width:100%',
      'padding:36px 32px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,0.5)',
      'max-height:90vh;overflow-y:auto'
    ].join(';');

    var skip = document.createElement('button');
    skip.id = 'dcc-ob-skip';
    skip.textContent = t('skip');
    skip.style.cssText = [
      'position:absolute;bottom:16px;left:50%;transform:translateX(-50%)',
      'background:none;border:none;color:#888;font-size:0.82rem',
      'cursor:pointer;text-decoration:underline;padding:4px 8px'
    ].join(';');
    skip.addEventListener('click', completeOnboarding);

    overlay.appendChild(card);
    overlay.appendChild(skip);
    document.body.appendChild(overlay);

    /* Trap focus */
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') completeOnboarding();
    });

    renderStep();
  }

  /* ── Render current step ───────────────────────────────────────────── */
  function renderStep() {
    var card = document.getElementById('dcc-ob-card');
    if (!card) return;

    var html = '';
    var stepIndicator = '<p style="font-size:0.75rem;color:#767676;text-align:right;margin:0 0 8px">' +
      (state.step < 5 ? (isFr ? 'Étape ' : 'Step ') + state.step + ' / 4' : '') + '</p>';

    if (state.step === 1) {
      html = stepIndicator +
        '<h1 style="font-size:1.5rem;margin:0 0 8px;color:#1a237e;line-height:1.3">' + t('step1_title') + '</h1>' +
        '<p style="color:#555;margin:0 0 24px;font-size:1rem;line-height:1.6">' + t('step1_sub') + '</p>' +
        '<p style="font-weight:700;margin:0 0 16px;font-size:1.05rem">' + t('step1_q') + '</p>' +
        goalBtn('safety') + goalBtn('family') + goalBtn('setup');

    } else if (state.step === 2) {
      var g = state.goal;
      var tTitle = t('step2_' + g + '_title');
      var tBody  = t('step2_' + g + '_body');
      var tCta   = t('step2_' + g + '_cta');
      var mod    = GOAL_MODULE[g] || 'module-1.html';
      html = stepIndicator +
        '<h2 style="font-size:1.4rem;margin:0 0 12px;color:#1a237e">' + tTitle + '</h2>' +
        '<p style="color:#555;font-size:1.05rem;line-height:1.7;margin:0 0 28px">' + tBody + '</p>' +
        '<a href="' + mod + '" onclick="dccObComplete()" style="' + ctaStyle('#1565C0') + '">' + tCta + '</a>' +
        '<button onclick="dccObNext()" style="' + secondaryStyle() + '">' + t('step2_continue') + '</button>';

    } else if (state.step === 3) {
      html = stepIndicator +
        '<h2 style="font-size:1.4rem;margin:0 0 8px;color:#1a237e">' + t('step3_title') + '</h2>' +
        '<p style="color:#555;margin:0 0 20px">' + t('step3_sub') + '</p>' +
        deviceBtn('ipad') + deviceBtn('iphone') + deviceBtn('computer') + deviceBtn('notsure');

    } else if (state.step === 4) {
      html = stepIndicator +
        '<h2 style="font-size:1.4rem;margin:0 0 8px;color:#1a237e">' + t('step4_title') + '</h2>' +
        '<p style="color:#555;margin:0 0 20px">' + t('step4_sub') + '</p>' +
        '<input id="dcc-ob-name" type="text" placeholder="' + t('name_placeholder') + '" ' +
          'style="width:100%;font-size:1.1rem;padding:12px 16px;border:2px solid #ccc;border-radius:10px;box-sizing:border-box;margin-bottom:16px" />' +
        '<button id="dcc-ob-name-next" style="' + ctaStyle('#1565C0') + '">' + t('name_next') + '</button>' +
        '<button id="dcc-ob-name-skip" style="' + secondaryStyle() + '">' + t('name_skip') + '</button>';

    } else { /* step 5 — final */
      var nm = state.name;
      var finalTitle = nm
        ? t('final_title_name').replace('{name}', nm)
        : t('final_title');
      var mod2 = GOAL_MODULE[state.goal] || 'module-1.html';
      html =
        '<div style="text-align:center;padding:8px 0 4px">' +
        '<div style="font-size:3rem;margin-bottom:12px">🎉</div>' +
        '<h2 style="font-size:1.5rem;color:#1a237e;margin:0 0 12px">' + finalTitle + '</h2>' +
        '<p style="color:#555;font-size:1.05rem;line-height:1.7;margin:0 0 28px">' + t('final_body') + '</p>' +
        '<a href="' + mod2 + '" onclick="dccObComplete()" style="' + ctaStyle('#1565C0') + '">' + t('final_cta') + '</a>' +
        '</div>';
    }

    card.innerHTML = html;

    /* Bind step-specific events */
    if (state.step === 4) {
      var inp = document.getElementById('dcc-ob-name');
      var nextBtn = document.getElementById('dcc-ob-name-next');
      var skipBtn = document.getElementById('dcc-ob-name-skip');
      if (inp) inp.addEventListener('keydown', function(e) { if (e.key === 'Enter') advanceFromName(); });
      if (nextBtn) nextBtn.addEventListener('click', advanceFromName);
      if (skipBtn) skipBtn.addEventListener('click', function() { state.name = ''; state.step = 5; renderStep(); });
      if (inp) inp.focus();
    }

    /* Focus first interactive element */
    var first = card.querySelector('button, a, input');
    if (first) first.focus();
  }

  /* ── Helpers ────────────────────────────────────────────────────────── */
  function ctaStyle(bg) {
    return 'display:block;width:100%;padding:15px 20px;background:' + bg + ';color:#fff;' +
      'font-size:1.05rem;font-weight:700;border:none;border-radius:10px;cursor:pointer;' +
      'text-decoration:none;text-align:center;margin-bottom:12px;box-sizing:border-box';
  }

  function secondaryStyle() {
    return 'display:block;width:100%;padding:12px 20px;background:#f0f0f0;color:#333;' +
      'font-size:0.95rem;border:none;border-radius:10px;cursor:pointer;' +
      'text-decoration:none;text-align:center;margin-bottom:12px;box-sizing:border-box';
  }

  function goalBtn(goal) {
    var labels = { safety: t('goal_safety'), family: t('goal_family'), setup: t('goal_setup') };
    var icons  = { safety: '🛡️', family: '👨‍👩‍👧', setup: '📱' };
    return '<button onclick="dccObGoal(\'' + goal + '\')" style="' + [
      'display:flex;align-items:center;gap:12px;width:100%;padding:16px 20px',
      'background:#f5f7ff;border:2px solid #c5cae9;border-radius:12px;cursor:pointer',
      'font-size:1.05rem;font-weight:600;text-align:left;margin-bottom:12px',
      'transition:all 0.2s;box-sizing:border-box'
    ].join(';') + '">' +
      '<span style="font-size:1.5rem" aria-hidden="true">' + icons[goal] + '</span>' +
      '<span>' + labels[goal] + '</span>' +
    '</button>';
  }

  function deviceBtn(dev) {
    var labels = {
      ipad: t('device_ipad'), iphone: t('device_iphone'),
      computer: t('device_computer'), notsure: t('device_notsure')
    };
    var icons = { ipad: '📱', iphone: '📱', computer: '💻', notsure: '❓' };
    return '<button onclick="dccObDevice(\'' + dev + '\')" style="' + [
      'display:flex;align-items:center;gap:12px;width:100%;padding:14px 20px',
      'background:#f5f7ff;border:2px solid #c5cae9;border-radius:12px;cursor:pointer',
      'font-size:1rem;font-weight:600;text-align:left;margin-bottom:10px',
      'box-sizing:border-box'
    ].join(';') + '">' +
      '<span style="font-size:1.3rem" aria-hidden="true">' + icons[dev] + '</span>' +
      '<span>' + labels[dev] + '</span>' +
    '</button>';
  }

  function advanceFromName() {
    var inp = document.getElementById('dcc-ob-name');
    state.name = (inp ? inp.value.trim() : '');
    state.step = 5;
    renderStep();
  }

  /* ── Global callbacks (called from inline onclick) ─────────────────── */
  window.dccObGoal = function (goal) {
    state.goal = goal;
    state.step = 2;
    renderStep();
  };

  window.dccObNext = function () {
    state.step = 3;
    renderStep();
  };

  window.dccObDevice = function (dev) {
    state.device = dev;
    state.step = 4;
    renderStep();
  };

  window.dccObComplete = function () {
    completeOnboarding();
  };

  /* ── Finish & store ────────────────────────────────────────────────── */
  function completeOnboarding() {
    localStorage.setItem('dcc_onboarded', 'true');
    localStorage.setItem('dcc_goal',   state.goal   || 'setup');
    localStorage.setItem('dcc_device', state.device || 'notsure');
    localStorage.setItem('dcc_name',   state.name   || '');
    /* Mirror name to key used by homepage-personalise.js */
    if (state.name) localStorage.setItem('dc-user-name', state.name);
    /* Map device to dc-device-profile format used by setup-wizard.js */
    if (state.device === 'ipad') {
      localStorage.setItem('dc-device-profile', JSON.stringify({ phone: [], tablet: ['ipad'], computer: [] }));
    } else if (state.device === 'iphone') {
      localStorage.setItem('dc-device-profile', JSON.stringify({ phone: ['iphone'], tablet: [], computer: [] }));
    } else if (state.device === 'computer') {
      localStorage.setItem('dc-device-profile', JSON.stringify({ phone: [], tablet: [], computer: ['windows'] }));
    }
    localStorage.setItem('dc-setup-complete', 'true');
    if (isFr) localStorage.setItem('dc-lang', 'fr');

    var overlay = document.getElementById('dcc-onboarding-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.4s';
      overlay.style.opacity = '0';
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 400);
    }
  }

  /* ── Init ──────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildOverlay);
  } else {
    buildOverlay();
  }

})();
