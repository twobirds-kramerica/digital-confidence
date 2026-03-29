/* ============================================================
   homepage-freshness.js
   Phase 2B: Review badges on module cards
   Phase 2E: "This week's tip" featured card
   Runs on homepage only. Reads data/content-dates.json and
   data/tips-index.json.
   ============================================================ */

(function () {
  'use strict';

  /* ── Helpers ── */

  function monthsAgo(yyyyMM) {
    var parts = yyyyMM.split('-');
    var year  = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var now   = new Date();
    return (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  }

  function isFr() {
    return (document.documentElement.getAttribute('data-lang') || 'en') === 'fr';
  }

  /* ── Phase 2B: Review badges on module cards ── */

  function injectReviewBadges(modules) {
    var cards = document.querySelectorAll('.module-card[data-module]');
    cards.forEach(function (card) {
      var num = card.getAttribute('data-module');
      /* Build the key — match content-dates.json keys */
      var keys = [
        'module-' + num,
        'module-' + num + '-staying-connected',
        'module-' + num + '-digital-legacy',
        'module-' + num + '-travel-safety',
        'module-' + num + '-ai-research'
      ];

      var data = null;
      keys.forEach(function (k) {
        if (!data && modules[k]) data = modules[k];
      });

      /* Also try exact filename-derived key */
      var href = card.getAttribute('href') || '';
      var fileKey = href.replace('.html', '').replace(/^.*\//, '');
      if (!data && modules[fileKey]) data = modules[fileKey];

      if (!data || !data.lastReviewed) return;

      var ago = monthsAgo(data.lastReviewed);
      var badge = document.createElement('span');
      badge.className = 'dc-review-badge';

      if (ago <= 6) {
        badge.style.cssText = 'display:inline-block;background:#E8F5E9;color:#1B5E20;border:1px solid #A5D6A7;border-radius:12px;font-size:0.7rem;font-weight:600;padding:2px 8px;margin-top:4px;';
        badge.textContent = isFr() ? '\u2705 R\u00e9vis\u00e9 : ' + data.lastReviewed : '\u2705 Reviewed: ' + data.lastReviewed;
      } else if (ago <= 12) {
        badge.style.cssText = 'display:inline-block;background:#FFFDE7;color:#F57F17;border:1px solid #FFF176;border-radius:12px;font-size:0.7rem;font-weight:600;padding:2px 8px;margin-top:4px;';
        badge.textContent = isFr() ? '\ud83d\udd04 R\u00e9vis\u00e9 : ' + data.lastReviewed : '\ud83d\udd04 Reviewed: ' + data.lastReviewed;
      } else {
        badge.style.cssText = 'display:inline-block;background:#FFF3E0;color:#E65100;border:1px solid #FFCC80;border-radius:12px;font-size:0.7rem;font-weight:600;padding:2px 8px;margin-top:4px;';
        badge.textContent = isFr() ? '\u26a0\ufe0f \u00c0 mettre \u00e0 jour : ' + data.lastReviewed : '\u26a0\ufe0f Needs update: ' + data.lastReviewed;
      }

      var content = card.querySelector('.card-content');
      if (content) {
        content.appendChild(badge);
      }
    });
  }

  /* ── Phase 2E: Weekly tip card ── */

  function injectWeeklyTip(tips) {
    if (!tips || !tips.length) return;

    /* Find slot */
    var slot = document.getElementById('weekly-tip-slot');
    if (!slot) return;

    /* Sort by date descending — most recent first */
    var sorted = tips.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });

    var tip = sorted[0];
    var fr = isFr();

    var card = document.createElement('div');
    card.style.cssText = [
      'background:#E3F2FD',
      'border:1px solid #90CAF9',
      'border-left:6px solid #1565C0',
      'border-radius:8px',
      'padding:1.25rem 1.5rem',
      'margin:2rem 0'
    ].join(';');

    card.innerHTML =
      '<p style="font-size:0.78rem;font-weight:700;color:#1565C0;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 0.35rem;">' +
        (fr ? 'Cette semaine :' : 'This week:') +
      '</p>' +
      '<h3 style="margin:0 0 0.5rem;font-size:1.05rem;color:#0D47A1;">' +
        escHtml(tip.title) +
      '</h3>' +
      '<p style="margin:0 0 0.75rem;font-size:0.9rem;color:#333;">' +
        escHtml(tip.summary) +
      '</p>' +
      '<a href="tips/' + escAttr(tip.slug) + '.html" style="display:inline-block;background:#1565C0;color:#fff;padding:0.45rem 1rem;border-radius:6px;font-size:0.88rem;font-weight:600;text-decoration:none;">' +
        (fr ? 'Lire l\'article \u2192' : 'Read the tip \u2192') +
      '</a>' +
      '<span style="float:right;font-size:0.75rem;color:#5A6E84;padding-top:0.6rem;">' +
        (fr ? 'Catégorie : ' : 'Category: ') + escHtml(tip.category) +
      '</span>';

    slot.appendChild(card);
  }

  function escHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escAttr(s) {
    return String(s || '').replace(/[^a-z0-9\-]/gi, '');
  }

  /* ── Init ── */

  function init() {
    /* Phase 2B: fetch content-dates.json and inject review badges */
    fetch('data/content-dates.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.modules) injectReviewBadges(d.modules);
      })
      .catch(function () {});

    /* Phase 2E: fetch tips-index.json and inject weekly tip card */
    fetch('data/tips-index.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.tips) injectWeeklyTip(d.tips);
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
