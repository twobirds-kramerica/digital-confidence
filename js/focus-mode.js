/* focus-mode.js — S-DCC-FOCUS-MODE
 * Thinkific-inspired: hides sidebar + nav bars during module reading.
 * No dependencies. Self-installs CSS and toggle button.
 * localStorage key: dc-focus-mode ('1' = on, '0' / absent = off)
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'dc-focus-mode';
  var BTN_ID = 'dc-focus-btn';

  /* ── Inject component CSS ───────────────────────────────────────────────── */
  var css = [
    /* Focus mode: hide nav surfaces */
    'body.dc-focus-mode .sidebar,',
    'body.dc-focus-mode .top-bar,',
    'body.dc-focus-mode .accessibility-bar,',
    'body.dc-focus-mode .sidebar-overlay { display: none !important; }',

    /* Toggle button — inline in document flow by default */
    '.dc-focus-btn {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: 6px;',
    '  min-height: 44px;',
    '  padding: 8px 16px;',
    '  margin: 8px 0 20px auto;',  /* right-aligns inside a flex parent */
    '  background: var(--color-surface, #fff);',
    '  color: var(--color-text, #3D3229);',
    '  border: 1.5px solid var(--color-border, #E8DDD0);',
    '  border-radius: var(--radius-md, 8px);',
    '  font-family: var(--font-heading, sans-serif);',
    '  font-size: 14px;',
    '  font-weight: 600;',
    '  cursor: pointer;',
    '  transition: background 0.15s, border-color 0.15s;',
    '  width: fit-content;',
    '}',

    /* Button is always visible — fixed in top-right corner in focus mode */
    'body.dc-focus-mode .dc-focus-btn {',
    '  position: fixed;',
    '  top: 16px;',
    '  right: 16px;',
    '  z-index: 500;',
    '  box-shadow: 0 2px 12px rgba(0,0,0,0.12);',
    '  margin: 0;',
    '}',

    '.dc-focus-btn:hover {',
    '  background: var(--color-primary-light, #E8F5F0);',
    '  border-color: var(--color-primary, #2A7B6F);',
    '}',

    '.dc-focus-btn:focus-visible {',
    '  outline: 3px solid var(--color-accent, #E8842C);',
    '  outline-offset: 2px;',
    '}',

    '[data-theme="dark"] .dc-focus-btn {',
    '  background: var(--color-surface, #2A2520);',
    '  color: var(--color-text, #F2E9DC);',
    '  border-color: var(--color-border, #3A322A);',
    '}',
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Create button ──────────────────────────────────────────────────────── */
  function buildButton() {
    var btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.className = 'dc-focus-btn';
    btn.type = 'button';
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Enable Focus Mode — hides navigation while you read');
    btn.innerHTML = '<span aria-hidden="true">&#8857;</span><span class="dc-focus-label">Focus Mode</span>';
    return btn;
  }

  /* ── Apply / remove focus state ─────────────────────────────────────────── */
  function applyState(on) {
    document.body.classList.toggle('dc-focus-mode', on);
    var btn = document.getElementById(BTN_ID);
    if (!btn) return;
    var label = btn.querySelector('.dc-focus-label');
    if (on) {
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('aria-label', 'Exit Focus Mode — restore navigation');
      if (label) label.textContent = 'Exit Focus Mode';
    } else {
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Enable Focus Mode — hides navigation while you read');
      if (label) label.textContent = 'Focus Mode';
    }
    try { localStorage.setItem(STORAGE_KEY, on ? '1' : '0'); } catch (e) {}
  }

  /* ── Boot ───────────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var main = document.getElementById('main');
    if (!main) return;

    /* Wrap h1 + button in a flex row so the button right-aligns */
    var h1 = main.querySelector('h1');
    if (!h1) return;

    var btn = buildButton();

    /* Insert button before h1 so it appears at the top of the content area.
       Use the h1's real parent — on some modules the h1 is nested inside a
       wrapper div, and main.insertBefore() throws NotFoundError there. */
    h1.parentNode.insertBefore(btn, h1);

    /* Restore saved state */
    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === '1') applyState(true);

    btn.addEventListener('click', function () {
      applyState(!document.body.classList.contains('dc-focus-mode'));
    });
  });
}());
