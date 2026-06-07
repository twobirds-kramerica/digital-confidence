/* ============================================
   Digital Confidence Centre
   Analytics Consent Banner — Phase 6D
   ============================================

   GA4 Tag ID: G-RPH5H5BM52

   Consent-gated GA4 (Phase 6D):
   - The inline head script on every HTML page no longer loads GA4
     automatically. It only fires GA4 if localStorage 'analytics_consent'
     is already 'true'.
   - New users (no stored value) see the banner. GA4 does not load
     until they click "OK, got it".
   - Users who click "No thanks" have consent stored as 'false' and
     GA4 is disabled for the session.
   ============================================ */

(function () {
  var GA_ID = 'G-RPH5H5BM52';
  var CONSENT_KEY = 'analytics_consent';

  /* ------------------------------------------
     Check stored consent on every page load.
     ------------------------------------------ */
  var stored = null;
  try {
    stored = localStorage.getItem(CONSENT_KEY);
  } catch (e) {
    // localStorage unavailable — treat as not set
  }

  if (stored === 'true') {
    // Consent already given — analytics runs normally.
    return;
  }

  if (stored === 'false') {
    // Consent was explicitly declined — disable GA for this session.
    disableGA();
    return;
  }

  // No stored value — wait for DOM, then show the banner.
  document.addEventListener('DOMContentLoaded', function () {
    showConsentBanner();
  });

  /* ------------------------------------------
     Disable GA4 for the current session.
     ------------------------------------------ */
  function disableGA() {
    window['ga-disable-' + GA_ID] = true;
  }

  /* ------------------------------------------
     Grant consent: store preference and load GA4
     now (it wasn't loaded on page start for new users).
     ------------------------------------------ */
  function grantConsent() {
    try { localStorage.setItem(CONSENT_KEY, 'true'); } catch(e) {}
    // Load and initialise GA4 now (it wasn't loaded on page start)
    if (!window.gtagLoaded) {
      window.gtagLoaded = true;
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
      document.head.appendChild(s);
      s.onload = function() {
        if (typeof window.gtag === 'function') {
          window.gtag('js', new Date());
          window.gtag('config', GA_ID);
          window.gtag('consent', 'update', { analytics_storage: 'granted' });
        }
      };
    } else if (typeof window.gtag === 'function') {
      // GA4 was already loaded (returning user path — shouldn't reach here but safe)
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    // Load Microsoft Clarity now — replace CLARITY_PROJECT_ID at clarity.microsoft.com
    if (!window.clarityLoaded) {
      window.clarityLoaded = true;
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, 'clarity', 'script', 'CLARITY_PROJECT_ID');
    }
  }

  /* ------------------------------------------
     Decline consent: store preference and disable GA.
     ------------------------------------------ */
  function declineConsent() {
    try {
      localStorage.setItem(CONSENT_KEY, 'false');
    } catch (e) {}
    disableGA();
  }

  /* ------------------------------------------
     Build and inject the consent banner.
     ------------------------------------------ */
  function showConsentBanner() {
    var banner = document.createElement('div');
    banner.id = 'dc-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Analytics consent');
    banner.setAttribute('aria-live', 'polite');

    banner.innerHTML =
      '<div class="dc-consent-inner">' +
        '<p class="dc-consent-text">' +
          'We use analytics to understand how people use this site and improve it. ' +
          'No personal information is collected. ' +
          '<a href="privacy.html" class="dc-consent-learn">Learn more</a>' +
        '</p>' +
        '<div class="dc-consent-actions">' +
          '<button id="dc-consent-ok" class="dc-consent-btn-ok">OK, got it</button>' +
          '<button id="dc-consent-no" class="dc-consent-btn-no">No thanks</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    /* Bind OK button */
    var okBtn = document.getElementById('dc-consent-ok');
    if (okBtn) {
      okBtn.addEventListener('click', function () {
        grantConsent();
        removeBanner(banner);
      });
    }

    /* Bind No thanks button */
    var noBtn = document.getElementById('dc-consent-no');
    if (noBtn) {
      noBtn.addEventListener('click', function() {
        declineConsent();
        removeBanner(banner);
      });
    }
  }

  /* ------------------------------------------
     Remove the banner with a brief fade-out.
     ------------------------------------------ */
  function removeBanner(banner) {
    banner.style.transition = 'opacity 0.3s ease';
    banner.style.opacity = '0';
    setTimeout(function () {
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 320);
  }

})();
