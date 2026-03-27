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

  var TOTAL_MODULES = 15;
  var isFr = (localStorage.getItem('dc-lang') || navigator.language || 'en').startsWith('fr');

  // ── Count completed modules ─────────────────────────────────────────────
  var completed = [];
  for (var i = 1; i <= TOTAL_MODULES; i++) {
    if (localStorage.getItem('dc-module-' + i + '-complete') === 'true') {
      completed.push(i);
    }
  }
  var count = completed.length;
  var userName = (localStorage.getItem('dc-user-name') || '').trim();

  // ── Find the "continue where you left off" module ───────────────────────
  var continueModule = null;
  for (var m = 1; m <= TOTAL_MODULES; m++) {
    if (localStorage.getItem('dc-module-' + m + '-complete') !== 'true') {
      continueModule = m;
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

  if (count === 0) {
    content = buildBanner(
      '🌱',
      isFr ? 'Commençons ensemble' : "Let's get started",
      (greeting ? '<strong>' + escHtml(greeting) + '</strong><br>' : '') +
      (isFr
        ? 'Vous n\'avez pas encore commencé de module. Essayez le premier&nbsp;— il prend environ 10 minutes.'
        : "You haven't started any modules yet. Try the first one — it takes about 10 minutes."),
      isFr ? 'Commencer le module 1 →' : 'Start Module 1 →',
      'module-1.html',
      '#e8f5e9',
      '#2e7d32'
    );
  } else if (count < 6) {
    var pct = Math.round((count / TOTAL_MODULES) * 100);
    content = buildBanner(
      '🚀',
      isFr ? 'Vous progressez bien&nbsp;!' : "You're making progress!",
      (greeting ? '<strong>' + escHtml(greeting) + '</strong><br>' : '') +
      (isFr
        ? 'Vous avez terminé <strong>' + count + ' module' + (count > 1 ? 's' : '') + '</strong> sur ' + TOTAL_MODULES + ' (' + pct + '&nbsp;%).'
        : 'You\'ve completed <strong>' + count + ' module' + (count > 1 ? 's' : '') + '</strong> out of ' + TOTAL_MODULES + ' (' + pct + '%).') +
      (continueModule
        ? ' <a href="module-' + continueModule + '.html" style="color:#1565C0;font-weight:600">' +
          (isFr ? 'Continuer au module ' + continueModule + ' →' : 'Continue to Module ' + continueModule + ' →') + '</a>'
        : ''),
      null, null,
      '#e3f2fd',
      '#1565C0'
    );
  } else if (count < 11) {
    var pct2 = Math.round((count / TOTAL_MODULES) * 100);
    content = buildBanner(
      '🏅',
      isFr ? 'Vous êtes à mi-chemin&nbsp;!' : "You're halfway there!",
      (greeting ? '<strong>' + escHtml(greeting) + '</strong><br>' : '') +
      (isFr
        ? '<strong>' + count + ' modules terminés</strong> sur ' + TOTAL_MODULES + ' (' + pct2 + '&nbsp;%). Continuez comme ça&nbsp;!'
        : '<strong>' + count + ' modules completed</strong> out of ' + TOTAL_MODULES + ' (' + pct2 + '%). Keep it up!') +
      (continueModule
        ? ' <a href="module-' + continueModule + '.html" style="color:#6a1b9a;font-weight:600">' +
          (isFr ? 'Continuer au module ' + continueModule + ' →' : 'Continue to Module ' + continueModule + ' →') + '</a>'
        : ''),
      null, null,
      '#f3e5f5',
      '#6a1b9a'
    );
  } else if (count < TOTAL_MODULES) {
    var pct3 = Math.round((count / TOTAL_MODULES) * 100);
    content = buildBanner(
      '🌟',
      isFr ? 'Presque là&nbsp;!' : "Almost there!",
      (greeting ? '<strong>' + escHtml(greeting) + '</strong><br>' : '') +
      (isFr
        ? '<strong>' + count + ' modules terminés</strong> sur ' + TOTAL_MODULES + ' (' + pct3 + '&nbsp;%). Plus que ' + (TOTAL_MODULES - count) + ' à faire&nbsp;!'
        : '<strong>' + count + ' modules completed</strong> out of ' + TOTAL_MODULES + ' (' + pct3 + '%). Only ' + (TOTAL_MODULES - count) + ' left!') +
      (continueModule
        ? ' <a href="module-' + continueModule + '.html" style="color:#e65100;font-weight:600">' +
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
        ? 'Vous avez terminé tous les ' + TOTAL_MODULES + ' modules du Centre de confiance numérique. Vous êtes prêt·e à naviguer le monde numérique en toute confiance&nbsp;!'
        : 'You\'ve completed all ' + TOTAL_MODULES + ' Digital Confidence Centre modules. You\'re ready to navigate the digital world with confidence!'),
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
