/* ============================================================
   module-nav.js — Time estimates + Previous / Next navigation
   Injects automatically on every module page.
   ============================================================ */

(function () {
  'use strict';

  /* Ordered module sequence */
  var MODULES = [
    { file: 'module-1.html',                   label: '1',   title: 'Mastering the Escape Hatch',  time: 15 },
    { file: 'module-2.html',                   label: '2',   title: 'The Security Shield',          time: 20 },
    { file: 'module-2-5.html',                 label: '2.5', title: 'Common Digital Tasks',         time: 15 },
    { file: 'module-3.html',                   label: '3',   title: 'Passwords &amp; Biometrics',   time: 20 },
    { file: 'module-4.html',                   label: '4',   title: 'App Store Safety',             time: 15 },
    { file: 'module-5.html',                   label: '5',   title: 'Email &amp; Messages',         time: 20 },
    { file: 'module-6.html',                   label: '6',   title: 'Banking &amp; Transactions',   time: 20 },
    { file: 'module-7.html',                   label: '7',   title: 'Photos &amp; Memories',        time: 15 },
    { file: 'module-8.html',                   label: '8',   title: 'Stay Connected',               time: 15 },
    { file: 'module-9.html',                   label: '9',   title: 'Understanding AI',             time: 20 },
    { file: 'module-10.html',                  label: '10',  title: 'Grocery &amp; Food Delivery',  time: 15 },
    { file: 'module-11.html',                  label: '11',  title: 'Ride-Sharing Apps',            time: 15 },
    { file: 'module-12.html',                  label: '12',  title: 'Phone &amp; Tech Support',     time: 20 },
    { file: 'module-13.html',                  label: '13',  title: 'Social Media Safety',          time: 20 },
    { file: 'module-14.html',                  label: '14',  title: 'Smart Home Basics',            time: 15 },
    { file: 'module-15.html',                  label: '15',  title: 'Telehealth &amp; Virtual Care', time: 20 },
    { file: 'module-16-travel-safety.html',    label: '16',  title: 'Travel Safety',                time: 20 },
    { file: 'module-17-ai-research.html',      label: '17',  title: 'AI for Research',              time: 20 },
    { file: 'module-18-staying-connected.html',label: '18',  title: 'Staying Connected',            time: 15 },
    { file: 'module-19-digital-legacy.html',   label: '19',  title: 'Digital Legacy',               time: 15 }
  ];

  function isFr() {
    var lang = document.documentElement.lang || '';
    return lang.toLowerCase().indexOf('fr') === 0;
  }

  function getCurrentIndex() {
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].file === filename) return i;
    }
    return -1;
  }

  function injectStyles() {
    if (document.getElementById('dc-module-nav-styles')) return;
    var style = document.createElement('style');
    style.id = 'dc-module-nav-styles';
    style.textContent = [
      '.dc-time-badge{display:inline-block;background:#E3F2FD;color:#0D47A1;',
      'border:1px solid #90CAF9;border-radius:20px;padding:0.3rem 0.85rem;',
      'font-size:0.88rem;font-weight:600;margin:0.5rem 0 1rem;vertical-align:middle;}',
      '.dc-module-nav{display:flex;justify-content:space-between;align-items:center;',
      'flex-wrap:wrap;gap:0.75rem;padding:1.25rem 0 0.5rem;',
      'border-top:2px solid #E0E0E0;margin-top:2rem;}',
      '.dc-module-nav a{display:inline-flex;align-items:center;gap:0.4rem;',
      'background:#1565C0;color:#fff;padding:0.65rem 1.2rem;border-radius:8px;',
      'font-size:0.95rem;font-weight:600;text-decoration:none;min-width:120px;}',
      '.dc-module-nav a:hover,.dc-module-nav a:focus{background:#0D47A1;outline:2px solid #90CAF9;}',
      '.dc-module-nav .dc-nav-prev{margin-right:auto;}',
      '.dc-module-nav .dc-nav-next{margin-left:auto;}',
      '.dc-module-nav .dc-nav-placeholder{flex:1;}'
    ].join('');
    document.head.appendChild(style);
  }

  function injectTimeBadge(idx) {
    var mod = MODULES[idx];
    var minutes = mod.time;
    var label = isFr()
      ? '⏱ Environ ' + minutes + ' minutes'
      : '⏱ About ' + minutes + ' minutes';

    /* Find the module <h1> (contains "Module N:") */
    var h1s = document.querySelectorAll('h1');
    var targetH1 = null;
    for (var i = 0; i < h1s.length; i++) {
      if (/^Module\s[\d.]+[:\s]/i.test(h1s[i].textContent.trim())) {
        targetH1 = h1s[i];
        break;
      }
    }
    if (!targetH1) return;

    var badge = document.createElement('span');
    badge.className = 'dc-time-badge';
    badge.setAttribute('data-en', '⏱ About ' + minutes + ' minutes');
    badge.setAttribute('data-fr', '⏱ Environ ' + minutes + ' minutes');
    badge.textContent = label;

    /* Insert immediately after the h1 */
    if (targetH1.nextSibling) {
      targetH1.parentNode.insertBefore(badge, targetH1.nextSibling);
    } else {
      targetH1.parentNode.appendChild(badge);
    }
    /* Wrap in a block so it sits on its own line */
    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin:0.4rem 0 0.75rem;';
    badge.parentNode.insertBefore(wrapper, badge);
    wrapper.appendChild(badge);
  }

  function buildNavLink(mod, direction) {
    var a = document.createElement('a');
    a.href = mod.file;
    a.className = direction === 'prev' ? 'dc-nav-prev' : 'dc-nav-next';
    var arrow = direction === 'prev' ? '&#8592; ' : ' &#8594;';
    var moduleNum = 'Module ' + mod.label;
    if (direction === 'prev') {
      a.innerHTML = arrow + moduleNum;
      a.setAttribute('aria-label', 'Previous module: ' + moduleNum);
    } else {
      a.innerHTML = moduleNum + arrow;
      a.setAttribute('aria-label', 'Next module: ' + moduleNum);
    }
    return a;
  }

  function injectNavigation(idx) {
    var prev = idx > 0 ? MODULES[idx - 1] : null;
    var next = idx < MODULES.length - 1 ? MODULES[idx + 1] : null;

    var nav = document.createElement('div');
    nav.className = 'dc-module-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', isFr() ? 'Navigation entre les modules' : 'Between-module navigation');

    if (prev) {
      nav.appendChild(buildNavLink(prev, 'prev'));
    } else {
      var ph = document.createElement('span');
      ph.className = 'dc-nav-placeholder';
      nav.appendChild(ph);
    }

    if (next) {
      nav.appendChild(buildNavLink(next, 'next'));
    }

    /* Insert before .sources-block, or before </main>, whichever comes first */
    var sources = document.querySelector('.sources-block');
    var main = document.querySelector('main');

    if (sources && sources.parentNode) {
      sources.parentNode.insertBefore(nav, sources);
    } else if (main) {
      main.appendChild(nav);
    } else {
      document.body.appendChild(nav);
    }
  }

  function init() {
    injectStyles();
    var idx = getCurrentIndex();
    if (idx === -1) return; /* Not a module page */
    injectTimeBadge(idx);
    injectNavigation(idx);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
