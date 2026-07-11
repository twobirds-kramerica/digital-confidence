/**
 * bionic-reading.js
 * Bionic Reading mode — bolds the first ~50% of each word as a fixation point.
 * Technique: open CSS/JS implementation; no SDK required.
 *
 * Applies to main content only. Skips UI chrome (buttons, nav, toolbar).
 * Reversible: enable() transforms DOM, disable() restores original text nodes.
 *
 * Wire toggle to elements with class 'bionic-reading-btn'.
 * Exposes window.DCC_BionicReading = { enable, disable, toggle, isOn }
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'dc-bionic-reading';
  var MARK_CLASS  = 'dc-b';

  var SKIP_TAGS = {
    SCRIPT: 1, STYLE: 1, BUTTON: 1, INPUT: 1,
    TEXTAREA: 1, CODE: 1, PRE: 1, SELECT: 1, OPTION: 1
  };

  function isOn() {
    return document.body.classList.contains('bionic-reading');
  }

  function getContentRoot() {
    return document.querySelector('main, .module-content, article, .content-area')
      || document.body;
  }

  function shouldSkip(node) {
    var el = node.parentElement;
    while (el) {
      if (SKIP_TAGS[el.tagName]) return true;
      if (el.classList.contains('a11y-btn'))        return true;
      if (el.classList.contains('accessibility-bar')) return true;
      if (el.classList.contains('top-bar'))          return true;
      if (el.classList.contains('site-footer'))      return true;
      el = el.parentElement;
    }
    return false;
  }

  function applyBionic(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) {
      if (n.nodeValue.trim() && !shouldSkip(n)) nodes.push(n);
    }
    nodes.forEach(function (tn) {
      var frag = document.createDocumentFragment();
      tn.nodeValue.split(/(\s+)/).forEach(function (tok) {
        if (!tok || /^\s+$/.test(tok)) {
          frag.appendChild(document.createTextNode(tok));
          return;
        }
        var n = Math.max(1, Math.ceil(tok.length / 2));
        var b = document.createElement('b');
        b.className = MARK_CLASS;
        b.textContent = tok.slice(0, n);
        frag.appendChild(b);
        if (n < tok.length) frag.appendChild(document.createTextNode(tok.slice(n)));
      });
      tn.parentNode.replaceChild(frag, tn);
    });
  }

  function revertBionic(root) {
    root.querySelectorAll('b.' + MARK_CLASS).forEach(function (b) {
      var full = b.textContent;
      var next = b.nextSibling;
      if (next && next.nodeType === Node.TEXT_NODE && !/^\s/.test(next.nodeValue)) {
        full += next.nodeValue;
        next.parentNode.removeChild(next);
      }
      b.parentNode.replaceChild(document.createTextNode(full), b);
    });
    root.normalize();
  }

  function updateButtons(on) {
    document.querySelectorAll('.bionic-reading-btn').forEach(function (btn) {
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function announce(msg) {
    var el = document.getElementById('a11y-announcer');
    if (el) { el.textContent = msg; }
  }

  function enable() {
    applyBionic(getContentRoot());
    document.body.classList.add('bionic-reading');
    localStorage.setItem(STORAGE_KEY, 'true');
    updateButtons(true);
    announce('Bionic Reading on');
  }

  function disable() {
    revertBionic(getContentRoot());
    document.body.classList.remove('bionic-reading');
    localStorage.setItem(STORAGE_KEY, 'false');
    updateButtons(false);
    announce('Bionic Reading off');
  }

  function toggle() {
    if (isOn()) { disable(); } else { enable(); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.bionic-reading-btn').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
    if (localStorage.getItem(STORAGE_KEY) === 'true') enable();
  });

  window.DCC_BionicReading = { enable: enable, disable: disable, toggle: toggle, isOn: isOn };

}());
