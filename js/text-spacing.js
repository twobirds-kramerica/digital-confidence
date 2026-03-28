/**
 * text-spacing.js
 * Increased text spacing mode — standalone module.
 * Applies class 'text-spacing' to <body>. Styles live in css/accessibility.css.
 * Increases letter-spacing, word-spacing, and line-height for improved readability.
 *
 * Usage: include this script on any page.
 * Wire toggle to elements with class 'text-spacing-btn'.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'dc-text-spacing';

  function isOn() {
    return document.body.classList.contains('text-spacing');
  }

  function enable() {
    document.body.classList.add('text-spacing');
    localStorage.setItem(STORAGE_KEY, 'true');
    updateButtons(true);
    announce('Text spacing increased');
  }

  function disable() {
    document.body.classList.remove('text-spacing');
    localStorage.setItem(STORAGE_KEY, 'false');
    updateButtons(false);
    announce('Text spacing normal');
  }

  function toggle() {
    if (isOn()) { disable(); } else { enable(); }
  }

  function updateButtons(on) {
    document.querySelectorAll('.text-spacing-btn').forEach(function (btn) {
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function announce(msg) {
    var el = document.getElementById('a11y-announcer');
    if (el) { el.textContent = msg; }
  }

  // Restore on load
  (function restoreEarly() {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.classList.add('text-spacing');
      });
    }
  }());

  document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      document.body.classList.add('text-spacing');
    }
    updateButtons(isOn());
    document.querySelectorAll('.text-spacing-btn').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
  });

  window.DCC_TextSpacing = { enable: enable, disable: disable, toggle: toggle, isOn: isOn };

}());
