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

/* Highlight active nav link and open its accordion group */
function setActiveNavLink() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.sidebar nav a');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || href.replace(/^(\.\.\/)+/, '') === currentPage) {
      link.classList.add('active');
      var group = link.closest('details.snav-group');
      if (group) {
        document.querySelectorAll('details.snav-group').forEach(function(g){ g.removeAttribute('open'); });
        group.open = true;
      }
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

/* ============================================
   B3: Back button — keep user in DCC site
   ============================================ */
(function() {
  /* Site root derived from this script's location (js/app.js) \u2014 works on
     GitHub Pages project hosting and any future custom domain. */
  var homeUrl = 'index.html';
  try {
    var appScript = document.querySelector('script[src*="app.js"]');
    if (appScript) homeUrl = new URL('../index.html', appScript.src).href;
  } catch (e) {}

  history.pushState({page: 'dcc'}, '', window.location.href);
  window.addEventListener('popstate', function() {
    var ref = document.referrer || '';
    if (!ref || !ref.includes('twobirds-kramerica')) {
      window.location.href = homeUrl;
    }
  });

  /* Add visible "Home" link on module pages (not homepage) */
  document.addEventListener('DOMContentLoaded', function() {
    var isHome = window.location.pathname.endsWith('/index.html') ||
                 window.location.pathname.endsWith('/digital-confidence/') ||
                 window.location.pathname === '/';
    if (isHome) return;

    var backLink = document.createElement('a');
    backLink.href = homeUrl;
    backLink.className = 'dcc-back-home';
    backLink.style.cssText = 'display:inline-block;padding:8px 12px;margin:8px 0 0 12px;font-size:16px;color:var(--color-text-link, #2A7B6F);text-decoration:underline;min-height:44px;line-height:28px;';
    var isFr = (localStorage.getItem('dc-lang') || 'en').startsWith('fr');
    backLink.textContent = isFr ? '\u2190 Accueil' : '\u2190 Home';

    var main = document.querySelector('.page-wrapper, main, .module-content');
    if (main) main.insertBefore(backLink, main.firstChild);
  });
})();

/* ============================================
   B5: Category pill — "you are here" label above h1
   ============================================ */
(function () {
  var CATS = {
    'module-1.html':                  ['Device Basics',    '📱'],
    'module-2.html':                  ['Safety',           '🛡️'],
    'module-2-5.html':                ['Everyday Skills',  '📂'],
    'module-3.html':                  ['Safety',           '🔑'],
    'module-4.html':                  ['Device Basics',    '📱'],
    'module-5.html':                  ['Communication',    '✉️'],
    'module-6.html':                  ['Finance',          '🏦'],
    'module-7.html':                  ['Everyday Skills',  '📷'],
    'module-8.html':                  ['Communication',    '👨‍👩‍👧'],
    'module-9.html':                  ['Technology',       '🤖'],
    'module-10.html':                 ['Everyday Skills',  '🛒'],
    'module-11.html':                 ['Everyday Skills',  '🚗'],
    'module-12.html':                 ['Support',          '🤝'],
    'module-13.html':                 ['Communication',    '👥'],
    'module-14.html':                 ['Technology',       '🏡'],
    'module-15.html':                 ['Health',           '🏥'],
    'module-16-travel-safety.html':   ['Safety',           '✈️'],
    'module-17-ai-research.html':     ['Technology',       '🔍'],
    'module-18-staying-connected.html': ['Communication',  '💞'],
    'module-19-digital-legacy.html':  ['Everyday Skills',  '🗂️'],
    'module-20-internet-plan.html':   ['Technology',       '📶'],
    'module-21-mobile-plan.html':     ['Technology',       '📱'],
    'module-22-tv-home-phone.html':   ['Technology',       '📺'],
    'module-23-online-marketplace.html': ['Everyday Skills','🛒'],
    'module-24-communication.html':   ['Communication',    '💬'],
    'module-fact-check.html':         ['Safety',           '🔎'],
    'module-ai-health.html':          ['Health & Safety',  '💗'],
    'module-visual-ai.html':          ['Technology',       '📷'],
    'digital-literacy-101.html':      ['Device Basics',    '📖'],
    'family-setup.html':              ['Device Basics',    '👪']
  };

  var page = window.location.pathname.split('/').pop() || '';
  var cat = CATS[page];
  if (!cat) return;

  document.addEventListener('DOMContentLoaded', function () {
    var h1 = document.querySelector('#main h1');
    if (!h1) return;

    var style = document.createElement('style');
    style.textContent = '.dcc-category-pill{display:inline-flex;align-items:center;gap:.35rem;font-size:.78rem;font-weight:700;padding:.2rem .7rem;border-radius:999px;background:var(--color-surface-raised,#EEF2F7);color:var(--color-text-secondary,#4A5568);border:1px solid var(--color-border,#DDE3EB);margin-bottom:.65rem;letter-spacing:.03em;text-transform:uppercase;}[data-theme="dark"] .dcc-category-pill{background:rgba(255,255,255,.08);color:var(--color-text-secondary,#9CA3AF);border-color:rgba(255,255,255,.12);}';
    document.head.appendChild(style);

    var pill = document.createElement('div');
    pill.className = 'dcc-category-pill';
    pill.setAttribute('aria-label', 'Category: ' + cat[0]);
    var icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = cat[1];
    var label = document.createElement('span');
    label.textContent = cat[0];
    pill.appendChild(icon);
    pill.appendChild(label);
    h1.parentNode.insertBefore(pill, h1);
  });
})();

