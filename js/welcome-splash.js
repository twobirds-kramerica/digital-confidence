/* ============================================
   Digital Confidence Centre
   Welcome Splash Screen
   Shown once to new visitors; skipped if already seen.
   ============================================ */

(function () {
  'use strict';

  /* Don't show splash if already seen */
  if (localStorage.getItem('dc-splash-seen')) return;

  document.addEventListener('DOMContentLoaded', function () {
    showSplash();
  });

  function showSplash() {
    var overlay = document.createElement('div');
    overlay.className = 'splash-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Welcome to the Digital Confidence Centre');

    overlay.innerHTML =
      '<div class="splash-inner">' +
        '<div class="splash-icon">🌟</div>' +
        '<h1>Welcome to Digital Confidence</h1>' +
        '<p class="splash-sub">You\'re on your way to feeling comfortable and safe with your devices</p>' +
        '<p class="splash-desc">Learn at your own pace. Start from the top or jump to any section. Your progress is saved automatically. We\'ll ask about your location and devices to personalise your experience.</p>' +
        '<button class="splash-btn-start" id="splash-start-btn">Let\'s Get Started!</button>' +
        '<button class="splash-skip" id="splash-skip-btn">Skip Setup — Browse Now</button>' +
      '</div>';

    document.body.appendChild(overlay);

    var startBtn = document.getElementById('splash-start-btn');
    var skipBtn  = document.getElementById('splash-skip-btn');

    if (startBtn) {
      startBtn.focus();
      startBtn.addEventListener('click', function () {
        markSplashSeen();
        closeSplash(overlay);
        if (typeof dcOpenWizard === 'function') {
          dcOpenWizard();
        }
      });
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', function () {
        setSkipDefaults();
        markSplashSeen();
        closeSplash(overlay);
      });
    }

    /* Trap focus inside overlay */
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setSkipDefaults();
        markSplashSeen();
        closeSplash(overlay);
        return;
      }
      if (e.key === 'Tab') {
        var focusable = overlay.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
        if (focusable.length < 2) return;
        var first = focusable[0];
        var last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* Set sensible defaults when user skips setup */
  function setSkipDefaults() {
    /* City: generic fallback — content still works, city-specific refs show Windsor */
    if (!localStorage.getItem('dc-city')) {
      localStorage.setItem('dc-city', 'windsor');
    }
    /* No device profile → device filter shows ALL content (see applyDeviceFiltering) */
    /* Font size & theme defaults */
    if (!localStorage.getItem('dc-font-size')) {
      localStorage.setItem('dc-font-size', 'medium');
    }
    if (!localStorage.getItem('dc-theme')) {
      localStorage.setItem('dc-theme', 'light');
    }
    /* Mark setup as skipped (shows device tip banner on module pages) */
    localStorage.setItem('dc-setup-complete', 'skipped');
    localStorage.setItem('dc-device-prompt-pending', 'true');
  }

  function markSplashSeen() {
    localStorage.setItem('dc-splash-seen', 'true');
  }

  function closeSplash(overlay) {
    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.opacity = '0';
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 300);
  }

})();
