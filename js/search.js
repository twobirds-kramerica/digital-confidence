/* ============================================
   Digital Confidence Centre — Search Engine
   v2.0 — Advanced search: filters, highlights,
   recent searches, / shortcut, bilingual
   ============================================ */
(function () {
  'use strict';

  var DEBOUNCE_MS = 180;
  var MAX_RESULTS = 12;
  var RECENT_KEY  = 'dc-recent-searches';
  var MAX_RECENT  = 5;

  var FILTER_TABS = ['All', 'Modules', 'Tips', 'FAQs', 'Glossary', 'Scam Guides'];

  var TYPE_TO_TAB = {
    'Module': 'Modules',
    'Tip': 'Tips',
    'FAQ': 'FAQs',
    'Glossary': 'Glossary',
    'Scam Guide': 'Scam Guides',
    'Scam Scenario': 'Scam Guides',
    'Page': 'All'
  };

  var activeTab = 'All';

  // ── Utility ──────────────────────────────────────────────────────────────
  function normalise(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ');
  }

  function escHtml(s) {
    return String(s || '')
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  function highlight(text, terms) {
    var safe = escHtml(text);
    if (!terms || !terms.length) return safe;
    var pattern = new RegExp('(' + terms.map(function(t){
      return t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    }).join('|') + ')', 'gi');
    return safe.replace(pattern, '<mark>$1</mark>');
  }

  function score(item, terms) {
    var titleN   = normalise(item.title);
    var excerptN = normalise(item.excerpt);
    var pts = 0;
    terms.forEach(function (t) {
      if (titleN.indexOf(t)   !== -1) pts += 4;
      if (excerptN.indexOf(t) !== -1) pts += 1;
    });
    return pts;
  }

  function search(query, tab) {
    if (!window.DC_SEARCH_INDEX) return [];
    var terms = normalise(query).split(/\s+/).filter(function (t) { return t.length >= 2; });
    if (!terms.length) return [];
    return window.DC_SEARCH_INDEX
      .filter(function (item) {
        if (tab && tab !== 'All') {
          var itemTab = TYPE_TO_TAB[item.type] || 'All';
          if (itemTab !== tab && item.type !== tab) return false;
        }
        return true;
      })
      .map(function (item) { return { item: item, score: score(item, terms) }; })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, MAX_RESULTS)
      .map(function (r) { return r.item; });
  }

  // ── Recent Searches ──────────────────────────────────────────────────────
  function getRecent() {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    } catch (e) { return []; }
  }

  function saveRecent(q) {
    if (!q || q.length < 2) return;
    try {
      var list = getRecent().filter(function(r){ return r !== q; });
      list.unshift(q);
      if (list.length > MAX_RECENT) list = list.slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  // ── Base URL helper ──────────────────────────────────────────────────────
  function getBaseUrl() {
    var path  = window.location.pathname;
    var parts = path.split('/').filter(Boolean);
    var siteRoot = parts.indexOf('digital-confidence');
    if (siteRoot === -1) {
      // Try GitHub Pages: first segment is repo name
      var depth = parts.length - 1;
      if (depth <= 0) return './';
      return '../'.repeat(depth);
    }
    var depth = parts.length - siteRoot - 2;
    if (depth <= 0) return './';
    return '../'.repeat(depth);
  }

  // ── Type colour ──────────────────────────────────────────────────────────
  function typeColour(type) {
    var map = {
      'Module': '#00C9A7',
      'Tip': '#6366f1',
      'Scam Guide': '#E74C3C',
      'Scam Scenario': '#E74C3C',
      'Glossary': '#F4A261',
      'FAQ': '#2ECC71',
      'Page': '#8AA0B8'
    };
    return map[type] || '#8AA0B8';
  }

  // ── Bilingual label ──────────────────────────────────────────────────────
  function isFr() {
    return (localStorage.getItem('dc-lang') || navigator.language || 'en').startsWith('fr');
  }

  function t(en, fr) { return isFr() ? fr : en; }

  // ── Styles ───────────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('dc-search-styles')) return;
    var style = document.createElement('style');
    style.id = 'dc-search-styles';
    style.textContent = [
      // Sidebar search
      '.dc-search-label{font-size:0.72em;font-weight:700;color:#8AA0B8;text-transform:uppercase;letter-spacing:0.06em;padding:10px 16px 2px;display:block;}',
      '.dc-search-wrap{position:relative;padding:0 16px 6px;}',
      '.dc-search-input{width:100%;padding:8px 32px 8px 10px;background:#0a1520;border:1px solid #243d59;border-radius:8px;color:#F0F4F8;font-size:0.9em;outline:none;text-overflow:ellipsis;}',
      '.dc-search-input:focus{border-color:#00C9A7;}',
      '.dc-search-icon{position:absolute;right:26px;top:50%;transform:translateY(-50%);color:#8AA0B8;pointer-events:none;font-style:normal;}',
      // Dropdown
      '.dc-search-dropdown{position:absolute;left:16px;right:16px;top:calc(100% + 2px);background:#1A2D44;border:1px solid #243d59;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.4);z-index:200;overflow:hidden;display:none;max-height:75vh;overflow-y:auto;}',
      '.dc-search-dropdown.open{display:block;}',
      // Filter tabs
      '.dc-search-tabs{display:flex;flex-wrap:wrap;gap:4px;padding:8px 10px;border-bottom:1px solid #243d59;background:#131f2e;}',
      '.dc-stab{font-size:0.7em;font-weight:700;padding:3px 9px;border-radius:10px;border:1px solid #243d59;background:transparent;color:#8AA0B8;cursor:pointer;transition:background 0.15s,color 0.15s;}',
      '.dc-stab:hover,.dc-stab:focus{background:#243d59;color:#F0F4F8;outline:none;}',
      '.dc-stab.active{background:#00C9A7;color:#0a1520;border-color:#00C9A7;}',
      // Recent searches
      '.dc-recent-section{padding:8px 14px;border-bottom:1px solid #243d59;}',
      '.dc-recent-label{font-size:0.68em;color:#5A6E84;display:block;margin-bottom:4px;}',
      '.dc-recent-chips{display:flex;flex-wrap:wrap;gap:5px;}',
      '.dc-recent-chip{font-size:0.72em;background:#243d59;border:none;color:#8AA0B8;border-radius:10px;padding:3px 9px;cursor:pointer;}',
      '.dc-recent-chip:hover{background:#00C9A7;color:#0a1520;}',
      // Helper hints
      '.dc-search-hints{padding:8px 14px;display:flex;flex-wrap:wrap;gap:6px;border-bottom:1px solid #243d59;}',
      '.dc-search-hint{font-size:0.75em;color:#8AA0B8;background:#243d59;border:none;border-radius:12px;padding:3px 10px;cursor:pointer;transition:background 0.15s,color 0.15s;}',
      '.dc-search-hint:hover,.dc-search-hint:focus{background:#00C9A7;color:#0a1520;outline:none;}',
      '.dc-search-hints-label{font-size:0.7em;color:#5A6E84;width:100%;padding-bottom:2px;}',
      // Results
      '.dc-search-result{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;cursor:pointer;border-bottom:1px solid #243d59;text-decoration:none;color:#F0F4F8;}',
      '.dc-search-result:last-child{border-bottom:none;}',
      '.dc-search-result:hover,.dc-search-result:focus{background:#243d59;outline:none;}',
      '.dc-result-type{flex-shrink:0;font-size:0.68em;font-weight:700;padding:3px 7px;border-radius:10px;margin-top:2px;text-transform:uppercase;white-space:nowrap;}',
      '.dc-result-body strong{display:block;font-size:0.88em;}',
      '.dc-result-body span{font-size:0.78em;color:#8AA0B8;line-height:1.3;}',
      '.dc-search-empty{padding:14px;color:#8AA0B8;font-size:0.85em;}',
      '.dc-search-empty a{color:#00C9A7;}',
      // Mark highlight
      '.dc-search-dropdown mark,.dc-topbar-results mark{background:#00C9A720;color:#00C9A7;border-radius:2px;padding:0 1px;}',
      // Shortcut hint
      '.dc-shortcut-hint{display:none;font-size:0.68em;color:#5A6E84;padding:6px 14px 4px;border-bottom:1px solid #243d59;}',
      '@media (min-width:769px){.dc-shortcut-hint{display:block;}}',
      // Mobile top-bar search
      '.dc-topbar-search-btn{background:none;border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:var(--text-primary);cursor:pointer;width:44px;height:44px;font-size:1.1rem;display:none;align-items:center;justify-content:center;flex-shrink:0;}',
      '@media (max-width:1024px){.dc-topbar-search-btn{display:flex;}}',
      '.dc-topbar-search-overlay{display:none;position:fixed;top:0;left:0;width:100%;z-index:1000;background:var(--bg-secondary,#F8F9FA);border-bottom:2px solid #00C9A7;padding:8px 12px;align-items:center;gap:8px;height:var(--nav-height,64px);}',
      '.dc-topbar-search-overlay.open{display:flex;}',
      '.dc-topbar-search-field{flex:1;padding:10px 14px;background:#0a1520;border:1px solid #243d59;border-radius:8px;color:#F0F4F8;font-size:1rem;outline:none;min-height:44px;}',
      '.dc-topbar-search-field:focus{border-color:#00C9A7;}',
      '.dc-topbar-search-close{background:none;border:none;font-size:1.3rem;color:var(--text-primary);cursor:pointer;min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;}',
      '.dc-topbar-results{position:fixed;top:var(--nav-height,64px);left:0;right:0;max-height:65vh;overflow-y:auto;background:#1A2D44;border-bottom:1px solid #243d59;z-index:999;display:none;}',
      '.dc-topbar-results.open{display:block;}',
      '.dc-topbar-tabs{display:flex;flex-wrap:wrap;gap:4px;padding:8px 12px;border-bottom:1px solid #243d59;background:#131f2e;}',
    ].join('');
    document.head.appendChild(style);
  }

  // ── Hints HTML ───────────────────────────────────────────────────────────
  var HINTS = ['scam', 'video call', 'banking', 'password', 'phishing', 'iPad update'];

  function buildHintsHTML() {
    return '<div class="dc-search-hints">' +
      '<span class="dc-search-hints-label">' + t('Try searching for:', 'Essayez:') + '</span>' +
      HINTS.map(function (h) {
        return '<button class="dc-search-hint" type="button">' + escHtml(h) + '</button>';
      }).join('') +
      '</div>';
  }

  function buildRecentHTML(list) {
    if (!list.length) return '';
    return '<div class="dc-recent-section">' +
      '<span class="dc-recent-label">' + t('Recent searches', 'Recherches récentes') + '</span>' +
      '<div class="dc-recent-chips">' +
      list.map(function(r){
        return '<button class="dc-recent-chip" type="button">' + escHtml(r) + '</button>';
      }).join('') +
      '</div></div>';
  }

  function buildTabsHTML(currentTab) {
    return '<div class="dc-search-tabs">' +
      FILTER_TABS.map(function(tab){
        return '<button class="dc-stab' + (tab === currentTab ? ' active' : '') + '" data-tab="' + tab + '">' + escHtml(tab) + '</button>';
      }).join('') +
      '</div>';
  }

  // ── Render dropdown ──────────────────────────────────────────────────────
  function renderDropdown(dropdown, results, query, input) {
    var base = getBaseUrl();
    var terms = normalise(query).split(/\s+/).filter(function(t){ return t.length >= 2; });

    var html = buildTabsHTML(activeTab);

    if (!results.length) {
      html += '<div class="dc-search-empty">' +
        t('No results for', 'Aucun résultat pour') + ' "<strong>' + escHtml(query) + '</strong>".<br>' +
        '<a href="' + base + 'faq.html">' + t('Browse the FAQ', 'Parcourir la FAQ') + ' →</a>' +
        '</div>';
    } else {
      html += results.map(function (r) {
        var colour = typeColour(r.type);
        var url = base + r.url;
        return '<a class="dc-search-result" href="' + url + '" role="option">' +
          '<span class="dc-result-type" style="background:' + colour + '20;color:' + colour + '">' + escHtml(r.type) + '</span>' +
          '<div class="dc-result-body"><strong>' + highlight(r.title, terms) + '</strong>' +
          '<span>' + highlight(r.excerpt, terms) + '</span></div>' +
          '</a>';
      }).join('');
    }

    dropdown.innerHTML = html;
    dropdown.classList.add('open');

    // Tab click handlers
    dropdown.querySelectorAll('.dc-stab').forEach(function(btn){
      btn.addEventListener('click', function(){
        activeTab = this.dataset.tab;
        var q = input.value.trim();
        renderDropdown(dropdown, search(q, activeTab), q, input);
      });
    });

    // Keyboard nav in results
    var links = dropdown.querySelectorAll('.dc-search-result');
    links.forEach(function (link, i) {
      link.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' && links[i+1]) { e.preventDefault(); links[i+1].focus(); }
        if (e.key === 'ArrowUp')  { e.preventDefault(); (i > 0 ? links[i-1] : input).focus(); }
        if (e.key === 'Escape')   { closeDropdown(dropdown); input.focus(); }
      });
      // Save to recent on click
      link.addEventListener('click', function(){ saveRecent(input.value.trim()); });
    });
  }

  function closeDropdown(dropdown) {
    dropdown.classList.remove('open');
    dropdown.innerHTML = '';
  }

  // ── Build sidebar widget ─────────────────────────────────────────────────
  function buildWidget() {
    var sidebar = document.querySelector('aside.sidebar nav');
    if (!sidebar) return;

    var label = document.createElement('p');
    label.className = 'dc-search-label';
    label.textContent = t('Search this site', 'Rechercher');
    sidebar.insertBefore(label, sidebar.firstChild);

    var wrap = document.createElement('div');
    wrap.className = 'dc-search-wrap';
    wrap.innerHTML =
      '<input type="search" class="dc-search-input" id="dcSearchInput" placeholder="' +
        t('Search modules, FAQs, glossary…', 'Modules, FAQ, glossaire…') +
        '" autocomplete="off" aria-label="' + t('Search this site', 'Rechercher') + '" aria-owns="dcSearchDropdown" aria-haspopup="listbox" aria-autocomplete="list">' +
      '<i class="dc-search-icon" aria-hidden="true">🔍</i>' +
      '<div class="dc-search-dropdown" id="dcSearchDropdown" role="listbox" aria-label="' + t('Search results', 'Résultats') + '"></div>';

    sidebar.insertBefore(wrap, label.nextSibling);

    var shortcutHint = document.createElement('p');
    shortcutHint.className = 'dc-shortcut-hint';
    shortcutHint.innerHTML = t('Tip: Press <kbd>/</kbd> anywhere to search', 'Conseil&nbsp;: appuyez sur <kbd>/</kbd> pour rechercher');
    sidebar.insertBefore(shortcutHint, wrap.nextSibling);

    var input    = wrap.querySelector('#dcSearchInput');
    var dropdown = wrap.querySelector('#dcSearchDropdown');
    var timer;

    function showEmpty() {
      var recent = getRecent();
      var html = recent.length ? buildRecentHTML(recent) : '';
      html += buildHintsHTML();
      dropdown.innerHTML = html;
      dropdown.classList.add('open');

      // Recent chip clicks
      dropdown.querySelectorAll('.dc-recent-chip').forEach(function(btn){
        btn.addEventListener('click', function(){
          input.value = btn.textContent;
          input.focus();
          renderDropdown(dropdown, search(btn.textContent, activeTab), btn.textContent, input);
        });
      });
      // Hint button clicks
      dropdown.querySelectorAll('.dc-search-hint').forEach(function(btn){
        btn.addEventListener('click', function(){
          input.value = btn.textContent;
          input.focus();
          renderDropdown(dropdown, search(btn.textContent, activeTab), btn.textContent, input);
        });
      });
    }

    input.addEventListener('focus', function () {
      if (!input.value.trim()) showEmpty();
    });

    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var q = input.value.trim();
        if (!q) { showEmpty(); return; }
        renderDropdown(dropdown, search(q, activeTab), q, input);
      }, DEBOUNCE_MS);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDropdown(dropdown); input.blur(); }
      if (e.key === 'Enter' && input.value.trim()) { saveRecent(input.value.trim()); }
      if (e.key === 'ArrowDown') {
        var first = dropdown.querySelector('.dc-search-result, .dc-search-hint, .dc-recent-chip');
        if (first) { e.preventDefault(); first.focus(); }
      }
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target) && !label.contains(e.target)) closeDropdown(dropdown);
    });

    // / shortcut to focus search
    document.addEventListener('keydown', function(e) {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });

    buildMobileSearch();
  }

  // ── Mobile top-bar search ─────────────────────────────────────────────────
  function buildMobileSearch() {
    var topBar = document.querySelector('.top-bar');
    if (!topBar || document.getElementById('dc-topbar-search-btn')) return;

    var btn = document.createElement('button');
    btn.id = 'dc-topbar-search-btn';
    btn.className = 'dc-topbar-search-btn';
    btn.setAttribute('aria-label', t('Open search', 'Ouvrir la recherche'));
    btn.innerHTML = '🔍';
    topBar.appendChild(btn);

    var overlay = document.createElement('div');
    overlay.className = 'dc-topbar-search-overlay';
    overlay.id = 'dc-topbar-search-overlay';
    overlay.innerHTML =
      '<input type="search" class="dc-topbar-search-field" id="dcTopbarSearch" placeholder="' +
        t('Try: scam, banking, password…', 'Ex: arnaque, banque, mot de passe…') +
        '" autocomplete="off" aria-label="' + t('Search', 'Rechercher') + '">' +
      '<button class="dc-topbar-search-close" id="dc-topbar-close" aria-label="' + t('Close search', 'Fermer') + '">\u00d7</button>';
    document.body.appendChild(overlay);

    var resultsEl = document.createElement('div');
    resultsEl.className = 'dc-topbar-results';
    resultsEl.id = 'dc-topbar-results';
    resultsEl.setAttribute('role', 'listbox');
    document.body.appendChild(resultsEl);

    var topInput = overlay.querySelector('#dcTopbarSearch');
    var timer2;
    var mobileTab = 'All';

    btn.addEventListener('click', function () {
      overlay.classList.add('open');
      setTimeout(function () { topInput.focus(); }, 50);
    });

    overlay.querySelector('#dc-topbar-close').addEventListener('click', function () {
      overlay.classList.remove('open');
      resultsEl.classList.remove('open');
      resultsEl.innerHTML = '';
      topInput.value = '';
    });

    topInput.addEventListener('input', function () {
      clearTimeout(timer2);
      timer2 = setTimeout(function () {
        var q = topInput.value.trim();
        if (!q) { resultsEl.classList.remove('open'); resultsEl.innerHTML = ''; return; }
        var hits = search(q, mobileTab);
        var base = getBaseUrl();
        var terms = normalise(q).split(/\s+/).filter(function(t){ return t.length >= 2; });

        var html = '<div class="dc-topbar-tabs">' +
          FILTER_TABS.map(function(tab){
            return '<button class="dc-stab' + (tab === mobileTab ? ' active' : '') + '" data-tab="' + tab + '">' + escHtml(tab) + '</button>';
          }).join('') +
          '</div>';

        if (!hits.length) {
          html += '<div class="dc-search-empty">' + t('No results for', 'Aucun résultat pour') + ' "' + escHtml(q) + '"</div>';
        } else {
          html += hits.map(function (r) {
            var colour = typeColour(r.type);
            return '<a class="dc-search-result" href="' + base + r.url + '" role="option">' +
              '<span class="dc-result-type" style="background:' + colour + '20;color:' + colour + '">' + escHtml(r.type) + '</span>' +
              '<div class="dc-result-body"><strong>' + highlight(r.title, terms) + '</strong><span>' + highlight(r.excerpt, terms) + '</span></div>' +
              '</a>';
          }).join('');
        }
        resultsEl.innerHTML = html;
        resultsEl.classList.add('open');

        // Tab clicks in mobile results
        resultsEl.querySelectorAll('.dc-stab').forEach(function(tabBtn){
          tabBtn.addEventListener('click', function(){
            mobileTab = this.dataset.tab;
            topInput.dispatchEvent(new Event('input'));
          });
        });

        // Keyboard nav
        var links = resultsEl.querySelectorAll('.dc-search-result');
        links.forEach(function (link, i) {
          link.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown' && links[i+1]) { e.preventDefault(); links[i+1].focus(); }
            if (e.key === 'ArrowUp')  { e.preventDefault(); (i > 0 ? links[i-1] : topInput).focus(); }
            if (e.key === 'Escape')   { overlay.querySelector('#dc-topbar-close').click(); }
          });
          link.addEventListener('click', function(){ saveRecent(q); });
        });
      }, DEBOUNCE_MS);
    });

    topInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { overlay.querySelector('#dc-topbar-close').click(); }
      if (e.key === 'Enter' && topInput.value.trim()) { saveRecent(topInput.value.trim()); }
      if (e.key === 'ArrowDown') {
        var first = resultsEl.querySelector('.dc-search-result');
        if (first) { e.preventDefault(); first.focus(); }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    buildWidget();
  });
})();
