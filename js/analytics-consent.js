/* ============================================
   Digital Confidence Centre
   Analytics Consent Banner — Phase 6C
   ============================================

   GA4 Tag ID: G-RPH5H5BM52

   INTEGRATION NOTE FOR FUTURE UPDATE:
   The GA4 gtag('config', 'G-RPH5H5BM52') call is currently inline
   in each HTML file's <head>. To honour consent properly, move that
   call out of the <head> inline script and instead fire it only from
   the grantAnalyticsConsent() function below.

   Steps to complete the migration:
     1. In each HTML file, change the GA4 inline script to load the
        gtag library but NOT call gtag('config', ...).
        Keep: gtag('js', new Date());
        Remove: gtag('config', 'G-RPH5H5BM52');
     2. Let this script call gtag('config', ...) after consent.
     3. Set window['ga-disable-G-RPH5H5BM52'] = true BEFORE the
        gtag library loads for users who have declined.

   Until that migration is complete, this script:
   - Does NOT fire a second pageview (avoiding duplicate hits).
   - Sets the disable flag if consent is declined, which stops
     all future GA4 events during the session.
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
     Grant consent: store preference and enable GA.
     Does NOT fire a second pageview event.
     ------------------------------------------ */
  function grantConsent() {
    try {
      localStorage.setItem(CONSENT_KEY, 'true');
    } catch (e) {}
    // If gtag is available, update consent state.
    // The initial pageview has already fired from the inline head script.
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
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
          'We use analytics to understand how seniors use this site and improve it. ' +
          'No personal information is collected. ' +
          '<a href="privacy.html" class="dc-consent-learn">Learn more</a>' +
        '</p>' +
        '<div class="dc-consent-actions">' +
          '<button id="dc-consent-ok" class="dc-consent-btn-ok">OK, got it</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    /* Bind button */
    var okBtn = document.getElementById('dc-consent-ok');
    if (okBtn) {
      okBtn.addEventListener('click', function () {
        grantConsent();
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
