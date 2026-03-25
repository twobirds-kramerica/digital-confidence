/* ============================================
   Digital Confidence Centre
   Content Freshness Badge Injector (Phase 8A + 8C)
   ============================================ */

(function () {
  'use strict';

  /* ── Helpers ── */

  function formatMonthYear(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleString('en-CA', { month: 'long', year: 'numeric' });
  }

  function daysSince(dateStr) {
    var verified = new Date(dateStr + 'T00:00:00');
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.floor((now - verified) / (1000 * 60 * 60 * 24));
  }

  function buildBadge(dateStr) {
    var days = daysSince(dateStr);
    var label = formatMonthYear(dateStr);
    var span = document.createElement('span');
    span.className = 'dc-freshness-badge';

    if (days <= 60) {
      span.classList.add('dc-badge-verified');
      span.textContent = '\u2705 Verified ' + label;
    } else if (days <= 90) {
      span.classList.add('dc-badge-aging');
      span.textContent = '\ud83d\udd04 Last verified ' + label;
    } else {
      span.classList.add('dc-badge-stale');
      span.textContent = '\u26a0\ufe0f Review needed \u2014 last verified ' + label;
    }

    return span;
  }

  /* ── Detect current module from URL ── */

  function getCurrentModuleId() {
    var filename = window.location.pathname.split('/').pop() || '';
    // Strip .html extension
    var base = filename.replace(/\.html$/i, '');
    return base || null;
  }

  /* ── Inject section badges ── */

  function injectSectionBadges(moduleData) {
    var sections = moduleData.sections || {};
    Object.keys(sections).forEach(function (sectionId) {
      var section = sections[sectionId];
      if (!section.verified) { return; }

      var target = document.querySelector('[data-freshness-id="' + sectionId + '"]');
      if (!target) { return; }

      var badge = buildBadge(section.verified);
      target.insertAdjacentElement('afterend', badge);
    });
  }

  /* ── Inject full-review badge near the page H1 ── */

  function injectFullReviewBadge(moduleData) {
    var reviewDate = moduleData.lastFullReview;
    if (!reviewDate) { return; }

    var h1 = document.querySelector('main h1, .module-content h1, .content h1, h1');
    if (!h1) { return; }

    var days = daysSince(reviewDate);
    var label = formatMonthYear(reviewDate);
    var span = document.createElement('span');
    span.className = 'dc-freshness-badge dc-badge-verified';
    span.textContent = '\u2705 Full review: ' + label;

    // Stale override for the full-review badge
    if (days > 90) {
      span.className = 'dc-freshness-badge dc-badge-stale';
      span.textContent = '\u26a0\ufe0f Review needed \u2014 last verified ' + label;
    } else if (days > 60) {
      span.className = 'dc-freshness-badge dc-badge-aging';
      span.textContent = '\ud83d\udd04 Full review: ' + label;
    }

    h1.appendChild(span);
  }

  /* ── Phase 8C: Mark homepage module cards as recently updated ── */

  function markUpdatedCards(modulesData) {
    var cards = document.querySelectorAll('[data-module-id]');
    if (!cards.length) { return; }

    cards.forEach(function (card) {
      var moduleId = card.getAttribute('data-module-id');
      var moduleData = modulesData[moduleId];
      if (!moduleData || !moduleData.lastFullReview) { return; }

      var days = daysSince(moduleData.lastFullReview);
      if (days <= 30) {
        card.classList.add('badge-updated');
      }
    });
  }

  /* ── Main entry point ── */

  function init() {
    var moduleId = getCurrentModuleId();

    fetch('/_data/content-dates.json')
      .then(function (response) {
        if (!response.ok) { return null; }
        return response.json();
      })
      .then(function (data) {
        if (!data || !data.modules) { return; }

        // Phase 8C — homepage card badges (runs on any page that has [data-module-id] cards)
        markUpdatedCards(data.modules);

        // Section and full-review badges — only on module pages
        if (!moduleId || !data.modules[moduleId]) { return; }

        var moduleData = data.modules[moduleId];
        injectFullReviewBadge(moduleData);
        injectSectionBadges(moduleData);
      })
      .catch(function () {
        // Silent fail — never surface errors to users
      });
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
