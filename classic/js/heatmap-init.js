/* ============================================================
   Digital Confidence Centre — Heatmap & Session Recording Init
   Supports Hotjar (primary) with Microsoft Clarity as fallback.

   SETUP:
   1. Create a Hotjar account at hotjar.com
   2. Replace HOTJAR_SITE_ID below with your numeric site ID
   3. Optionally replace CLARITY_PROJECT_ID for Microsoft Clarity
   4. Both are free tiers — no payment needed for this traffic level

   PRIVACY:
   - Hotjar automatically masks form fields (passwords etc.)
   - Session recordings are anonymised — no PII captured
   - Complies with PIPEDA (Canada's federal privacy law)
   - Add opt-out link in privacy policy (provided below)
   ============================================================ */

(function () {
  'use strict';

  /* ── Configuration ── */
  var HOTJAR_SITE_ID    = 'YOUR_HOTJAR_SITE_ID';   /* e.g. 3812456 */
  var HOTJAR_VERSION    = 6;
  var CLARITY_PROJECT_ID = 'YOUR_CLARITY_PROJECT_ID'; /* e.g. abc123xyz */

  /* Only load heatmaps when user has had time to interact (3s delay)
     to avoid capturing immediate bounces and slowing initial load */
  var LOAD_DELAY_MS = 3000;

  /* Skip on localhost / staging to avoid polluting data */
  var hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1' ||
      hostname.includes('.local') || hostname.includes('staging')) {
    console.info('[DCC Heatmap] Skipping heatmap load on dev/staging environment.');
    return;
  }

  /* Respect user opt-out */
  if (localStorage.getItem('dc-heatmap-optout') === 'true') {
    console.info('[DCC Heatmap] User opted out of heatmap tracking.');
    return;
  }

  /* ── Hotjar Initialisation ── */
  function loadHotjar() {
    if (HOTJAR_SITE_ID === 'YOUR_HOTJAR_SITE_ID') {
      console.warn('[DCC Heatmap] Hotjar site ID not configured. Set HOTJAR_SITE_ID in js/heatmap-init.js');
      return;
    }

    /* Official Hotjar snippet (minified) */
    (function (h, o, t, j, a, r) {
      h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments); };
      h._hjSettings = { hjid: parseInt(HOTJAR_SITE_ID, 10), hjsv: HOTJAR_VERSION };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

    /* Tag beta testers for separate Hotjar segment */
    if (window.hj && localStorage.getItem('dc-beta-tester') === 'true') {
      hj('identify', null, { beta_tester: true });
    }
  }

  /* ── Microsoft Clarity Initialisation (optional fallback / comparison) ── */
  function loadClarity() {
    if (CLARITY_PROJECT_ID === 'YOUR_CLARITY_PROJECT_ID') return; /* not configured */

    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
  }

  /* ── Delayed Load ── */
  if (document.readyState === 'complete') {
    setTimeout(loadHotjar, LOAD_DELAY_MS);
    setTimeout(loadClarity, LOAD_DELAY_MS + 500);
  } else {
    window.addEventListener('load', function () {
      setTimeout(loadHotjar, LOAD_DELAY_MS);
      setTimeout(loadClarity, LOAD_DELAY_MS + 500);
    });
  }

  /* ── Opt-out API ── */
  /* Expose so privacy policy page can call DCC.heatmap.optOut() */
  window.DCC = window.DCC || {};
  window.DCC.heatmap = {
    optOut: function () {
      localStorage.setItem('dc-heatmap-optout', 'true');
      /* Hotjar official opt-out */
      if (window._hjSettings) {
        window._hjSettings.hjid = null;
      }
      console.info('[DCC Heatmap] Opted out. Refresh to apply.');
    },
    optIn: function () {
      localStorage.removeItem('dc-heatmap-optout');
      console.info('[DCC Heatmap] Opted back in. Refresh to apply.');
    }
  };

})();

/* ── Privacy Policy Snippet ──────────────────────────────────

Add this to privacy.html under "Analytics & Tracking":

<p>We use Hotjar to understand how visitors interact with our
content — what they click, how far they scroll, and where they
get confused. Session recordings are anonymised and do not
capture passwords or personal details.</p>

<p>To opt out of heatmap recording:
  <a href="#" onclick="DCC.heatmap.optOut(); this.textContent='Opted out ✓'; return false;">
    Opt out of session recording
  </a>
</p>

────────────────────────────────────────────────────────────── */