/* ============================================
   B4: Help button — bottom-right circle
   ============================================ */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var isFr = (localStorage.getItem('dc-lang') || 'en').startsWith('fr');

    /* Help circle button */
    var helpBtn = document.createElement('button');
    helpBtn.id = 'dcc-help-btn';
    helpBtn.setAttribute('aria-label', isFr ? 'Aide' : 'Help');
    helpBtn.textContent = '?';
    helpBtn.style.cssText = 'position:fixed;bottom:24px;right:20px;width:52px;height:52px;border-radius:50%;background:#2EC4B6;color:#fff;border:none;font-size:24px;font-weight:700;cursor:pointer;z-index:9990;box-shadow:0 2px 8px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;';

    /* Help sheet */
    var helpSheet = document.createElement('div');
    helpSheet.id = 'dcc-help-sheet';
    helpSheet.setAttribute('role', 'dialog');
    helpSheet.setAttribute('aria-label', isFr ? 'Aide' : 'Help');
    helpSheet.style.cssText = 'display:none;position:fixed;bottom:84px;right:20px;background:#fff;border-radius:12px;padding:20px;max-width:280px;box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:9991;';
    helpSheet.innerHTML =
      '<p style="font-weight:600;margin-bottom:8px;color:#1B3A4B;" data-en="Need help?" data-fr="Besoin d\'aide ?">' + (isFr ? "Besoin d'aide ?" : 'Need help?') + '</p>' +
      '<p style="font-size:14px;color:#4A5568;margin-bottom:12px;" data-en="Try refreshing the page, or tap Home to start over." data-fr="Essayez de rafra\u00eechir la page, ou tapez Accueil pour recommencer.">' +
        (isFr ? "Essayez de rafra\u00eechir la page, ou tapez " : 'Try refreshing the page, or tap ') +
        '<a href="/digital-confidence/index.html" style="color:#2EC4B6;font-weight:600;">' + (isFr ? 'Accueil' : 'Home') + '</a>' +
        (isFr ? ' pour recommencer.' : ' to start over.') +
      '</p>' +
      '<button style="background:#f0f0f0;border:none;border-radius:6px;padding:8px 16px;cursor:pointer;font-size:14px;min-height:44px;width:100%;" data-en="Close" data-fr="Fermer">' + (isFr ? 'Fermer' : 'Close') + '</button>';

    document.body.appendChild(helpBtn);
    document.body.appendChild(helpSheet);

    helpBtn.addEventListener('click', function() {
      helpSheet.style.display = helpSheet.style.display === 'none' ? 'block' : 'none';
    });
    helpSheet.querySelector('button').addEventListener('click', function() {
      helpSheet.style.display = 'none';
    });
    document.addEventListener('click', function(e) {
      if (!helpSheet.contains(e.target) && e.target !== helpBtn) {
        helpSheet.style.display = 'none';
      }
    });

    /* Dark mode styles */
    var style = document.createElement('style');
    style.textContent = '[data-theme="dark"] #dcc-help-sheet { background: #333; } [data-theme="dark"] #dcc-help-sheet p { color: #E8E8E8; } [data-theme="dark"] #dcc-help-sheet button { background: #444; color: #E8E8E8; }';
    document.head.appendChild(style);
  });
})();
