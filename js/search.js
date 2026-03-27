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

  var HELPER_HINTS = ['scam', 'video call', 'banking', 'password'];

  function injectStyles() {
    if (document.getElementById('dc-search-styles')) return;
    var style = document.createElement('style');
    style.id = 'dc-search-styles';
    style.textContent = [
      /* Sidebar search */
      '.dc-search-label{font-size:0.72em;font-weight:700;color:#8AA0B8;text-transform:uppercase;letter-spacing:0.06em;padding:10px 16px 2px;display:block;}',
      '.dc-search-wrap{position:relative;padding:0 16px 6px;}',
      '.dc-search-input{width:100%;padding:8px 32px 8px 10px;background:#0a1520;border:1px solid #243d59;border-radius:8px;color:#F0F4F8;font-size:0.9em;outline:none;text-overflow:ellipsis;}',
      '.dc-search-input:focus{border-color:#00C9A7;}',
      '.dc-search-icon{position:absolute;right:26px;top:50%;transform:translateY(-50%);color:#8AA0B8;pointer-events:none;font-style:normal;}',
      '.dc-search-dropdown{position:absolute;left:16px;right:16px;top:calc(100% + 2px);background:#1A2D44;border:1px solid #243d59;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.4);z-index:200;overflow:hidden;display:none;}',
      '.dc-search-dropdown.open{display:block;}',
      /* Helper hints row */
      '.dc-search-hints{padding:8px 14px;display:flex;flex-wrap:wrap;gap:6px;border-bottom:1px solid #243d59;}',
      '.dc-search-hint{font-size:0.75em;color:#8AA0B8;background:#243d59;border:none;border-radius:12px;padding:3px 10px;cursor:pointer;transition:background 0.15s,color 0.15s;}',
      '.dc-search-hint:hover,.dc-search-hint:focus{background:#00C9A7;color:#0a1520;outline:none;}',
      '.dc-search-hints-label{font-size:0.7em;color:#5A6E84;width:100%;padding-bottom:2px;}',
      /* Results */
      '.dc-search-result{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;cursor:pointer;border-bottom:1px solid #243d59;text-decoration:none;color:#F0F4F8;}',
      '.dc-search-result:last-child{border-bottom:none;}',
      '.dc-search-result:hover,.dc-search-result:focus{background:#243d59;outline:none;}',
      '.dc-result-type{flex-shrink:0;font-size:0.68em;font-weight:700;padding:3px 7px;border-radius:10px;margin-top:2px;text-transform:uppercase;white-space:nowrap;}',
      '.dc-result-body strong{display:block;font-size:0.88em;}',
      '.dc-result-body span{font-size:0.78em;color:#8AA0B8;line-height:1.3;}',
      '.dc-search-empty{padding:12px 14px;color:#8AA0B8;font-size:0.85em;}',
      /* Mobile top-bar search */
      '.dc-topbar-search-btn{background:none;border:1px solid rgba(255,255,255,0.2);border-radius:8px;',
      '  color:var(--text-primary);cursor:pointer;width:44px;height:44px;font-size:1.1rem;',
      '  display:none;align-items:center;justify-content:center;flex-shrink:0;}',
      '@media (max-width:1024px){.dc-topbar-search-btn{display:flex;}}',
      '.dc-topbar-search-overlay{display:none;position:fixed;top:0;left:0;width:100%;z-index:1000;',
      '  background:var(--bg-secondary,#F8F9FA);border-bottom:2px solid #00C9A7;padding:8px 12px;',
      '  align-items:center;gap:8px;height:var(--nav-height,64px);}',
      '.dc-topbar-search-overlay.open{display:flex;}',
      '.dc-topbar-search-field{flex:1;padding:10px 14px;background:#0a1520;border:1px solid #243d59;',
      '  border-radius:8px;color:#F0F4F8;font-size:1rem;outline:none;min-height:44px;}',
      '.dc-topbar-search-field:focus{border-color:#00C9A7;}',
      '.dc-topbar-search-close{background:none;border:none;font-size:1.3rem;color:var(--text-primary);',
      '  cursor:pointer;min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;}',
      '.dc-topbar-results{position:fixed;top:var(--nav-height,64px);left:0;right:0;max-height:65vh;',
      '  overflow-y:auto;background:#1A2D44;border-bottom:1px solid #243d59;z-index:999;display:none;}',
      '.dc-topbar-results.open{display:block;}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildHintsHTML() {
    return '<div class="dc-search-hints">' +
      '<span class="dc-search-hints-label">Try searching for:</span>' +
      HELPER_HINTS.map(function (h) {
        return '<button class="dc-search-hint" type="button" tabindex="0">' + h + '</button>';
      }).join('') +
      '</div>';
  }

  function buildWidget() {
    var sidebar = document.querySelector('aside.sidebar nav');
    if (!sidebar) return;

    /* Label above search box */
    var label = document.createElement('p');
    label.className = 'dc-search-label';
    label.textContent = 'Search this site';
    sidebar.insertBefore(label, sidebar.firstChild);

    var wrap = document.createElement('div');
    wrap.className = 'dc-search-wrap';
    wrap.innerHTML =
      '<input type="search" class="dc-search-input" id="dcSearchInput" placeholder="Search modules, FAQs, glossary\u2026" autocomplete="off" aria-label="Search this site" aria-owns="dcSearchDropdown" aria-haspopup="listbox" aria-autocomplete="list">' +
      '<i class="dc-search-icon" aria-hidden="true">🔍</i>' +
      '<div class="dc-search-dropdown" id="dcSearchDropdown" role="listbox" aria-label="Search results"></div>';

    sidebar.insertBefore(wrap, label.nextSibling);

    var input = wrap.querySelector('#dcSearchInput');
    var dropdown = wrap.querySelector('#dcSearchDropdown');
    var timer;

    /* Show helper hints on focus when empty */
    input.addEventListener('focus', function () {
      if (!input.value.trim()) {
        dropdown.innerHTML = buildHintsHTML();
        dropdown.classList.add('open');
        dropdown.querySelectorAll('.dc-search-hint').forEach(function (btn) {
          btn.addEventListener('click', function () {
            input.value = btn.textContent;
            input.focus();
            var results = search(btn.textContent);
            renderDropdown(dropdown, results, btn.textContent);
          });
        });
      }
    });

    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var q = input.value.trim();
        if (!q) {
          dropdown.innerHTML = buildHintsHTML();
          dropdown.classList.add('open');
          dropdown.querySelectorAll('.dc-search-hint').forEach(function (btn) {
            btn.addEventListener('click', function () {
              input.value = btn.textContent;
              input.focus();
              renderDropdown(dropdown, search(btn.textContent), btn.textContent);
            });
          });
          return;
        }
        var results = search(q);
        renderDropdown(dropdown, results, q);
      }, DEBOUNCE_MS);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDropdown(dropdown); input.blur(); }
      if (e.key === 'ArrowDown') {
        var first = dropdown.querySelector('.dc-search-result, .dc-search-hint');
        if (first) { e.preventDefault(); first.focus(); }
      }
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target) && !label.contains(e.target)) closeDropdown(dropdown);
    });

    /* Mobile top-bar search */
    buildMobileSearch();
  }

  function buildMobileSearch() {
    var topBar = document.querySelector('.top-bar');
    if (!topBar || document.getElementById('dc-topbar-search-btn')) return;

    /* Search icon in top bar */
    var btn = document.createElement('button');
    btn.id = 'dc-topbar-search-btn';
    btn.className = 'dc-topbar-search-btn';
    btn.setAttribute('aria-label', 'Open search');
    btn.innerHTML = '🔍';

    /* Insert before home button / after menu button */
    topBar.appendChild(btn);

    /* Search overlay */
    var overlay = document.createElement('div');
    overlay.className = 'dc-topbar-search-overlay';
    overlay.id = 'dc-topbar-search-overlay';
    overlay.innerHTML =
      '<input type="search" class="dc-topbar-search-field" id="dcTopbarSearch" placeholder="Try: scam, banking, password\u2026" autocomplete="off" aria-label="Search this site">' +
      '<button class="dc-topbar-search-close" id="dc-topbar-close" aria-label="Close search">\u00d7</button>';
    document.body.appendChild(overlay);

    /* Results panel */
    var results = document.createElement('div');
    results.className = 'dc-topbar-results';
    results.id = 'dc-topbar-results';
    results.setAttribute('role', 'listbox');
    document.body.appendChild(results);

    var topInput = overlay.querySelector('#dcTopbarSearch');
    var timer2;

    btn.addEventListener('click', function () {
      overlay.classList.add('open');
      setTimeout(function () { topInput.focus(); }, 50);
    });

    overlay.querySelector('#dc-topbar-close').addEventListener('click', function () {
      overlay.classList.remove('open');
      results.classList.remove('open');
      results.innerHTML = '';
      topInput.value = '';
    });

    topInput.addEventListener('input', function () {
      clearTimeout(timer2);
      timer2 = setTimeout(function () {
        var q = topInput.value.trim();
        if (!q) { results.classList.remove('open'); results.innerHTML = ''; return; }
        var hits = search(q);
        if (!hits.length) {
          results.innerHTML = '<div class="dc-search-empty">No results for "' + q + '"</div>';
        } else {
          var base = getBaseUrl();
          results.innerHTML = hits.map(function (r) {
            var colour = typeColour(r.type);
            return '<a class="dc-search-result" href="' + base + r.url + '" role="option">' +
              '<span class="dc-result-type" style="background:' + colour + '20;color:' + colour + '">' + r.type + '</span>' +
              '<div class="dc-result-body"><strong>' + r.title + '</strong><span>' + r.excerpt + '</span></div>' +
              '</a>';
          }).join('');
        }
        results.classList.add('open');
        /* Keyboard nav for top-bar results */
        var links = results.querySelectorAll('.dc-search-result');
        links.forEach(function (link, i) {
          link.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown' && links[i+1]) { e.preventDefault(); links[i+1].focus(); }
            if (e.key === 'ArrowUp') { e.preventDefault(); (i > 0 ? links[i-1] : topInput).focus(); }
            if (e.key === 'Escape') { overlay.querySelector('#dc-topbar-close').click(); }
          });
        });
      }, DEBOUNCE_MS);
    });

    topInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { overlay.querySelector('#dc-topbar-close').click(); }
      if (e.key === 'ArrowDown') {
        var first = results.querySelector('.dc-search-result');
        if (first) { e.preventDefault(); first.focus(); }
      }
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
