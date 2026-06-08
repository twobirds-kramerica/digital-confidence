/* badges.js — S-DCC-BADGES
 * LiveSchool-inspired: effort-based Confidence Badges.
 * Rewards TRYING (reading, starting) — not just correct answers.
 * Runs on module pages (tracking) and home page (display).
 * No login required. No server. Pure localStorage.
 */
(function () {
  'use strict';

  /* ── Badge definitions ──────────────────────────────────────────────────── */
  var BADGES = [
    {
      key:   'first-step',
      icon:  '🌱',
      name:  'First Step',
      desc:  'Read your first module',
      how:   'Keep reading any module to earn this.',
    },
    {
      key:   'quiz-hero',
      icon:  '🎯',
      name:  'Quiz Hero',
      desc:  'Completed your first quiz',
      how:   'Finish any module quiz to earn this.',
    },
    {
      key:   'safety-champ',
      icon:  '🛡️',
      name:  'Safety Champion',
      desc:  'Mastered the Security Shield module',
      how:   'Finish the quiz in Module 2 to earn this.',
    },
    {
      key:   'dedicated',
      icon:  '⭐',
      name:  'Dedicated Learner',
      desc:  'Completed 3 modules',
      how:   'Finish quizzes in 3 modules to earn this.',
    },
  ];

  /* ── Helpers ────────────────────────────────────────────────────────────── */
  function award(key) {
    try { localStorage.setItem('dc-badge-' + key, '1'); } catch (e) {}
  }

  function hasEarned(key) {
    try { return localStorage.getItem('dc-badge-' + key) === '1'; } catch (e) { return false; }
  }

  /* ── Check quiz-based badges ─────────────────────────────────────────────
   * dcc_quiz_results: { "module-1": { before: {...}, after: {...} }, ... }
   * A module is "quiz-complete" when results[key].after is truthy.
   * ───────────────────────────────────────────────────────────────────────── */
  function checkQuizBadges() {
    var results = {};
    try { results = JSON.parse(localStorage.getItem('dcc_quiz_results') || '{}'); } catch (e) {}

    var keys = Object.keys(results);
    var done = keys.filter(function (k) { return results[k] && results[k].after; });

    if (done.length >= 1) award('quiz-hero');
    if (done.length >= 3) award('dedicated');

    /* Safety Champion: Module 2 quiz completed */
    var mod2 = keys.filter(function (k) { return k.indexOf('module-2') >= 0 || k === '2'; });
    if (mod2.some(function (k) { return results[k] && results[k].after; })) {
      award('safety-champ');
    }
  }

  /* ── First Step badge: awarded at 50% scroll on any module page ─────────── */
  function watchFirstStep() {
    if (hasEarned('first-step')) return;
    function check() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollable > 0 && (scrollTop / scrollable) >= 0.5) {
        award('first-step');
        window.removeEventListener('scroll', check);
      }
    }
    window.addEventListener('scroll', check, { passive: true });
  }

  /* ── Badge shelf CSS ─────────────────────────────────────────────────────── */
  function injectCSS() {
    var css = [
      '.badge-shelf {',
      '  margin: var(--space-6, 24px) 0;',
      '}',
      '.badge-shelf-title {',
      '  font-family: var(--font-heading, sans-serif);',
      '  font-size: var(--font-size-sm, 16px);',
      '  font-weight: var(--font-weight-semibold, 600);',
      '  color: var(--color-text-light, #7A6E62);',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.05em;',
      '  margin: 0 0 var(--space-3, 12px);',
      '}',
      '.badge-shelf-grid {',
      '  display: flex;',
      '  flex-wrap: wrap;',
      '  gap: var(--space-3, 12px);',
      '}',
      '.badge-item {',
      '  display: flex;',
      '  flex-direction: column;',
      '  align-items: center;',
      '  gap: var(--space-1, 4px);',
      '  padding: var(--space-4, 16px) var(--space-3, 12px);',
      '  background: var(--color-surface, #fff);',
      '  border: 2px solid var(--color-border, #E8DDD0);',
      '  border-radius: var(--radius-lg, 12px);',
      '  text-align: center;',
      '  min-width: 100px;',
      '  flex: 1;',
      '  max-width: 140px;',
      '  transition: border-color 0.2s;',
      '}',
      '.badge-item.badge-earned {',
      '  border-color: var(--color-primary, #2A7B6F);',
      '  background: var(--color-primary-light, #E8F5F0);',
      '}',
      '.badge-item.badge-locked {',
      '  opacity: 0.5;',
      '  filter: grayscale(1);',
      '}',
      '.badge-icon {',
      '  font-size: 2rem;',
      '  line-height: 1;',
      '  user-select: none;',
      '}',
      '.badge-name {',
      '  font-family: var(--font-heading, sans-serif);',
      '  font-weight: var(--font-weight-semibold, 600);',
      '  font-size: 13px;',
      '  color: var(--color-text, #3D3229);',
      '}',
      '.badge-desc {',
      '  font-size: 11px;',
      '  color: var(--color-text-light, #7A6E62);',
      '  line-height: 1.3;',
      '}',
      '[data-theme="dark"] .badge-item {',
      '  background: var(--color-surface, #2A2520);',
      '  border-color: var(--color-border, #3A322A);',
      '}',
      '[data-theme="dark"] .badge-item.badge-earned {',
      '  background: var(--color-primary-light, #1F3C36);',
      '}',
      /* Responsive: 2 per row on very small screens */
      '@media (max-width: 480px) {',
      '  .badge-item { min-width: calc(50% - var(--space-3, 12px)); max-width: none; }',
      '}',
    ].join('\n');

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  /* ── Build and inject the badge shelf into the home page ─────────────────── */
  function buildBadgeShelf(container) {
    var shelf = document.createElement('div');
    shelf.className = 'badge-shelf';
    shelf.id = 'dc-badge-shelf';

    var title = document.createElement('p');
    title.className = 'badge-shelf-title';
    title.textContent = 'Your Achievements';
    shelf.appendChild(title);

    var grid = document.createElement('div');
    grid.className = 'badge-shelf-grid';
    grid.setAttribute('role', 'list');

    BADGES.forEach(function (b) {
      var earned = hasEarned(b.key);
      var item = document.createElement('div');
      item.className = 'badge-item ' + (earned ? 'badge-earned' : 'badge-locked');
      item.setAttribute('role', 'listitem');
      item.setAttribute('aria-label', b.name + (earned ? ' — earned' : ' — not yet earned'));
      item.setAttribute('title', earned ? b.desc : b.how);

      var icon = document.createElement('span');
      icon.className = 'badge-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = b.icon;

      var name = document.createElement('span');
      name.className = 'badge-name';
      name.textContent = b.name;

      var desc = document.createElement('span');
      desc.className = 'badge-desc';
      desc.textContent = earned ? b.desc : 'Not yet earned';

      item.appendChild(icon);
      item.appendChild(name);
      item.appendChild(desc);
      grid.appendChild(item);
    });

    shelf.appendChild(grid);
    container.insertAdjacentElement('afterend', shelf);
  }

  /* ── Boot ───────────────────────────────────────────────────────────────── */
  checkQuizBadges();

  var isModulePage = !!document.querySelector('.main-content') && !document.querySelector('.module-grid');
  var isHomePage   = !!document.querySelector('.module-grid');

  if (isModulePage) {
    watchFirstStep();
  }

  if (isHomePage) {
    injectCSS();
    document.addEventListener('DOMContentLoaded', function () {
      var progressOverview = document.querySelector('.progress-overview');
      if (progressOverview) {
        buildBadgeShelf(progressOverview);
      }
    });
  }
}());
