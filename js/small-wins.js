/* small-wins.js — S-DCC-SMALL-WINS
 * Duolingo-inspired: thin reading progress bar that fills as Brenda scrolls.
 * Session-scoped — resets on page reload. No login required. No dependencies.
 * Turns green at 95% to celebrate persistence, not just completion.
 */
(function () {
  'use strict';

  /* ── Inject component CSS ───────────────────────────────────────────────── */
  var css = [
    /* Reading progress bar — top of viewport, above all nav */
    '.dc-wins-bar {',
    '  position: fixed;',
    '  top: 0;',
    '  left: 0;',
    '  right: 0;',
    '  height: 4px;',
    '  z-index: 1000;',
    '  background: var(--color-border, #E8DDD0);',
    '  pointer-events: none;',
    '}',

    '.dc-wins-fill {',
    '  height: 100%;',
    '  width: 0%;',
    '  background: var(--color-primary, #2A7B6F);',
    '  transition: width 0.25s ease-out;',
    '}',

    /* Celebrate persistence when near the end */
    '.dc-wins-bar.dc-wins-done .dc-wins-fill {',
    '  background: var(--color-success, #4CAF50);',
    '}',

    /* Subtle pulse on completion */
    '@keyframes dc-wins-pulse {',
    '  0%   { opacity: 1; }',
    '  50%  { opacity: 0.6; }',
    '  100% { opacity: 1; }',
    '}',
    '.dc-wins-bar.dc-wins-done .dc-wins-fill {',
    '  animation: dc-wins-pulse 1.2s ease-in-out 1;',
    '}',
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Create bar ─────────────────────────────────────────────────────────── */
  var bar = document.createElement('div');
  bar.className = 'dc-wins-bar';
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-label', 'Reading progress');
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', '100');
  bar.setAttribute('aria-valuenow', '0');

  var fill = document.createElement('div');
  fill.className = 'dc-wins-fill';
  bar.appendChild(fill);

  /* Insert as first child of body so it paints above everything */
  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertBefore(bar, document.body.firstChild);
  });

  /* ── Update progress on scroll ──────────────────────────────────────────── */
  var celebrated = false;

  function update() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = scrollable > 0 ? Math.round((scrollTop / scrollable) * 100) : 0;
    pct = Math.min(100, Math.max(0, pct));

    fill.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', pct);

    if (pct >= 95 && !celebrated) {
      celebrated = true;
      bar.classList.add('dc-wins-done');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
}());
