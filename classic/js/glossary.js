/**
 * Digital Confidence Centre — Glossary Engine
 * Fuzzy search (Fuse.js), bilingual toggle, analytics, admin panel
 * Requires: glossary-data.js loaded before this file
 */
(function () {
  'use strict';

  /* ── State ──────────────────────────────────────────────────── */
  var lang = 'en';
  var currentCategory = 'all';
  var fuseInstance = null;
  var searchDebounce = null;
  var analyticsDebounce = null;
  var lastQuery = '';

  /* ── Category labels ────────────────────────────────────────── */
  var CATEGORY_LABELS = {
    device:        { en: '📱 Device Basics',        fr: '📱 Appareils' },
    os:            { en: '💻 Operating Systems',    fr: '💻 Systèmes d\'exploitation' },
    internet:      { en: '🌐 Internet & Browsing',  fr: '🌐 Internet et navigation' },
    communication: { en: '✉️ Communication',         fr: '✉️ Communication' },
    security:      { en: '🔐 Security & Safety',    fr: '🔐 Sécurité' },
    social:        { en: '👥 Social Media',          fr: '👥 Médias sociaux' },
    banking:       { en: '🏦 Shopping & Banking',   fr: '🏦 Achats et banque' },
    cloud:         { en: '☁️ Cloud & Storage',       fr: '☁️ Nuage et stockage' },
    settings:      { en: '⚙️ Settings & Maintenance',fr: '⚙️ Réglages' },
    ai:            { en: '🤖 AI & Modern Tech',      fr: '🤖 IA et technologie' },
    canadian:      { en: '🍁 Canadian-Specific',     fr: '🍁 Spécifique au Canada' },
    gestures:      { en: '👆 Gestures & Actions',    fr: '👆 Gestes et actions' }
  };

  /* ── Module link labels ─────────────────────────────────────── */
  var MODULE_NAMES = {
    'module-1.html':  { en: 'Module 1: The Escape Hatch',   fr: 'Module 1 : L\'échappatoire' },
    'module-2.html':  { en: 'Module 2: The Security Shield', fr: 'Module 2 : Le bouclier de sécurité' },
    'module-3.html':  { en: 'Module 3: Passwords & Biometrics', fr: 'Module 3 : Mots de passe et biométrie' },
    'module-4.html':  { en: 'Module 4: App Store Safety',   fr: 'Module 4 : Sécurité de l\'App Store' },
    'module-5.html':  { en: 'Module 5: Email & Messages',   fr: 'Module 5 : Courriel et messages' },
    'module-6.html':  { en: 'Module 6: Banking & Transactions', fr: 'Module 6 : Banque et transactions' },
    'module-7.html':  { en: 'Module 7: Photos & Memories',  fr: 'Module 7 : Photos et souvenirs' },
    'module-8.html':  { en: 'Module 8: Stay Connected',     fr: 'Module 8 : Rester connecté' },
    'module-9.html':  { en: 'Module 9: Understanding AI',   fr: 'Module 9 : Comprendre l\'IA' },
    'module-10.html': { en: 'Module 10: Grocery & Delivery', fr: 'Module 10 : Épicerie et livraison' },
    'module-11.html': { en: 'Module 11: Ride-Sharing',      fr: 'Module 11 : Covoiturage' }
  };

  /* ── DOM refs ───────────────────────────────────────────────── */
  var container, noResults, resultCount, searchInput,
      searchStatus, didYouMean, langEnBtn, langFrBtn;

  /* ── Init ───────────────────────────────────────────────────── */
  function init() {
    container   = document.getElementById('glossary-container');
    noResults   = document.getElementById('glossary-no-results');
    resultCount = document.getElementById('result-count');
    searchInput = document.getElementById('glossary-search');
    searchStatus= document.getElementById('search-status');
    didYouMean  = document.getElementById('did-you-mean');
    langEnBtn   = document.getElementById('lang-en-btn');
    langFrBtn   = document.getElementById('lang-fr-btn');

    if (!container || typeof GLOSSARY_DATA === 'undefined') return;

    buildFuse();
    renderAll();
    wireEvents();
    maybeShowAdmin();
    updateResultCount(GLOSSARY_DATA.length);
  }

  /* ── Fuse setup ─────────────────────────────────────────────── */
  function buildFuse() {
    if (typeof Fuse === 'undefined') return;
    fuseInstance = new Fuse(GLOSSARY_DATA, {
      keys: [
        { name: 'en.term',  weight: 4 },
        { name: 'fr.term',  weight: 4 },
        { name: 'en.plain', weight: 1 },
        { name: 'fr.plain', weight: 1 }
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true
    });
  }

  /* ── Render helpers ─────────────────────────────────────────── */
  function buildEntryHTML(item) {
    var d = item[lang];
    if (!d) return '';
    var safeId = item.id || ('term-' + d.term.toLowerCase().replace(/[^a-z0-9]/g, '-'));
    var html = '<article class="glossary-entry" id="' + safeId + '"'
      + ' itemscope itemtype="https://schema.org/DefinedTerm">';

    html += '<h3 itemprop="name">' + escHtml(d.term) + '</h3>';
    html += '<p class="entry-plain" itemprop="description">' + escHtml(d.plain) + '</p>';

    if (d.analogy) {
      html += '<p class="entry-analogy">💡 ' + escHtml(d.analogy) + '</p>';
    }
    if (d.example) {
      html += '<p class="entry-example"><strong>'
        + (lang === 'en' ? 'Example:' : 'Exemple :')
        + '</strong> ' + escHtml(d.example) + '</p>';
    }
    if (d.safety) {
      html += '<p class="entry-safety">' + escHtml(d.safety) + '</p>';
    }
    if (item.moduleLink && MODULE_NAMES[item.moduleLink]) {
      var mLabel = MODULE_NAMES[item.moduleLink][lang] || MODULE_NAMES[item.moduleLink]['en'];
      html += '<a class="entry-module-link" href="' + item.moduleLink + '">'
        + (lang === 'en' ? 'Learn more →' : 'En savoir plus →')
        + ' <em>' + escHtml(mLabel) + '</em></a>';
    }
    html += '</article>';
    return html;
  }

  function renderAll() {
    var items = currentCategory === 'all'
      ? GLOSSARY_DATA
      : GLOSSARY_DATA.filter(function(i){ return i.category === currentCategory; });

    if (currentCategory === 'all') {
      renderGrouped(items);
    } else {
      renderFlat(items);
    }
    showNoResults(false);
    hideDYM();
  }

  function renderGrouped(items) {
    var grouped = {};
    items.forEach(function(item) {
      var cat = item.category || 'other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    var html = '';
    Object.keys(CATEGORY_LABELS).forEach(function(cat) {
      if (!grouped[cat] || grouped[cat].length === 0) return;
      var label = CATEGORY_LABELS[cat][lang] || CATEGORY_LABELS[cat]['en'];
      html += '<section class="glossary-category-section" data-category="' + cat + '">';
      html += '<h2 class="glossary-category-heading" id="cat-' + cat + '">' + label + '</h2>';
      grouped[cat].forEach(function(item) { html += buildEntryHTML(item); });
      html += '</section>';
    });
    container.innerHTML = html;
    wireEntryClicks();
  }

  function renderFlat(items) {
    var html = '';
    items.forEach(function(item) { html += buildEntryHTML(item); });
    container.innerHTML = html || '';
    wireEntryClicks();
  }

  function renderSearchResults(items) {
    var html = '';
    items.forEach(function(item) { html += buildEntryHTML(item); });
    container.innerHTML = html;
    wireEntryClicks();
  }

  /* ── Search ─────────────────────────────────────────────────── */
  function doSearch(q) {
    q = q.trim();
    if (!q) {
      renderAll();
      updateResultCount(GLOSSARY_DATA.length);
      clearStatus();
      return;
    }

    var items;
    if (fuseInstance) {
      var results = fuseInstance.search(q);
      items = results.map(function(r){ return r.item; });
    } else {
      // Fallback: simple substring match
      var qLower = q.toLowerCase();
      items = GLOSSARY_DATA.filter(function(item){
        return (item.en.term + ' ' + item.en.plain + ' ' + (item.fr.term||'')).toLowerCase().indexOf(qLower) !== -1;
      });
    }

    if (items.length > 0) {
      renderSearchResults(items);
      showNoResults(false);
      hideDYM();
      updateResultCount(items.length);
      setStatus(items.length + (lang === 'en' ? ' terms found' : ' termes trouvés'));
      scheduleAnalytics(q, true);
    } else {
      container.innerHTML = '';
      showNoResults(true);
      updateResultCount(0);
      setStatus(lang === 'en' ? 'No results' : 'Aucun résultat');
      showDYM(q);
      scheduleAnalytics(q, false);
    }
  }

  /* ── Did You Mean ───────────────────────────────────────────── */
  function showDYM(q) {
    if (!fuseInstance || !didYouMean) return;
    // Wider search for suggestions
    var wideFuse = new Fuse(GLOSSARY_DATA, {
      keys: [{ name: 'en.term', weight: 4 }, { name: 'fr.term', weight: 4 }, { name: 'en.plain', weight: 1 }],
      threshold: 0.65,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true
    });
    var suggestions = wideFuse.search(q).slice(0, 4);
    if (suggestions.length === 0) { hideDYM(); return; }

    var label = lang === 'en' ? 'Did you mean: ' : 'Vouliez-vous dire : ';
    var html = '<strong>' + label + '</strong>';
    suggestions.forEach(function(s) {
      var termLabel = s.item[lang] ? s.item[lang].term : s.item['en'].term;
      html += '<button class="dym-suggestion" data-term="' + escAttr(termLabel) + '">' + escHtml(termLabel) + '</button>';
    });
    didYouMean.innerHTML = html;
    didYouMean.hidden = false;

    // Wire suggestion buttons
    didYouMean.querySelectorAll('.dym-suggestion').forEach(function(btn) {
      btn.addEventListener('click', function() {
        searchInput.value = btn.dataset.term;
        doSearch(btn.dataset.term);
        searchInput.focus();
      });
    });
  }

  function hideDYM() {
    if (didYouMean) { didYouMean.hidden = true; didYouMean.innerHTML = ''; }
  }

  /* ── Analytics ──────────────────────────────────────────────── */
  var ANALYTICS_KEY = 'dc_glossary_searches';

  function scheduleAnalytics(q, matched) {
    clearTimeout(analyticsDebounce);
    analyticsDebounce = setTimeout(function() {
      logSearch(q, matched, null);
    }, 600);
  }

  function logSearch(q, matched, termClicked) {
    if (!q || q.length < 2) return;
    try {
      var searches = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
      searches.push({ ts: Date.now(), query: q, matched: matched, termClicked: termClicked || null });
      if (searches.length > 500) searches.splice(0, searches.length - 500);
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(searches));
    } catch(e) {}
    // GA event
    if (typeof gtag === 'function') {
      gtag('event', 'glossary_search', {
        search_term: q,
        matched: matched ? 'match' : 'no_match'
      });
    }
  }

  function wireEntryClicks() {
    container.querySelectorAll('.glossary-entry').forEach(function(entry) {
      entry.addEventListener('click', function() {
        var termName = entry.querySelector('h3');
        if (termName && lastQuery) {
          logSearch(lastQuery, true, entry.id);
        }
      }, { once: false });
    });
  }

  /* ── Admin panel ────────────────────────────────────────────── */
  function maybeShowAdmin() {
    if (window.location.search.indexOf('admin=true') === -1) return;
    renderAdminPanel();
  }

  function renderAdminPanel() {
    try {
      var searches = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
    } catch(e) { var searches = []; }

    var counts = {}, noMatchCounts = {};
    searches.forEach(function(s) {
      var q = (s.query || '').toLowerCase();
      if (!q) return;
      counts[q] = (counts[q] || 0) + 1;
      if (!s.matched) noMatchCounts[q] = (noMatchCounts[q] || 0) + 1;
    });

    var top = sortObj(counts).slice(0, 20);
    var gaps = sortObj(noMatchCounts).slice(0, 20);

    var html = '<div class="glossary-admin-panel" id="admin-panel">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">'
      + '<strong>📊 Search Analytics Dashboard</strong>'
      + '<button id="admin-close-btn" style="background:none;border:none;font-size:1.2rem;cursor:pointer" aria-label="Close admin panel">✕</button>'
      + '</div>'
      + '<p style="font-size:0.9rem;margin:0 0 1rem">Total searches logged: <strong>' + searches.length + '</strong></p>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">'
      + '<div>'
      + '<h3 style="font-size:1rem;margin:0 0 0.5rem">🔝 Top 20 Searches</h3>'
      + buildTable(top)
      + '</div>'
      + '<div>'
      + '<h3 style="font-size:1rem;margin:0 0 0.5rem">❌ Top 20 No-Match (Content Gaps)</h3>'
      + buildTable(gaps)
      + '</div>'
      + '</div>'
      + '</div>';

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    var main = document.getElementById('main');
    if (main) main.insertBefore(wrapper.firstChild, main.firstChild);

    document.getElementById('admin-close-btn').addEventListener('click', function() {
      document.getElementById('admin-panel').remove();
    });
  }

  function buildTable(rows) {
    if (rows.length === 0) return '<p style="font-size:0.85rem;color:#888">No data yet.</p>';
    var html = '<table><thead><tr><th>Term</th><th>Count</th></tr></thead><tbody>';
    rows.forEach(function(r) {
      html += '<tr><td>' + escHtml(r.key) + '</td><td>' + r.val + '</td></tr>';
    });
    return html + '</tbody></table>';
  }

  function sortObj(obj) {
    return Object.keys(obj).map(function(k){ return { key: k, val: obj[k] }; })
      .sort(function(a,b){ return b.val - a.val; });
  }

  /* ── UI helpers ─────────────────────────────────────────────── */
  function showNoResults(show) {
    if (noResults) noResults.hidden = !show;
  }

  function updateResultCount(n) {
    if (!resultCount) return;
    if (n === GLOSSARY_DATA.length && !searchInput.value.trim()) {
      resultCount.textContent = lang === 'en'
        ? GLOSSARY_DATA.length + ' terms — browse by category or search above'
        : GLOSSARY_DATA.length + ' termes — parcourez par catégorie ou cherchez ci-dessus';
    } else {
      resultCount.textContent = lang === 'en'
        ? n + ' term' + (n !== 1 ? 's' : '') + ' found'
        : n + ' terme' + (n !== 1 ? 's' : '') + ' trouvé' + (n !== 1 ? 's' : '');
    }
  }

  function setStatus(msg) {
    if (searchStatus) searchStatus.textContent = msg;
  }

  function clearStatus() {
    if (searchStatus) searchStatus.textContent = '';
  }

  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function escAttr(str) {
    if (!str) return '';
    return String(str).replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  /* ── Event wiring ───────────────────────────────────────────── */
  function wireEvents() {
    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        clearTimeout(searchDebounce);
        var q = searchInput.value;
        lastQuery = q.trim();
        searchDebounce = setTimeout(function() {
          doSearch(q);
        }, 280);
      });

      // Clear search button
      var clearBtn = document.getElementById('clear-search-btn');
      var clearBtnFr = document.getElementById('clear-search-btn-fr');
      [clearBtn, clearBtnFr].forEach(function(btn) {
        if (btn) btn.addEventListener('click', function(e) {
          e.preventDefault();
          searchInput.value = '';
          doSearch('');
          searchInput.focus();
        });
      });
    }

    // Language toggle
    if (langEnBtn) {
      langEnBtn.addEventListener('click', function() {
        setLang('en');
      });
    }
    if (langFrBtn) {
      langFrBtn.addEventListener('click', function() {
        setLang('fr');
      });
    }

    // Category buttons
    document.querySelectorAll('.cat-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.cat-btn').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        currentCategory = btn.dataset.cat || 'all';
        // Clear search when browsing by category
        if (searchInput) searchInput.value = '';
        clearStatus();
        hideDYM();
        renderAll();
        updateResultCount(
          currentCategory === 'all'
            ? GLOSSARY_DATA.length
            : GLOSSARY_DATA.filter(function(i){ return i.category === currentCategory; }).length
        );
      });
    });
  }

  function setLang(l) {
    lang = l;
    // Toggle button states
    if (langEnBtn) { langEnBtn.classList.toggle('active', l === 'en'); langEnBtn.setAttribute('aria-pressed', l === 'en'); }
    if (langFrBtn) { langFrBtn.classList.toggle('active', l === 'fr'); langFrBtn.setAttribute('aria-pressed', l === 'fr'); }
    // Toggle label visibility
    document.querySelectorAll('.label-en').forEach(function(el){ el.hidden = (l !== 'en'); });
    document.querySelectorAll('.label-fr').forEach(function(el){ el.hidden = (l !== 'fr'); });
    // Update placeholder
    if (searchInput) {
      searchInput.placeholder = l === 'en'
        ? 'e.g. Wi-Fi, password, FaceTime…'
        : 'ex. Wi-Fi, mot de passe, FaceTime…';
    }
    // Re-render current view
    var q = searchInput ? searchInput.value.trim() : '';
    if (q) { doSearch(q); } else { renderAll(); }
    updateResultCount(
      currentCategory === 'all'
        ? GLOSSARY_DATA.length
        : GLOSSARY_DATA.filter(function(i){ return i.category === currentCategory; }).length
    );
  }

  /* ── Boot ───────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
