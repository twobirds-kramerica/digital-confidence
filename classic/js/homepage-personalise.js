/**
 * homepage-personalise.js
 * Shows contextual progress banners on the homepage based on module completion.
 * Digital Confidence Centre — Two Birds Innovation
 *
 * States:
 *   0 modules  → welcome / get started
 *   1–5        → keep going (% and last module link)
 *   6–10       → halfway there
 *   11+        → almost there
 *   all 15     → all complete (certificate link)
 *
 * Also shows user first name if dc-user-name is set in localStorage.
 * Adds star ratings from dc-rating-N to module cards.
 */
(function () {
  'use strict';

  var TOTAL_MODULES = 21;
  /* Module keys — includes non-numeric filenames mapped to numbers */
  var MODULE_KEYS = [
    '1','2','2.5','3','4','5','6','7','8','9','10',
    '11','12','13','14','15','16','17','18','19'
  ];
  var isFr = (localStorage.getItem('dc-lang') || navigator.language || 'en').startsWith('fr');

  // ── Count completed modules ─────────────────────────────────────────────
  var completed = [];
  MODULE_KEYS.forEach(function (key) {
    if (localStorage.getItem('dc-module-' + key + '-complete') === 'true') {
      completed.push(key);
    }
  });
  var count = completed.length;
  var userName = (localStorage.getItem('dc-user-name') || localStorage.getItem('dcc_name') || localStorage.getItem('userName') || '').trim();

  // ── Find the "continue where you left off" module ───────────────────────
  var continueModule = null;
  for (var mi = 0; mi < MODULE_KEYS.length; mi++) {
    var mk = MODULE_KEYS[mi];
    if (localStorage.getItem('dc-module-' + mk + '-complete') !== 'true') {
      continueModule = mk;
      break;
    }
  }

  // ── Build personalised panel ─────────────────────────────────────────────
  var panel = document.getElementById('dc-progress-personalise');
  if (!panel) return;

  var greeting = userName
    ? (isFr ? 'Bonjour, ' + userName + '&nbsp;!' : 'Welcome back, ' + userName + '!')
    : '';

  var content = '';

  /* ── Helper: module href from key ─────────────────────────────────────── */
  function modHref(key) {
    var map = {
      '16': 'module-16-travel-safety.html',
      '17': 'module-17-ai-research.html',
      '18': 'module-18-staying-connected.html',
      '19': 'module-19-digital-legacy.html',
      '2.5': 'module-2-5.html'
    };
    return map[key] || ('module-' + key + '.html');
  }

  /* ── Personalised name suffix for progress messages ─────────────────── */
  function nameSuffix() {
    if (!userName) return '';
    return isFr ? ', ' + userName + '&nbsp;!' : ', ' + userName + '!';
  }

  if (count === 0) {
    /* F1: Hide progress section entirely on first visit. Only show after at least 1 module started. */
    if (!userName && !localStorage.getItem('dc-setup-complete')) {
      panel.style.display = 'none';
      return;
    }
    content = buildBanner(
      '🌱',
      isFr ? 'Commençons ensemble' : "Let's get started",
      (greeting ? '<strong>' + escHtml(greeting) + '</strong><br>' : '') +
      (isFr
        ? 'Vous n\'avez pas encore commencé de module. Essayez le premier&nbsp;— il prend environ 15 minutes.'
        : "You haven't started any modules yet. Try the first one — it takes about 15 minutes."),
      isFr ? 'Commencer le module 1 →' : 'Start Module 1 →',
      'module-1.html',
      '#e8f5e9',
      '#2e7d32'
    );
  } else if (count < 6) {
    var pct = Math.round((count / MODULE_KEYS.length) * 100);
    var keepGoing = isFr
      ? 'Continuez comme ça' + nameSuffix()
      : 'Keep going' + nameSuffix();
    content = buildBanner(
      '🚀',
      isFr ? 'Vous progressez bien&nbsp;!' : "You're making progress!",
      (greeting ? '<strong>' + escHtml(greeting) + '</strong><br>' : '') +
      (isFr
        ? 'Vous avez terminé <strong>' + count + ' module' + (count > 1 ? 's' : '') + '</strong> sur 21 (' + pct + '&nbsp;%). ' + keepGoing + '.'
        : 'You\'ve completed <strong>' + count + ' of 21 modules</strong> (' + pct + '%). ' + keepGoing + '.') +
      (continueModule
        ? ' <a href="' + modHref(continueModule) + '" style="color:#1565C0;font-weight:600">' +
          (isFr ? 'Continuer au module ' + continueModule + ' →' : 'Continue to Module ' + continueModule + ' →') + '</a>'
        : ''),
      null, null,
      '#e3f2fd',
      '#1565C0'
    );
  } else if (count < 11) {
    var pct2 = Math.round((count / MODULE_KEYS.length) * 100);
    var keepGoing2 = isFr
      ? 'Continuez' + nameSuffix()
      : 'Keep it up' + nameSuffix();
    content = buildBanner(
      '🏅',
      isFr ? 'Vous êtes à mi-chemin&nbsp;!' : "You're halfway there!",
      (greeting ? '<strong>' + escHtml(greeting) + '</strong><br>' : '') +
      (isFr
        ? '<strong>' + count + ' modules terminés</strong> sur 21 (' + pct2 + '&nbsp;%). ' + keepGoing2 + '.'
        : '<strong>' + count + ' of 21 modules completed</strong> (' + pct2 + '%). ' + keepGoing2 + '.') +
      (continueModule
        ? ' <a href="' + modHref(continueModule) + '" style="color:#6a1b9a;font-weight:600">' +
          (isFr ? 'Continuer au module ' + continueModule + ' →' : 'Continue to Module ' + continueModule + ' →') + '</a>'
        : ''),
      null, null,
      '#f3e5f5',
      '#6a1b9a'
    );
  } else if (count < MODULE_KEYS.length) {
    var pct3 = Math.round((count / MODULE_KEYS.length) * 100);
    var almostThere = isFr
      ? 'Plus que ' + (MODULE_KEYS.length - count) + ' à faire' + nameSuffix()
      : 'Almost done' + nameSuffix();
    content = buildBanner(
      '🌟',
      isFr ? 'Presque là&nbsp;!' : "Almost there!",
      (greeting ? '<strong>' + escHtml(greeting) + '</strong><br>' : '') +
      (isFr
        ? '<strong>' + count + ' modules terminés</strong> sur 21 (' + pct3 + '&nbsp;%). ' + almostThere + '.'
        : '<strong>' + count + ' of 21 modules completed</strong> (' + pct3 + '%). ' + almostThere + '.') +
      (continueModule
        ? ' <a href="' + modHref(continueModule) + '" style="color:#e65100;font-weight:600">' +
          (isFr ? 'Continuer au module ' + continueModule + ' →' : 'Continue to Module ' + continueModule + ' →') + '</a>'
        : ''),
      null, null,
      '#fff3e0',
      '#e65100'
    );
  } else {
    content = buildBanner(
      '🏆',
      isFr ? 'Félicitations&nbsp;! Tous les modules terminés.' : 'Congratulations! All modules complete.',
      (greeting ? '<strong>' + escHtml(greeting) + '</strong><br>' : '') +
      (isFr
        ? 'Vous avez terminé tous les 21 modules du Centre de confiance numérique. Vous êtes prêt·e à naviguer le monde numérique en toute confiance&nbsp;!'
        : 'You\'ve completed all 21 Digital Confidence Centre modules. You\'re ready to navigate the digital world with confidence!'),
      isFr ? 'Voir votre certificat →' : 'View Your Certificate →',
      'final-quiz.html',
      '#e8f5e9',
      '#1b5e20'
    );
  }

  panel.innerHTML = content;
  panel.style.display = count > 0 || true ? '' : 'none'; // always show

  // ── Add star ratings to module cards ────────────────────────────────────
  document.querySelectorAll('.module-card[data-module]').forEach(function (card) {
    var modId = card.getAttribute('data-module');
    var rating = parseInt(localStorage.getItem('dc-rating-' + modId) || '0', 10);
    if (rating > 0) {
      var existingStars = card.querySelector('.card-stars');
      if (!existingStars) {
        var stars = document.createElement('div');
        stars.className = 'card-stars';
        stars.setAttribute('aria-label', rating + ' of 5 stars');
        stars.style.cssText = 'font-size:0.85rem;color:#f5a623;margin-top:0.25rem;letter-spacing:0.05em';
        stars.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        var cardContent = card.querySelector('.card-content') || card;
        cardContent.appendChild(stars);
      }
    }
  });

  // ── Helpers ──────────────────────────────────────────────────────────────
  function buildBanner(icon, title, body, ctaLabel, ctaHref, bgColor, accentColor) {
    var cta = (ctaLabel && ctaHref)
      ? '<a href="' + ctaHref + '" class="dp-cta" style="background:' + accentColor + '">' + escHtml(ctaLabel) + '</a>'
      : '';
    return [
      '<div class="dp-banner" style="background:' + bgColor + ';border-color:' + accentColor + '">',
        '<div class="dp-icon">' + icon + '</div>',
        '<div class="dp-text">',
          '<strong class="dp-title" style="color:' + accentColor + '">' + title + '</strong>',
          '<p class="dp-body">' + body + '</p>',
          cta,
        '</div>',
      '</div>'
    ].join('');
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
