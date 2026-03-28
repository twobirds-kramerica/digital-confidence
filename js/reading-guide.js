/**
 * reading-guide.js
 * Enhanced reading guide:
 * — IntersectionObserver paragraph highlight (#FFFDE7) for touch devices
 * — Cursor-following horizontal bar for desktop mouse users
 * Standalone module. Toggle via elements with class 'reading-guide-btn'.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'dc-reading-guide';
  var isActive = false;
  var bar = null;
  var observer = null;
  var activePara = null;

  /* ── Inject paragraph-highlight CSS once ── */
  function ensureStyles() {
    if (document.getElementById('dc-rg-styles')) return;
    var s = document.createElement('style');
    s.id = 'dc-rg-styles';
    s.textContent = [
      '.dc-reading-active {',
      '  background:#FFFDE7 !important;',
      '  border-radius:4px;',
      '  outline:2px solid rgba(230,200,0,0.4);',
      '  transition:background 0.3s ease,outline 0.3s ease;',
      '}',
      'p { transition:background 0.3s ease; }'
    ].join('');
    document.head.appendChild(s);
  }

  /* ── Cursor-following bar (desktop only) ── */
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
      'background:rgba(255,242,102,0.25)',
      'border-top:2px solid rgba(180,150,0,0.3)',
      'border-bottom:2px solid rgba(180,150,0,0.3)',
      'pointer-events:none',
      'z-index:9000',
      'display:none',
      'transition:top 0.05s linear'
    ].join(';');
    document.body.appendChild(bar);
  }

  function onMouseMove(e) {
    if (!bar) return;
    bar.style.top = (e.clientY - 20) + 'px';
  }

  /* ── IntersectionObserver paragraph highlighting ── */
  function startParagraphHighlight() {
    if (!('IntersectionObserver' in window)) return;

    var paras = Array.from(document.querySelectorAll(
      '.main-content p, main p, .page-content p'
    )).filter(function (p) {
      return p.textContent.trim().length > 20; /* skip empty/tiny paras */
    });
    if (paras.length === 0) return;

    var bestPara = null;
    var bestRatio = 0;

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var ratio = entry.intersectionRatio;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestPara = entry.target;
        }
        /* Clear ratio tracking on exit */
        if (!entry.isIntersecting && entry.target === bestPara) {
          bestRatio = 0;
          bestPara = null;
        }
      });

      /* Highlight best visible paragraph */
      if (bestPara && bestPara !== activePara) {
        if (activePara) activePara.classList.remove('dc-reading-active');
        activePara = bestPara;
        activePara.classList.add('dc-reading-active');
      }
    }, {
      rootMargin: '-25% 0px -45% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    });

    paras.forEach(function (p) { observer.observe(p); });
  }

  function stopParagraphHighlight() {
    if (observer) { observer.disconnect(); observer = null; }
    if (activePara) { activePara.classList.remove('dc-reading-active'); activePara = null; }
  }

  /* ── Enable / disable / toggle ── */
  function enable() {
    ensureStyles();
    createBar();
    isActive = true;
    bar.style.display = 'block';
    document.addEventListener('mousemove', onMouseMove);
    document.body.classList.add('reading-guide');
    startParagraphHighlight();
    localStorage.setItem(STORAGE_KEY, 'true');
    updateButtons(true);
    announce(getLang() === 'fr' ? 'Guide de lecture activé' : 'Reading guide on');
  }

  function disable() {
    isActive = false;
    if (bar) bar.style.display = 'none';
    document.removeEventListener('mousemove', onMouseMove);
    document.body.classList.remove('reading-guide');
    stopParagraphHighlight();
    localStorage.setItem(STORAGE_KEY, 'false');
    updateButtons(false);
    announce(getLang() === 'fr' ? 'Guide de lecture désactivé' : 'Reading guide off');
  }

  function toggle() {
    if (isActive) { disable(); } else { enable(); }
  }

  function updateButtons(on) {
    document.querySelectorAll('.reading-guide-btn').forEach(function (btn) {
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      var label = on
        ? (getLang() === 'fr' ? 'Désactiver le guide' : 'Turn off guide')
        : (getLang() === 'fr' ? 'Guide de lecture' : 'Reading guide');
      if (btn.getAttribute('data-label-only') !== null) btn.textContent = label;
    });
  }

  function announce(msg) {
    var el = document.getElementById('a11y-announcer');
    if (el) { el.textContent = ''; setTimeout(function () { el.textContent = msg; }, 50); }
  }

  function getLang() {
    try {
      var l = document.documentElement.getAttribute('data-lang') ||
              localStorage.getItem('dc-lang') || navigator.language || 'en';
      return l.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    } catch (e) { return 'en'; }
  }

  /* ── Restore on load ── */
  document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      enable();
    }
    document.querySelectorAll('.reading-guide-btn').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
  });

  /* Re-wire after lang change */
  document.addEventListener('dc-lang-changed', function () {
    updateButtons(isActive);
  });

  /* Expose globally */
  window.DCC_ReadingGuide = { enable: enable, disable: disable, toggle: toggle };

}());
