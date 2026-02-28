/* ============================================
   Digital Confidence Centre
   Beta Feedback Widget
   Remove for production: delete this file and
   the #beta-feedback-widget div from all pages.
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var trigger = document.getElementById('feedback-trigger');
    var panel   = document.getElementById('feedback-panel');
    var closeBtn = document.getElementById('feedback-close');
    var cancelBtn = document.getElementById('feedback-cancel');
    var form    = document.getElementById('feedback-form');
    var success = document.getElementById('feedback-success');
    var pageNameEl = document.getElementById('current-page-name');

    if (!trigger) return; // Widget not on this page

    // Set current page label
    if (pageNameEl) {
      pageNameEl.textContent = document.title || window.location.pathname.split('/').pop() || 'Unknown Page';
    }

    // Toggle panel open
    trigger.addEventListener('click', function () {
      var isOpen = panel.style.display !== 'none';
      panel.style.display = isOpen ? 'none' : 'block';
      if (!isOpen) {
        var typeSelect = document.getElementById('feedback-type');
        if (typeSelect) typeSelect.focus();
      }
    });

    // Close panel
    function closePanel() {
      panel.style.display = 'none';
      if (form)    form.reset();
      if (success) { success.style.display = 'none'; form.style.display = 'block'; }
    }

    if (closeBtn)  closeBtn.addEventListener('click', closePanel);
    if (cancelBtn) cancelBtn.addEventListener('click', closePanel);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.style.display !== 'none') closePanel();
    });

    // Form submission
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var entry = {
          page:       document.title || window.location.pathname,
          url:        window.location.href,
          type:       document.getElementById('feedback-type').value,
          message:    document.getElementById('feedback-message').value,
          email:      (document.getElementById('feedback-email').value || 'anonymous').trim(),
          timestamp:  new Date().toISOString(),
          userAgent:  navigator.userAgent,
          screenSize: window.innerWidth + 'x' + window.innerHeight,
          darkMode:   document.documentElement.getAttribute('data-theme') === 'dark'
        };

        saveFeedback(entry);
        showSuccess();
      });
    }

    function saveFeedback(entry) {
      try {
        var all = JSON.parse(localStorage.getItem('dc-beta-feedback') || '[]');
        all.push(entry);
        localStorage.setItem('dc-beta-feedback', JSON.stringify(all));
      } catch (e) {
        console.warn('Could not save feedback:', e);
      }

      /* ── To enable real submission, uncomment and configure:
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      }).catch(function(err){ console.warn('Feedback send failed:', err); });
      ── */
    }

    function showSuccess() {
      if (form)    form.style.display = 'none';
      if (success) success.style.display = 'block';
      setTimeout(function () { closePanel(); }, 3000);
    }
  });

})();
