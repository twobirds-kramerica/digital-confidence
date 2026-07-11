/**
 * high-contrast.js
 * High contrast mode toggle — standalone module.
 * Applies class 'high-contrast' to <html>. Styles live in css/accessibility.css.
 *
 * Usage: include this script on any page.
 * Wire toggle to elements with class 'high-contrast-btn'.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'dc-high-contrast';

  function isOn() {
    return document.documentElement.classList.contains('high-contrast');
  }

  function enable() {
    document.documentElement.classList.add('high-contrast');
    localStorage.setItem(STORAGE_KEY, 'true');
    updateButtons(true);
    announce('High contrast on');
  }

  function disable() {
    document.documentElement.classList.remove('high-contrast');
    localStorage.setItem(STORAGE_KEY, 'false');
    updateButtons(false);
    announce('High contrast off');
  }

  function toggle() {
    if (isOn()) { disable(); } else { enable(); }
  }

  function updateButtons(on) {
    document.querySelectorAll('.high-contrast-btn').forEach(function (btn) {
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function announce(msg) {
    var el = document.getElementById('a11y-announcer');
    if (el) { el.textContent = msg; }
  }

  // Restore on page load — applied early so no flash
  (function restoreEarly() {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      document.documentElement.classList.add('high-contrast');
    }
  }());

  document.addEventListener('DOMContentLoaded', function () {
    updateButtons(isOn());
    document.querySelectorAll('.high-contrast-btn').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
  });

  window.DCC_HighContrast = { enable: enable, disable: disable, toggle: toggle, isOn: isOn };

}());
