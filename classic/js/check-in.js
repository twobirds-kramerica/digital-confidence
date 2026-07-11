/* ============================================================
   DCC — "Still with us?" gentle check-in banner (S-030)
   Shows a non-blocking banner bottom-left after:
     - 8 minutes of no scroll activity, OR
     - the user crosses the midpoint of the page (whichever first)
   Respects per-user opt-out saved in localStorage.
   ============================================================ */

(function () {
  'use strict';

  var IDLE_MS          = 8 * 60 * 1000;   /* 8 minutes */
  var SESSION_COOLDOWN = 15 * 60 * 1000;  /* once per 15 minutes per page */
  var OPT_OUT_KEY      = 'dcc-check-in-opt-out';
  var LAST_SHOWN_KEY   = 'dcc-check-in-last-shown';
  var SCROLL_Y_KEY     = 'dcc-check-in-scroll:';

  var banner;
  var idleTimer;
  var triggered = false;

  function init() {
    if (localStorage.getItem(OPT_OUT_KEY) === '1') return;
    if (!onModulePage()) return;
    if (recentlyShown()) return;

    buildBanner();
    restoreScrollIfRequested();
    armTriggers();
  }

  function onModulePage() {
    var p = location.pathname.toLowerCase();
    return /module-/.test(p);
  }

  function recentlyShown() {
    var last = parseInt(localStorage.getItem(LAST_SHOWN_KEY) || '0', 10);
    return last && (Date.now() - last < SESSION_COOLDOWN);
  }

  function buildBanner() {
    if (document.getElementById('dcc-check-in')) return;
    banner = document.createElement('aside');
    banner.id = 'dcc-check-in';
    banner.className = 'check-in-banner';
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('hidden', '');

    var inner = document.createElement('div');
    inner.className = 'check-in-banner__inner';

    var msg = document.createElement('p');
    msg.className = 'check-in-banner__msg';
    msg.textContent = 'Take a break if you need one. This page will be here when ' +
                      'you’re back — your spot is saved.';

    var actions = document.createElement('div');
    actions.className = 'check-in-banner__actions';

    var keep = document.createElement('button');
    keep.type = 'button';
    keep.className = 'check-in-banner__btn check-in-banner__btn--primary';
    keep.textContent = 'Keep going';
    keep.addEventListener('click', function () { dismiss(false); });

    var later = document.createElement('button');
    later.type = 'button';
    later.className = 'check-in-banner__btn';
    later.textContent = 'I’ll come back later';
    later.addEventListener('click', function () { saveAndClose(); });

    var optOut = document.createElement('button');
    optOut.type = 'button';
    optOut.className = 'check-in-banner__optout';
    optOut.textContent = 'Don’t show this again';
    optOut.addEventListener('click', function () {
      localStorage.setItem(OPT_OUT_KEY, '1');
      dismiss(false);
    });

    actions.appendChild(keep);
    actions.appendChild(later);
    inner.appendChild(msg);
    inner.appendChild(actions);
    inner.appendChild(optOut);
    banner.appendChild(inner);
    document.body.appendChild(banner);
  }

  function armTriggers() {
    resetIdleTimer();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer, { passive: true });
  }

  function resetIdleTimer() {
    if (triggered) return;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { trigger('idle'); }, IDLE_MS);
  }

  function onScroll() {
    resetIdleTimer();
    if (triggered) return;
    var h = document.documentElement;
    var totalScroll = h.scrollHeight - h.clientHeight;
    if (totalScroll <= 0) return;
    var pct = (h.scrollTop || document.body.scrollTop) / totalScroll;
    if (pct >= 0.5) trigger('midpoint');
  }

  function trigger(reason) {
    if (triggered || !banner) return;
    triggered = true;
    clearTimeout(idleTimer);
    banner.dataset.trigger = reason;
    banner.removeAttribute('hidden');
    banner.classList.add('is-visible');
    localStorage.setItem(LAST_SHOWN_KEY, String(Date.now()));
  }

  function dismiss(keepScroll) {
    if (!banner) return;
    banner.classList.remove('is-visible');
    banner.setAttribute('hidden', '');
    if (keepScroll === false) {
      try { localStorage.removeItem(SCROLL_Y_KEY + pageSlug()); } catch (e) {}
    }
  }

  function saveAndClose() {
    try {
      localStorage.setItem(SCROLL_Y_KEY + pageSlug(),
        String(window.scrollY || window.pageYOffset || 0));
    } catch (e) {}
    dismiss(true);
  }

  function restoreScrollIfRequested() {
    /* If the user previously hit "I'll come back later" on this page,
       jump to where they left off once the DOM is painted. */
    try {
      var y = parseInt(localStorage.getItem(SCROLL_Y_KEY + pageSlug()) || '0', 10);
      if (y > 100) {
        setTimeout(function () {
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 400);
      }
    } catch (e) {}
  }

  function pageSlug() {
    var p = location.pathname.split('/').pop() || 'index';
    return p.replace(/\.html?$/, '') || 'index';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
