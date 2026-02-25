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
        '<div style="font-size:3rem;margin-bottom:16px;">💙</div>' +
        '<h1>Welcome to Your Digital Confidence Journey</h1>' +
        '<p class="splash-sub">You\'re on your way to feeling comfortable and safe with your devices</p>' +
        '<ul class="splash-bullets">' +
          '<li data-icon="📚">Work through 8 friendly modules at your own pace — no rush, no tests</li>' +
          '<li data-icon="🛡️">Learn to spot scams, create safe passwords, and browse with confidence</li>' +
          '<li data-icon="📱">Content is tailored to your devices (iPad, iPhone, Android, or Windows)</li>' +
          '<li data-icon="💛">Your progress is saved on this device — pick up where you left off any time</li>' +
        '</ul>' +
        '<div class="splash-note">' +
          '<strong>First step:</strong> We\'ll ask you a few quick questions about where you live and which devices you use. This helps us show you the most helpful instructions. It only takes about 30 seconds.' +
        '</div>' +
        '<button class="splash-btn-start" id="splash-start-btn">Let\'s Get Started! ✨</button>' +
        '<button class="splash-skip" id="splash-skip-btn">Skip Setup — Browse Now</button>' +
      '</div>';

    document.body.appendChild(overlay);

    /* Focus the start button */
    var startBtn = document.getElementById('splash-start-btn');
    var skipBtn = document.getElementById('splash-skip-btn');

    if (startBtn) {
      startBtn.focus();
      startBtn.addEventListener('click', function () {
        markSplashSeen();
        closeSplash(overlay);
        /* Open the setup wizard */
        if (typeof dcOpenWizard === 'function') {
          dcOpenWizard();
        }
      });
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', function () {
        markSplashSeen();
        localStorage.setItem('dc-setup-complete', 'true');
        closeSplash(overlay);
      });
    }

    /* Trap focus inside overlay */
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        markSplashSeen();
        localStorage.setItem('dc-setup-complete', 'true');
        closeSplash(overlay);
        return;
      }
      if (e.key === 'Tab') {
        var focusable = overlay.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
        if (focusable.length < 2) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
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
