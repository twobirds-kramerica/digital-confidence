/* ============================================
   Digital Confidence Centre
   Main Application JavaScript
   ============================================ */

/* ---- Focus Trap Utility (used by sidebar and modals) ---- */
/* Also defined in focus-trap.js for standalone use; this copy
   ensures it is always available since app.js loads on every page. */
if (typeof trapFocus === 'undefined') {
  var trapFocus = function trapFocus(modalElement, triggerElement) {
    var FOCUSABLE = [
      'a[href]', 'button:not([disabled])', 'input:not([disabled])',
      'select:not([disabled])', 'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])', 'details > summary'
    ].join(', ');

    function getFocusable() {
      return Array.prototype.slice.call(
        modalElement.querySelectorAll(FOCUSABLE)
      ).filter(function (el) {
        return !el.closest('[hidden]') && el.offsetParent !== null;
      });
    }

    function onKeydown(e) {
      if (e.key !== 'Tab') return;
      var els = getFocusable();
      if (!els.length) return;
      var first = els[0], last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    var els = getFocusable();
    if (els.length) els[0].focus();
    modalElement.addEventListener('keydown', onKeydown);

    return function release() {
      modalElement.removeEventListener('keydown', onKeydown);
      if (triggerElement && typeof triggerElement.focus === 'function') {
        triggerElement.focus();
      }
    };
  };
}

document.addEventListener('DOMContentLoaded', function () {
  initSidebar();
  setActiveNavLink();
});

/* Sidebar Toggle */
function initSidebar() {
  var menuBtn = document.querySelector('.menu-btn');
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.querySelector('.sidebar-overlay');
  var closeBtn = document.querySelector('.sidebar-close');

  /* Track the active focus trap so we can release it on close */
  var activeTrapRelease = null;

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var trigger = document.activeElement;
      sidebar.classList.add('open');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
      /* Trap focus inside the sidebar panel */
      activeTrapRelease = trapFocus(sidebar, trigger);
    });
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    /* Release focus trap and restore focus to the triggering element */
    if (activeTrapRelease) {
      activeTrapRelease();
      activeTrapRelease = null;
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });
}

/* Highlight active nav link */
function setActiveNavLink() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.sidebar nav a');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

