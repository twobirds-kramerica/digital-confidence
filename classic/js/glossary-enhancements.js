/* ============================================
   Glossary Page Enhancements
   Term of the Day, Print button
   Works with static .gloss-card HTML structure
   ============================================ */

(function () {
  'use strict';

  function getLang() {
    try {
      var l = document.documentElement.getAttribute('data-lang') ||
              localStorage.getItem('dc-lang') || navigator.language || 'en';
      return l.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    } catch (e) { return 'en'; }
  }

  /* ── Day-seeded random index ── */
  function todayIndex(max) {
    var now = new Date();
    var seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    var r = ((seed * 1664525 + 1013904223) & 0x7fffffff) >>> 0;
    return r % max;
  }

  /* ── Term of the Day ── */
  function buildTermOfDay(insertBefore) {
    var cards = Array.from(document.querySelectorAll('.gloss-card'));
    if (cards.length === 0) return;

    var lang    = getLang();
    var idx     = todayIndex(cards.length);
    var card    = cards[idx];
    var termEl  = card.querySelector('.gloss-term');
    var defEl   = card.querySelector('.gloss-def');
    var tagEl   = card.querySelector('.gloss-category-tag');
    if (!termEl || !defEl) return;

    var firstLetter = (termEl.textContent || '').trim().charAt(0).toUpperCase();

    var heading   = lang === 'fr' ? '📖 Terme du jour'   : '📖 Term of the Day';
    var subLabel  = lang === 'fr' ? 'Revenez demain pour un nouveau terme.' : 'Come back tomorrow for a new term.';
    var jumpLabel = lang === 'fr' ? 'Voir dans la liste ↓' : 'See in the list ↓';
    var closeLabel= lang === 'fr' ? 'Fermer' : 'Dismiss';

    var tagHTML = '';
    if (tagEl) {
      tagHTML = '<span class="gloss-category-tag ' +
        tagEl.className.replace('gloss-category-tag', '').trim() + '">' +
        escHTML(tagEl.textContent) + '</span>';
    }

    var box = document.createElement('div');
    box.className = 'gloss-totd';
    box.setAttribute('role', 'complementary');
    box.setAttribute('aria-label', heading);
    box.innerHTML =
      '<div class="gloss-totd-header">' +
        '<span class="gloss-totd-label">' + heading + '</span>' +
        '<button class="gloss-totd-close" aria-label="' + closeLabel + '">✕ ' + closeLabel + '</button>' +
      '</div>' +
      '<div class="gloss-totd-term">' + escHTML(termEl.textContent) + '</div>' +
      tagHTML +
      '<p class="gloss-totd-def">' + escHTML(defEl.textContent) + '</p>' +
      '<div class="gloss-totd-footer">' +
        '<span class="gloss-totd-sub">' + subLabel + '</span>' +
        '<a href="#gloss-' + firstLetter + '" class="gloss-totd-jump">' + jumpLabel + '</a>' +
      '</div>';

    insertBefore.parentNode.insertBefore(box, insertBefore);

    box.querySelector('.gloss-totd-close').addEventListener('click', function () {
      box.style.display = 'none';
    });
  }

  /* ── Print button ── */
  function buildPrintButton(insertAfterNav) {
    var lang  = getLang();
    var label = lang === 'fr' ? '🖨 Imprimer le glossaire' : '🖨 Print Glossary';

    var wrap = document.createElement('div');
    wrap.className = 'gloss-print-wrap';

    var btn = document.createElement('button');
    btn.className = 'gloss-print-btn';
    btn.textContent = label;
    btn.addEventListener('click', function () { window.print(); });

    wrap.appendChild(btn);
    insertAfterNav.parentNode.insertBefore(wrap, insertAfterNav.nextSibling);
  }

  /* ── Escape HTML ── */
  function escHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var searchWrap = document.querySelector('.gloss-search-wrap');
    var alphNav    = document.querySelector('.gloss-alpha-nav');

    if (searchWrap) buildTermOfDay(searchWrap);
    if (alphNav)    buildPrintButton(alphNav);
  });

})();
