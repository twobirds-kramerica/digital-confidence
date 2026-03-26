/* ============================================
   Digital Confidence Centre — Search Engine
   ============================================ */
(function () {
  var DEBOUNCE_MS = 180;
  var MAX_RESULTS = 8;

  function normalise(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ');
  }

  function score(item, terms) {
    var titleN = normalise(item.title);
    var excerptN = normalise(item.excerpt);
    var pts = 0;
    terms.forEach(function (t) {
      if (titleN.indexOf(t) !== -1) pts += 3;
      if (excerptN.indexOf(t) !== -1) pts += 1;
    });
    return pts;
  }

  function search(query) {
    if (!window.DC_SEARCH_INDEX) return [];
    var terms = normalise(query).split(/\s+/).filter(function (t) { return t.length >= 2; });
    if (!terms.length) return [];
    return window.DC_SEARCH_INDEX
      .map(function (item) { return { item: item, score: score(item, terms) }; })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, MAX_RESULTS)
      .map(function (r) { return r.item; });
  }

  function getBaseUrl() {
    // Detect depth from current path to build correct relative URLs
    var path = window.location.pathname;
    var parts = path.split('/').filter(Boolean);
    // Count path depth relative to the site root
    // e.g. /digital-confidence/module-1.html = depth 1 (one level from root)
    // e.g. /digital-confidence/resources/support-directory.html = depth 2
    var siteRoot = parts.indexOf('digital-confidence');
    if (siteRoot === -1) return './';
    var depth = parts.length - siteRoot - 2; // files after the site root
    if (depth <= 0) return './';
    return '../'.repeat(depth);
  }

  function typeColour(type) {
    var map = { 'Module': '#00C9A7', 'Page': '#6366f1', 'Glossary': '#F4A261', 'FAQ': '#2ECC71', 'Scam Scenario': '#E74C3C' };
    return map[type] || '#8AA0B8';
  }

  function injectStyles() {
    if (document.getElementById('dc-search-styles')) return;
    var style = document.createElement('style');
    style.id = 'dc-search-styles';
    style.textContent = [
      '.dc-search-wrap{position:relative;padding:10px 16px 6px;}',
      '.dc-search-input{width:100%;padding:8px 32px 8px 10px;background:#0a1520;border:1px solid #243d59;border-radius:8px;color:#F0F4F8;font-size:0.9em;outline:none;}',
      '.dc-search-input:focus{border-color:#00C9A7;}',
      '.dc-search-icon{position:absolute;right:26px;top:50%;transform:translateY(-50%);color:#8AA0B8;pointer-events:none;font-style:normal;}',
      '.dc-search-dropdown{position:absolute;left:16px;right:16px;top:calc(100% - 4px);background:#1A2D44;border:1px solid #243d59;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.4);z-index:200;overflow:hidden;display:none;}',
      '.dc-search-dropdown.open{display:block;}',
      '.dc-search-result{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;cursor:pointer;border-bottom:1px solid #243d59;text-decoration:none;color:#F0F4F8;}',
      '.dc-search-result:last-child{border-bottom:none;}',
      '.dc-search-result:hover,.dc-search-result:focus{background:#243d59;outline:none;}',
      '.dc-result-type{flex-shrink:0;font-size:0.68em;font-weight:700;padding:2px 6px;border-radius:10px;margin-top:2px;text-transform:uppercase;}',
      '.dc-result-body strong{display:block;font-size:0.88em;}',
      '.dc-result-body span{font-size:0.78em;color:#8AA0B8;line-height:1.3;}',
      '.dc-search-empty{padding:12px 14px;color:#8AA0B8;font-size:0.85em;}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildWidget() {
    var sidebar = document.querySelector('aside.sidebar nav');
    if (!sidebar) return;

    var wrap = document.createElement('div');
    wrap.className = 'dc-search-wrap';
    wrap.innerHTML =
      '<input type="search" class="dc-search-input" id="dcSearchInput" placeholder="Search modules, FAQs, glossary\u2026" autocomplete="off" aria-label="Search site" aria-owns="dcSearchDropdown" aria-haspopup="listbox">' +
      '<i class="dc-search-icon" aria-hidden="true">🔍</i>' +
      '<div class="dc-search-dropdown" id="dcSearchDropdown" role="listbox"></div>';

    // Insert before the first <a> in nav
    sidebar.insertBefore(wrap, sidebar.firstChild);

    var input = wrap.querySelector('#dcSearchInput');
    var dropdown = wrap.querySelector('#dcSearchDropdown');
    var timer;

    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var q = input.value.trim();
        if (!q) { closeDropdown(dropdown); return; }
        var results = search(q);
        renderDropdown(dropdown, results, q);
      }, DEBOUNCE_MS);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDropdown(dropdown); input.blur(); }
      if (e.key === 'ArrowDown') {
        var first = dropdown.querySelector('.dc-search-result');
        if (first) { e.preventDefault(); first.focus(); }
      }
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closeDropdown(dropdown);
    });
  }

  function renderDropdown(dropdown, results, query) {
    var base = getBaseUrl();
    if (!results.length) {
      dropdown.innerHTML = '<div class="dc-search-empty">No results for "' + query + '"</div>';
      dropdown.classList.add('open');
      return;
    }
    dropdown.innerHTML = results.map(function (r) {
      var colour = typeColour(r.type);
      var url = base + r.url;
      return '<a class="dc-search-result" href="' + url + '" role="option">' +
        '<span class="dc-result-type" style="background:' + colour + '20;color:' + colour + '">' + r.type + '</span>' +
        '<div class="dc-result-body"><strong>' + r.title + '</strong><span>' + r.excerpt + '</span></div>' +
        '</a>';
    }).join('');

    // Arrow key nav
    var links = dropdown.querySelectorAll('.dc-search-result');
    links.forEach(function (link, i) {
      link.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' && links[i+1]) { e.preventDefault(); links[i+1].focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); (i > 0 ? links[i-1] : dropdown.previousElementSibling).focus(); }
        if (e.key === 'Escape') { closeDropdown(dropdown); dropdown.previousElementSibling.focus(); }
      });
    });

    dropdown.classList.add('open');
  }

  function closeDropdown(dropdown) {
    dropdown.classList.remove('open');
    dropdown.innerHTML = '';
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    buildWidget();
  });
})();
