/*
 * DCC support-directory regional resources (S-DCC-SUPPORT-DIRECTORY-LOCALIZE-001, 2026-07-29)
 * ---------------------------------------------------------------------------
 * support-directory.html shows National Programmes to everyone (unchanged)
 * plus 13 pre-rendered, hidden-by-default per-province/territory sections.
 * This script lets a visitor optionally reveal their own region's section,
 * three ways: postal-code first letter, browser geolocation (opt-in,
 * client-side only), or a plain <select>. Nothing is sent anywhere -- the
 * postal-prefix table and the geolocation-to-province centroid table both
 * live in this file and never leave the device. Region choice is only
 * saved to localStorage after the visitor picks one.
 *
 * Data source: hal-stack/research/dcc-support-directory-localization-research-2026-07-29.md
 * (Fable, live-verified 2026-07-29) -- postal-prefix table (Wikipedia +
 * ISED FSA definition) and the choice to offer postal-code-first (no
 * permission prompt) with geolocation as a one-tap alternative.
 *
 * Canadian English. No em-dashes.
 */
(function () {
  "use strict";

  if (window.__dccRegionLoaded) { return; }
  window.__dccRegionLoaded = true;

  var STORE_KEY = "dccv2-region";

  var NAMES = {
    ON: "Ontario", QC: "Quebec", BC: "British Columbia", AB: "Alberta",
    MB: "Manitoba", SK: "Saskatchewan", NS: "Nova Scotia", NB: "New Brunswick",
    NL: "Newfoundland and Labrador", PE: "Prince Edward Island",
    YT: "Yukon", NT: "Northwest Territories", NU: "Nunavut"
  };

  // First letter of a Canadian postal code -> province/territory. Verified
  // 2026-07-29 against Wikipedia's "Postal codes in Canada" FSA section and
  // the ISED FSA definition. D/F/I/O/Q/U/W/Z are never used in this position.
  var POSTAL_PREFIX = {
    A: "NL", B: "NS", C: "PE", E: "NB",
    G: "QC", H: "QC", J: "QC",
    K: "ON", L: "ON", M: "ON", N: "ON", P: "ON",
    R: "MB", S: "SK", T: "AB", V: "BC",
    Y: "YT"
    // X is split NT/NU by the first three characters -- handled separately below.
  };

  // Coarse province/territory centroids (largest city, not geographic
  // centre, since that is where most visitors actually are) for a rough
  // "which region is this lat/lng closest to" match. This is deliberately
  // approximate -- a border town may nearest-match its neighbour -- which is
  // fine because geolocation is a one-tap convenience alongside the exact
  // postal-code and <select> paths, not the only way to pick a region.
  var CENTROIDS = [
    { code: "NL", lat: 47.56, lng: -52.71 }, { code: "NS", lat: 44.65, lng: -63.57 },
    { code: "PE", lat: 46.24, lng: -63.13 }, { code: "NB", lat: 45.96, lng: -66.64 },
    { code: "QC", lat: 45.50, lng: -73.57 }, { code: "ON", lat: 43.65, lng: -79.38 },
    { code: "MB", lat: 49.90, lng: -97.14 }, { code: "SK", lat: 50.45, lng: -104.62 },
    { code: "AB", lat: 51.05, lng: -114.07 }, { code: "BC", lat: 49.28, lng: -123.12 },
    { code: "YT", lat: 60.72, lng: -135.05 }, { code: "NT", lat: 62.45, lng: -114.37 },
    { code: "NU", lat: 63.75, lng: -68.52 }
  ];

  function regionFromPostal(raw) {
    var clean = String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!clean) { return null; }
    var first = clean.charAt(0);
    if (first === "X") {
      var prefix3 = clean.slice(0, 3);
      if (prefix3 === "X0A" || prefix3 === "X0B" || prefix3 === "X0C") { return "NU"; }
      return "NT"; // any other X is Northwest Territories
    }
    return POSTAL_PREFIX[first] || null;
  }

  function regionFromLatLng(lat, lng) {
    var best = null, bestDist = Infinity;
    CENTROIDS.forEach(function (c) {
      var d = Math.pow(c.lat - lat, 2) + Math.pow(c.lng - lng, 2);
      if (d < bestDist) { bestDist = d; best = c.code; }
    });
    return best;
  }

  function boot() {
    var picker = document.getElementById("region-picker");
    if (!picker) { return; }

    var form = document.getElementById("region-form");
    var postalInput = document.getElementById("region-postal");
    var geoBtn = document.getElementById("region-geo");
    var select = document.getElementById("region-select");
    var postalError = document.getElementById("region-postal-error");
    var confirm = document.getElementById("region-confirm");
    var confirmName = document.getElementById("region-confirm-name");
    var changeBtn = document.getElementById("region-change");
    var clearBtn = document.getElementById("region-clear");
    var sections = document.getElementById("region-sections");

    function showRegion(code, save) {
      if (!code || !NAMES[code]) { return; }
      var section = sections ? sections.querySelector('[data-region="' + code + '"]') : null;
      if (!section) { return; }
      (sections.querySelectorAll("[data-region]") || []).forEach(function (s) { s.hidden = true; });
      section.hidden = false;
      confirmName.textContent = NAMES[code];
      confirm.hidden = false;
      form.hidden = true;
      select.value = code;
      if (postalError) { postalError.hidden = true; }
      if (save) {
        try { localStorage.setItem(STORE_KEY, code); } catch (e) { /* ignore */ }
      }
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function clearRegion() {
      if (sections) {
        (sections.querySelectorAll("[data-region]") || []).forEach(function (s) { s.hidden = true; });
      }
      confirm.hidden = true;
      form.hidden = false;
      select.value = "";
      postalInput.value = "";
      try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ }
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var code = regionFromPostal(postalInput.value);
      if (!code) {
        if (postalError) { postalError.hidden = false; }
        return;
      }
      showRegion(code, true);
    });

    if (geoBtn && "geolocation" in navigator) {
      geoBtn.addEventListener("click", function () {
        geoBtn.disabled = true;
        var originalText = geoBtn.textContent;
        geoBtn.textContent = "Finding your province...";
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            geoBtn.disabled = false;
            geoBtn.textContent = originalText;
            var code = regionFromLatLng(pos.coords.latitude, pos.coords.longitude);
            showRegion(code, true);
          },
          function () {
            geoBtn.disabled = false;
            geoBtn.textContent = originalText;
            // Denied or unavailable: no error scolding, per anxiety-first --
            // the postal-code and dropdown paths are right there instead.
          },
          { timeout: 8000, maximumAge: 300000 }
        );
      });
    } else if (geoBtn) {
      geoBtn.hidden = true; // no Geolocation API: postal code + dropdown remain
    }

    select.addEventListener("change", function () {
      if (select.value) { showRegion(select.value, true); }
    });

    changeBtn.addEventListener("click", clearRegion);
    clearBtn.addEventListener("click", clearRegion);

    // Returning visitor who already chose a region: show it again without
    // re-asking, but "Show Canada-wide list only" always remains one click away.
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* ignore */ }
    if (saved && NAMES[saved]) { showRegion(saved, false); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
