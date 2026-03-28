/**
 * reading-guide.js
 * Enhanced reading guide — follows cursor with a horizontal highlight bar.
 * Standalone module. Pairs with css/accessibility.css .reading-guide styles.
 *
 * Usage: include this script on any module page.
 * The toggle is wired to elements with class 'reading-guide-btn'.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'dc-reading-guide';
  var isActive = false;
  var bar = null;

  function createBar() {
    if (bar) return;
    bar = document.createElement('div');
    bar.id = 'reading-guide-bar';
    bar.setAttribute('aria-hidden', 'true');
    bar.style.cssText = [
      'position:fixed',
      'left:0',
      'width:100%',
      'height:2.5em',
      'background:rgba(255,242,102,0.35)',
      'border-top:2px solid rgba(180,150,0,0.4)',
      'border-bottom:2px solid rgba(180,150,0,0.4)',
      'pointer-events:none',
      'z-index:9000',
      'display:none',
      'transition:top 0.05s linear',
    ].join(';');
    document.body.appendChild(bar);
  }

  function onMouseMove(e) {
    if (!bar) return;
    var offset = window.pageYOffset || document.documentElement.scrollTop;
    bar.style.top = (e.clientY - 20) + 'px';
  }

  function enable() {
    createBar();
    isActive = true;
    bar.style.display = 'block';
    document.addEventListener('mousemove', onMouseMove);
    document.body.classList.add('reading-guide');
    localStorage.setItem(STORAGE_KEY, 'true');
    updateButtons(true);
    announce('Reading guide on');
  }

  function disable() {
    isActive = false;
    if (bar) bar.style.display = 'none';
    document.removeEventListener('mousemove', onMouseMove);
    document.body.classList.remove('reading-guide');
    localStorage.setItem(STORAGE_KEY, 'false');
    updateButtons(false);
    announce('Reading guide off');
  }

  function toggle() {
    if (isActive) { disable(); } else { enable(); }
  }

  function updateButtons(on) {
    document.querySelectorAll('.reading-guide-btn').forEach(function (btn) {
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function announce(msg) {
    var el = document.getElementById('a11y-announcer');
    if (el) { el.textContent = msg; }
  }

  // Restore on load
  document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      enable();
    }
    // Wire any buttons already in the DOM
    document.querySelectorAll('.reading-guide-btn').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
  });

  // Expose globally for external callers (e.g. accessibility bar)
  window.DCC_ReadingGuide = { enable: enable, disable: disable, toggle: toggle };

}());
