/* ============================================
   Location Confirmation Prompt
   resources.html only — helps users see local resources
   ============================================ */

(function () {
  'use strict';

  var CITY_LABELS = {
    windsor:   'Windsor',
    london:    'London',
    stthomas:  'St. Thomas',
    woodstock: 'Woodstock',
    kitchener: 'Kitchener / Waterloo'
  };

  /* ---------- helpers ---------- */

  function getContainer() {
    return document.getElementById('local-resources');
  }

  function getCurrentCityName() {
    var key = localStorage.getItem('dc-city');
    return (key && CITY_LABELS[key]) ? CITY_LABELS[key] : null;
  }

  function removeBanner() {
    var b = document.getElementById('lp-banner');
    if (b) b.parentNode.removeChild(b);
  }

  function removeChangeBtn() {
    var b = document.getElementById('lp-change-wrap');
    if (b) b.parentNode.removeChild(b);
  }

  /* ---------- Change Location button ---------- */

  function addChangeBtn() {
    removeChangeBtn();
    var cityName = getCurrentCityName();
    var container = getContainer();
    if (!container) return;

    var wrap = document.createElement('div');
    wrap.id = 'lp-change-wrap';
    wrap.className = 'lp-change-wrap';

    if (cityName) {
      wrap.innerHTML =
        '<p class="lp-city-label">Showing resources for <strong>' + cityName + '</strong></p>' +
        '<button class="lp-change-btn" id="lp-change-btn" aria-label="Change your location">📍 Change My Location</button>';
    } else {
      wrap.innerHTML =
        '<button class="lp-change-btn" id="lp-change-btn" aria-label="Select your location">📍 Select My City</button>';
    }

    container.insertBefore(wrap, container.firstChild);
    document.getElementById('lp-change-btn').addEventListener('click', showBanner);
  }

  /* ---------- City selection ---------- */

  function selectCity(key) {
    if (key) {
      localStorage.setItem('dc-city', key);
    }
    localStorage.setItem('dc-location-confirmed', 'true');
    removeBanner();
    /* Re-render resources for chosen city */
    if (typeof dcRenderResourcesPage === 'function') {
      dcRenderResourcesPage();
    }
    addChangeBtn();
  }

  function selectOntarioWide() {
    /* Keep dc-city as-is (or absent) — just show national resources */
    localStorage.removeItem('dc-city');
    localStorage.setItem('dc-location-confirmed', 'true');
    removeBanner();

    /* Show all cities with national resources via dcRenderResourcesPage.
       Because dcGetCity() defaults to 'windsor' we replace content manually. */
    var container = getContainer();
    if (!container) return;

    if (typeof dcRenderResourcesPage === 'function') {
      /* Temporarily monkey-patch dcGetCity to return null so all cities display */
      var orig = window.dcGetCity;
      window.dcGetCity = function () { return null; };
      dcRenderResourcesPage();
      window.dcGetCity = orig;
    }
    addChangeBtn();
  }

  /* ---------- Banner ---------- */

  function showBanner() {
    removeBanner();
    removeChangeBtn();

    var container = getContainer();
    if (!container) return;

    var cityBtns = Object.keys(CITY_LABELS).map(function (key) {
      return '<button class="lp-city-btn" data-city="' + key + '">' + CITY_LABELS[key] + '</button>';
    }).join('');

    var banner = document.createElement('div');
    banner.id = 'lp-banner';
    banner.className = 'lp-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Choose your location');
    banner.innerHTML =
      '<div class="lp-inner">' +
        '<div class="lp-icon" aria-hidden="true">📍</div>' +
        '<h2 class="lp-heading">Where are you located?</h2>' +
        '<p class="lp-subtext">We\'ll show you phone numbers and programs near you — library tech help, senior services, and more.</p>' +
        '<div class="lp-city-grid">' + cityBtns + '</div>' +
        '<p class="lp-or-text">Not in any of these cities?</p>' +
        '<button class="lp-ontario-btn" id="lp-ontario-btn">Show Ontario-wide resources only</button>' +
      '</div>';

    /* Insert above the #local-resources container */
    container.parentNode.insertBefore(banner, container);

    /* Bind city buttons */
    banner.querySelectorAll('.lp-city-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectCity(btn.getAttribute('data-city'));
      });
    });

    /* Bind Ontario-wide button */
    document.getElementById('lp-ontario-btn').addEventListener('click', selectOntarioWide);

    /* Scroll banner into view on mobile */
    banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ---------- Init ---------- */

  function init() {
    /* Only run on resources page */
    if (!getContainer()) return;

    var cityKey   = localStorage.getItem('dc-city');
    var confirmed = localStorage.getItem('dc-location-confirmed');

    if (!confirmed && !cityKey) {
      /* First visit — no city ever chosen → show banner */
      showBanner();
    } else {
      /* City is set or user has already confirmed — just show change button */
      addChangeBtn();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
