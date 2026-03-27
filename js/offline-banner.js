/* ============================================================
   Digital Confidence Centre — Offline Banner
   Shows a gentle notice when the user loses internet connection.
   ============================================================ */

(function () {
  'use strict';

  /* Register service worker */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function (err) {
        /* Silent fail — offline support is an enhancement, not required */
        void err;
      });
    });
  }

  /* Create and inject the offline banner */
  function createBanner() {
    var banner = document.createElement('div');
    banner.id = 'offline-banner';
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-live', 'polite');
    banner.style.cssText = [
      'display:none',
      'position:fixed',
      'bottom:0',
      'left:0',
      'right:0',
      'background:#b71c1c',
      'color:#fff',
      'padding:14px 20px',
      'text-align:center',
      'font-size:1rem',
      'font-family:Georgia,serif',
      'z-index:9999',
      'box-shadow:0 -2px 8px rgba(0,0,0,0.3)'
    ].join(';');
    banner.innerHTML =
      '📵 <strong>You are not connected to the internet.</strong> ' +
      'Some features may not work. ' +
      '<a href="javascript:window.location.reload()" style="color:#fff;text-decoration:underline;margin-left:8px">Try again</a>';
    document.body.appendChild(banner);
    return banner;
  }

  function showBanner(banner) {
    banner.style.display = 'block';
  }

  function hideBanner(banner) {
    banner.style.display = 'none';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var banner = createBanner();

    if (!navigator.onLine) {
      showBanner(banner);
    }

    window.addEventListener('offline', function () {
      showBanner(banner);
    });

    window.addEventListener('online', function () {
      hideBanner(banner);
    });
  });

})();
