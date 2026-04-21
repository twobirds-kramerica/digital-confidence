/* ============================================================
   DCC — Keyboard shortcut helper (S-030)
   Press "?" anywhere (except inside text input/textarea/select/
   contenteditable) to open a modal listing available shortcuts.
   Escape closes. Focus is trapped while open.
   ============================================================ */

(function () {
  'use strict';

  var SHORTCUTS = [
    { keys: ['?'],              label: 'Open this shortcut list' },
    { keys: ['Esc'],            label: 'Close dialogs / return to content' },
    { keys: ['Tab'],            label: 'Move to next focusable element' },
    { keys: ['Shift', 'Tab'],   label: 'Move to previous focusable element' },
    { keys: ['Enter'],          label: 'Activate the focused button or link' },
    { keys: ['Space'],          label: 'Scroll down one screen' },
    { keys: ['Shift', 'Space'], label: 'Scroll up one screen' },
    { keys: ['/'],              label: 'Jump to the site search box' },
    { keys: ['Home'],           label: 'Jump to the top of the page' },
    { keys: ['End'],            label: 'Jump to the bottom of the page' }
  ];

  var dialog;
  var lastFocus;

  function init() {
    buildDialog();
    document.addEventListener('keydown', onKey, true);
  }

  function buildDialog() {
    if (document.getElementById('dcc-kbd-help')) return;

    dialog = document.createElement('div');
    dialog.id = 'dcc-kbd-help';
    dialog.className = 'kbd-help';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'dcc-kbd-help-title');
    dialog.setAttribute('hidden', '');

    var inner = document.createElement('div');
    inner.className = 'kbd-help__panel';

    var title = document.createElement('h2');
    title.id = 'dcc-kbd-help-title';
    title.className = 'kbd-help__title';
    title.textContent = 'Keyboard shortcuts';

    var intro = document.createElement('p');
    intro.className = 'kbd-help__intro';
    intro.textContent = 'Press Escape to close this window.';

    var list = document.createElement('dl');
    list.className = 'kbd-help__list';

    SHORTCUTS.forEach(function (sc) {
      var dt = document.createElement('dt');
      sc.keys.forEach(function (k, idx) {
        if (idx > 0) {
          var plus = document.createElement('span');
          plus.className = 'kbd-help__plus';
          plus.textContent = '+';
          dt.appendChild(plus);
        }
        var kbd = document.createElement('kbd');
        kbd.className = 'kbd-help__key';
        kbd.textContent = k;
        dt.appendChild(kbd);
      });
      var dd = document.createElement('dd');
      dd.textContent = sc.label;
      list.appendChild(dt);
      list.appendChild(dd);
    });

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'kbd-help__close';
    close.setAttribute('aria-label', 'Close keyboard shortcuts');
    close.textContent = 'Close';
    close.addEventListener('click', closeDialog);

    inner.appendChild(title);
    inner.appendChild(intro);
    inner.appendChild(list);
    inner.appendChild(close);
    dialog.appendChild(inner);

    /* Click outside panel closes. */
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) closeDialog();
    });

    document.body.appendChild(dialog);
  }

  function openDialog() {
    if (!dialog || !dialog.hasAttribute('hidden')) return;
    lastFocus = document.activeElement;
    dialog.removeAttribute('hidden');
    /* Focus the close button so Escape / Enter work immediately. */
    var close = dialog.querySelector('.kbd-help__close');
    if (close) close.focus();
  }

  function closeDialog() {
    if (!dialog || dialog.hasAttribute('hidden')) return;
    dialog.setAttribute('hidden', '');
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  function isTyping(el) {
    if (!el) return false;
    var tag = (el.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
    if (el.isContentEditable) return true;
    return false;
  }

  function onKey(e) {
    /* "?" — open. On US/UK keyboards this is Shift+/ but the resulting
       e.key is already "?" so we don't need to test modifiers. */
    if (e.key === '?' && !isTyping(e.target)) {
      e.preventDefault();
      openDialog();
      return;
    }

    /* Dialog is open — handle Esc + focus trap. */
    if (dialog && !dialog.hasAttribute('hidden')) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDialog();
        return;
      }
      if (e.key === 'Tab') {
        trapFocus(e);
      }
    }
  }

  function trapFocus(e) {
    var focusables = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    var first = focusables[0];
    var last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