/* Smooth scroll for anchor links */
document.addEventListener('click', function (e) {
  var anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    var target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

/* ── Global Error Boundary ── */
(function () {
  var MAX_ERRORS = 10;

  function saveError(msg, src, line) {
    try {
      var existing = [];
      try { existing = JSON.parse(localStorage.getItem('dc-error-log') || '[]'); } catch (e) {}
      existing.unshift({ ts: new Date().toISOString(), msg: msg, src: src, line: line });
      if (existing.length > MAX_ERRORS) existing = existing.slice(0, MAX_ERRORS);
      localStorage.setItem('dc-error-log', JSON.stringify(existing));
    } catch (e) { /* localStorage unavailable — silently skip */ }
  }

  window.addEventListener('error', function (e) {
    saveError(e.message || 'Unknown error', e.filename || '', e.lineno || 0);
  });

  window.addEventListener('unhandledrejection', function (e) {
    var msg = e.reason ? (e.reason.message || String(e.reason)) : 'Unhandled promise rejection';
    saveError(msg, 'promise', 0);
  });
})();

/* ── Progress Milestone Celebration ── */
/* Shows a congratulatory banner when the user completes
   4, 8, 12, or 16 modules. Shown once per milestone. */
(function () {
  var MILESTONES = [4, 8, 12, 16];

  var MESSAGES = {
    4:  { icon: '🌟', text: 'Brilliant — you\'ve finished 4 modules! You\'re building real confidence.' },
    8:  { icon: '🏅', text: 'Halfway there! 8 modules complete — you should be proud of yourself.' },
    12: { icon: '🎖️', text: 'Amazing work — 12 modules done! You\'re nearly at the finish line.' },
    16: { icon: '🏆', text: 'Outstanding! All 16 core modules complete. You have earned your Digital Confidence!' }
  };

  function countCompletedModules() {
    var count = 0;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key && key.indexOf('dc-module-') === 0 && key.indexOf('-complete') !== -1) {
          if (localStorage.getItem(key) === 'true') { count++; }
        }
      }
    } catch (e) { /* localStorage unavailable */ }
    return count;
  }

  function showMilestoneBanner(n) {
    var msg = MESSAGES[n];
    if (!msg) return;

    var banner = document.createElement('div');
    banner.id = 'dc-milestone-banner';
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-live', 'polite');
    banner.style.cssText = [
      'background:#E8F5E9',
      'border:2px solid #2E7D32',
      'border-radius:10px',
      'padding:1rem 1.25rem',
      'margin:1rem 0',
      'display:flex',
      'align-items:center',
      'gap:0.75rem',
      'font-size:1.05rem',
      'color:#1b5e20',
      'position:relative'
    ].join(';');

    var iconSpan = document.createElement('span');
    iconSpan.style.cssText = 'font-size:1.75rem;flex-shrink:0;';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = msg.icon;

    var textSpan = document.createElement('span');
    textSpan.innerHTML = '<strong>Congratulations!</strong> ' + msg.text;

    var closeBtn = document.createElement('button');
    closeBtn.textContent = '✕ Close';
    closeBtn.setAttribute('aria-label', 'Close celebration banner');
    closeBtn.style.cssText = [
      'margin-left:auto',
      'background:none',
      'border:none',
      'color:#2E7D32',
      'font-size:0.85rem',
      'cursor:pointer',
      'font-weight:600',
      'flex-shrink:0',
      'padding:0.25rem 0.5rem'
    ].join(';');
    closeBtn.addEventListener('click', function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    });

    banner.appendChild(iconSpan);
    banner.appendChild(textSpan);
    banner.appendChild(closeBtn);

    /* Insert at top of main content, below progress bar if present */
    document.addEventListener('DOMContentLoaded', function () {
      var main = document.getElementById('main') || document.querySelector('main');
      if (!main) return;
      var progressOverview = main.querySelector('.progress-overview');
      if (progressOverview && progressOverview.nextSibling) {
        main.insertBefore(banner, progressOverview.nextSibling);
      } else {
        main.insertBefore(banner, main.firstChild);
      }
    });
  }

  function checkMilestones() {
    var completed = countCompletedModules();
    MILESTONES.forEach(function (n) {
      if (completed >= n) {
        var key = 'dc-milestone-' + n;
        try {
          if (!localStorage.getItem(key)) {
            localStorage.setItem(key, 'shown');
            showMilestoneBanner(n);
          }
        } catch (e) { /* silent */ }
      }
    });
  }

  /* Run on page load */
  checkMilestones();

  /* Also expose so progress.js can trigger after marking a module done */
  window.dcCheckMilestones = checkMilestones;
})();

/* ── localStorage Availability Banner ── */
(function () {
  var lsAvailable = true;
  try {
    localStorage.setItem('dc-test', '1');
    localStorage.removeItem('dc-test');
  } catch (e) {
    lsAvailable = false;
  }

  if (!lsAvailable) {
    var banner = document.createElement('div');
    banner.setAttribute('role', 'alert');
    banner.style.cssText = 'background:#b71c1c;color:#fff;text-align:center;padding:0.6rem 1rem;font-size:0.85rem;position:sticky;top:0;z-index:9999;';
    banner.innerHTML = '&#9888;&#65039; Your progress cannot be saved right now — private browsing mode or storage is disabled. Your learning is not lost, but progress will reset when you close this tab.';
    document.addEventListener('DOMContentLoaded', function () {
      var body = document.body;
      if (body) body.insertBefore(banner, body.firstChild);
    });
  }
})();
