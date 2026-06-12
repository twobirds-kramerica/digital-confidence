/* ============================================================================
   DCC Wizard UX — navigation controller
   ----------------------------------------------------------------------------
   One-script controller for *-wizard.html pages. Handles:
   - Step show/hide via data-step index
   - Back / Continue button state (disabled on boundaries, labels update)
   - Progress text "Step X of N" (screen-reader live region)
   - Step dots (completed=filled, current=pulsing, future=hollow)
   - localStorage: save step per module — return visitor resumes where left off
   - URL hash sync (#step-1 etc) for browser back/forward and deep-linking
   - Help <dialog>: showModal() focus-trap, Escape + close-btn + click-outside

   Pure vanilla JS. No dependencies. Works offline.
   ========================================================================== */

(function () {
  'use strict';

  function init() {
    var card = document.querySelector('.wizard-card');
    if (!card) return;

    var steps = Array.prototype.slice.call(card.querySelectorAll('.wizard-step'));
    if (steps.length === 0) return;

    var progressEl = card.querySelector('.wizard-progress');
    var dotsContainer = card.querySelector('.wizard-dots');
    var backBtn = card.querySelector('[data-wizard-back]');
    var nextBtn = card.querySelector('[data-wizard-next]');
    var helpBtn = card.querySelector('.wizard-help-btn');
    var helpDialog = document.querySelector('.wizard-help-dialog');
    var helpCloseBtn = helpDialog ? helpDialog.querySelector('.wizard-help-close') : null;

    var total = steps.length;
    var moduleId = card.getAttribute('data-module-id') || 'module';
    var lsKey = 'dcc-wizard-' + moduleId;

    // Build step dots
    var dots = [];
    if (dotsContainer) {
      for (var d = 0; d < total; d++) {
        var dot = document.createElement('span');
        dot.className = 'wizard-dot';
        dot.setAttribute('role', 'presentation');
        dotsContainer.appendChild(dot);
        dots.push(dot);
      }
    }

    function readStepFromHash() {
      var m = /^#step-(\d+)$/.exec(window.location.hash || '');
      if (!m) return -1;
      var n = parseInt(m[1], 10) - 1;
      if (isNaN(n) || n < 0 || n >= total) return -1;
      return n;
    }

    function readStepFromStorage() {
      try {
        var val = localStorage.getItem(lsKey);
        if (val === null) return -1;
        var n = parseInt(val, 10);
        if (isNaN(n) || n < 0 || n >= total) return -1;
        return n;
      } catch (e) {
        return -1;
      }
    }

    function saveStep(i) {
      try { localStorage.setItem(lsKey, String(i)); } catch (e) { /* storage blocked */ }
    }

    // Hash wins over storage (explicit deep-link); storage wins over step 0 (resume)
    var hashStep = readStepFromHash();
    var current = hashStep >= 0 ? hashStep : Math.max(0, readStepFromStorage());

    function renderDots() {
      dots.forEach(function (dot, i) {
        dot.removeAttribute('aria-current');
        dot.removeAttribute('data-state');
        if (i < current) {
          dot.setAttribute('data-state', 'done');
        } else if (i === current) {
          dot.setAttribute('aria-current', 'step');
        }
      });
    }

    function render() {
      steps.forEach(function (s, i) {
        if (i === current) {
          s.removeAttribute('hidden');
          s.setAttribute('aria-current', 'step');
        } else {
          s.setAttribute('hidden', '');
          s.removeAttribute('aria-current');
        }
      });

      if (progressEl) {
        progressEl.textContent = 'Step ' + (current + 1) + ' of ' + total;
      }

      renderDots();

      if (backBtn) {
        backBtn.disabled = (current === 0);
        backBtn.setAttribute('aria-disabled', current === 0 ? 'true' : 'false');
      }

      if (nextBtn) {
        var isLast = (current === total - 1);
        var nextLabel = steps[current].getAttribute('data-next-label');
        var nextPath = steps[current].getAttribute('data-next-path');
        if (isLast && nextPath) {
          nextBtn.textContent = nextLabel || 'Continue';
          nextBtn.setAttribute('data-wizard-exit', nextPath);
        } else {
          nextBtn.textContent = nextLabel || 'Continue';
          nextBtn.removeAttribute('data-wizard-exit');
        }
      }

      // Move focus to the heading of the visible step for screen readers.
      var h1 = steps[current].querySelector('h1, h2');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        try { h1.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
      }
    }

    function goTo(i) {
      if (i < 0 || i >= total) return;
      current = i;
      saveStep(current);
      var newHash = '#step-' + (current + 1);
      if (window.location.hash !== newHash) {
        try {
          window.history.pushState({ step: current }, '', newHash);
        } catch (e) {
          window.location.hash = newHash;
        }
      }
      render();
    }

    function next() {
      if (nextBtn && nextBtn.hasAttribute('data-wizard-exit')) {
        var dest = nextBtn.getAttribute('data-wizard-exit');
        window.location.href = dest;
        return;
      }
      goTo(current + 1);
    }

    function back() {
      goTo(current - 1);
    }

    if (backBtn) backBtn.addEventListener('click', back);
    if (nextBtn) nextBtn.addEventListener('click', next);

    window.addEventListener('popstate', function () {
      var h = readStepFromHash();
      current = h >= 0 ? h : current;
      render();
    });

    // Help dialog wiring
    if (helpBtn && helpDialog && typeof helpDialog.showModal === 'function') {
      helpBtn.addEventListener('click', function () {
        helpDialog.showModal();
      });

      if (helpCloseBtn) {
        helpCloseBtn.addEventListener('click', function () {
          helpDialog.close();
        });
      }

      // Click outside dialog card to close (click on ::backdrop)
      helpDialog.addEventListener('click', function (e) {
        if (e.target === helpDialog) {
          helpDialog.close();
        }
      });

      // Escape is native to <dialog> via showModal(); no extra handler required.
    } else if (helpBtn) {
      // Fallback for browsers lacking native <dialog>: navigate to help anchor
      helpBtn.addEventListener('click', function () {
        var fallback = helpBtn.getAttribute('data-help-href');
        if (fallback) window.location.href = fallback;
      });
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
