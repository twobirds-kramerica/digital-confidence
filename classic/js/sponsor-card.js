/* ============================================
   Digital Confidence Centre
   Sponsor Card — Phase 6A
   ============================================

   sponsors.json entry format:
   {
     "id": "example-sponsor",
     "moduleTarget": "module-6",   // module slug OR "all"
     "name": "Example Financial Institution",
     "description": "One-line description of the sponsor",
     "ctaUrl": "https://example.com",
     "ctaText": "Learn more \u2192",
     "logoUrl": null               // reserved for future use
   }

   Place sponsors.json at /_sponsors/sponsors.json.
   Add entries to the "sponsors" array to activate cards.
   Empty array = no cards rendered anywhere (safe default).
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  /* ------------------------------------------
     1. Determine the current module identifier
     ------------------------------------------ */
  var currentModule = '';

  // Prefer data-module attribute on <body> if present
  if (document.body.dataset && document.body.dataset.module) {
    currentModule = document.body.dataset.module.trim();
  } else {
    // Derive from the page filename (e.g. "module-6" from "module-6.html")
    var pathname = window.location.pathname;
    var filename = pathname.split('/').pop() || '';
    var match = filename.match(/^(module-[\w-]+)\.html$/);
    if (match) {
      currentModule = match[1];
    }
  }

  /* ------------------------------------------
     2. Fetch the sponsors data file
     ------------------------------------------ */
  fetch('/_sponsors/sponsors.json')
    .then(function (response) {
      if (!response.ok) { return null; }
      return response.json();
    })
    .then(function (data) {
      if (!data || !Array.isArray(data.sponsors) || data.sponsors.length === 0) {
        return; // No sponsors configured — silent exit
      }

      /* ----------------------------------------
         3. Find matching sponsors for this page
         ---------------------------------------- */
      var matches = data.sponsors.filter(function (sponsor) {
        if (!sponsor || !sponsor.moduleTarget) { return false; }
        var target = sponsor.moduleTarget.trim().toLowerCase();
        return target === 'all' || target === currentModule.toLowerCase();
      });

      if (matches.length === 0) { return; } // No match — silent exit

      /* ----------------------------------------
         4. Render and inject each matching card
         ---------------------------------------- */
      var insertionPoint = findInsertionPoint();
      if (!insertionPoint) { return; }

      matches.forEach(function (sponsor) {
        var card = buildSponsorCard(sponsor);
        insertionPoint.parentNode.insertBefore(card, insertionPoint);
      });
    })
    .catch(function () {
      // Network or parse error — fail silently, never break the page
    });
});

/* --------------------------------------------------
   Find where to insert the sponsor card.
   Target: immediately before <footer> inside
   .main-content or <main>. Falls back to before
   the closing of the nearest container.
   -------------------------------------------------- */
function findInsertionPoint() {
  var containers = [
    document.querySelector('.main-content'),
    document.querySelector('main')
  ];

  for (var i = 0; i < containers.length; i++) {
    var container = containers[i];
    if (!container) { continue; }
    var footer = container.querySelector('footer');
    if (footer) { return footer; }
    // No footer inside container — append as last child
    return null; // let caller append to container
  }
  return null;
}

/* --------------------------------------------------
   Build the sponsor card DOM node from an entry.
   -------------------------------------------------- */
function buildSponsorCard(sponsor) {
  var name = escapeHtml(sponsor.name || '');
  var desc = escapeHtml(sponsor.description || '');
  var ctaUrl = sponsor.ctaUrl || '#';
  var ctaText = escapeHtml(sponsor.ctaText || 'Learn more');

  var card = document.createElement('div');
  card.className = 'dc-sponsor-card';
  card.setAttribute('aria-label', 'Featured Partner');

  card.innerHTML =
    '<div class="dc-sponsor-badge">Featured Partner</div>' +
    '<div class="dc-sponsor-body">' +
      '<div class="dc-sponsor-logo-placeholder" aria-hidden="true">\uD83C\uDFE2</div>' +
      '<div class="dc-sponsor-info">' +
        '<div class="dc-sponsor-name">' + name + '</div>' +
        '<div class="dc-sponsor-desc">' + desc + '</div>' +
      '</div>' +
      '<a href="' + escapeAttr(ctaUrl) + '" class="dc-sponsor-cta" ' +
        'target="_blank" rel="noopener noreferrer sponsored">' + ctaText + '</a>' +
    '</div>' +
    '<div class="dc-sponsor-disclosure">Sponsored content \u2014 ' + name +
      ' supports the Digital Confidence Centre</div>';

  return card;
}

/* --------------------------------------------------
   Utility: escape HTML to prevent XSS from JSON data
   -------------------------------------------------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
