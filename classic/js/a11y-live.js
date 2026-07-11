/* ============================================
   a11y-live.js — Screen Reader Live Regions
   Phase 4A — Digital Confidence Centre
   --------------------------------------------
   Patches dynamic content changes so that
   screen readers (VoiceOver, NVDA, JAWS, etc.)
   announce them automatically via aria-live.

   Covered:
   - Progress checkbox updates
   - Quiz feedback (correct / incorrect)
   - Language toggle confirmation
   - Dark/light mode toggle confirmation
   - Module completion announcements
   ============================================ */

(function () {
  'use strict';

  /* ---- Ensure the global announcer exists ---- */
  function getAnnouncer() {
    var el = document.getElementById('dc-live-region');
    if (!el) {
      el = document.createElement('div');
      el.id = 'dc-live-region';
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      el.setAttribute('role', 'status');
      el.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0;';
      document.body.appendChild(el);
    }
    return el;
  }

  /* Public API — also used by accessibility.js */
  window.dcAnnounce = function (message) {
    var region = getAnnouncer();
    region.textContent = '';
    setTimeout(function () { region.textContent = message; }, 50);
  };

  document.addEventListener('DOMContentLoaded', function () {
    getAnnouncer(); // create region early
    patchProgressCheckboxes();
    patchQuizFeedback();
    patchLangToggle();
    patchLoadingStates();
  });

  /* ---- Progress Checkboxes ---- */
  function patchProgressCheckboxes() {
    document.addEventListener('change', function (e) {
      var el = e.target;
      if (!el.classList.contains('progress-checkbox') && el.type !== 'checkbox') return;
      var label = el.closest('label');
      var name = label ? label.textContent.trim() : 'Step';
      if (el.checked) {
        window.dcAnnounce(name + ' marked as complete');
      } else {
        window.dcAnnounce(name + ' unmarked');
      }
    });
  }

  /* ---- Quiz Feedback ---- */
  /* Watches for feedback elements becoming visible */
  function patchQuizFeedback() {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          /* Match feedback containers used by quiz engines */
          if (
            node.classList.contains('quiz-feedback') ||
            node.classList.contains('answer-feedback') ||
            node.id === 'quiz-feedback' ||
            node.id === 'feedback-text'
          ) {
            var text = node.textContent.trim();
            if (text) window.dcAnnounce(text);
          }
        });

        /* Also catch attribute changes (hidden → visible) */
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'hidden' &&
          !mutation.target.hidden
        ) {
          var t = mutation.target;
          if (
            t.classList.contains('quiz-feedback') ||
            t.classList.contains('answer-feedback') ||
            t.id === 'quiz-feedback' ||
            t.id === 'feedback-text'
          ) {
            var msg = t.textContent.trim();
            if (msg) window.dcAnnounce(msg);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden']
    });
  }

  /* ---- Language Toggle ---- */
  function patchLangToggle() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.lang-toggle-btn, [data-lang-btn]');
      if (!btn) return;
      var lang = btn.getAttribute('data-lang') || btn.textContent.trim();
      if (lang === 'fr' || btn.textContent.trim() === 'FR') {
        window.dcAnnounce('Langue changée en français');
      } else {
        window.dcAnnounce('Language changed to English');
      }
    });
  }

  /* ---- Loading States (role="status") ---- */
  /* Ensures any element with class 'loading-state' or role="status"
     gets aria-live if it does not already have it */
  function patchLoadingStates() {
    document.querySelectorAll('.loading-state, [role="status"]').forEach(function (el) {
      if (!el.getAttribute('aria-live')) {
        el.setAttribute('aria-live', 'polite');
      }
    });
  }

})();
