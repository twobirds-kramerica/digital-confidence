/* ============================================
   Homepage Module Grid Enhancements
   Categories, time estimates, Start Here badge, sort toggle
   ============================================ */

(function () {
  'use strict';

  /* ── Module metadata ── */
  var MODULE_META = {
    '1':   { category: 'start',    time: 'About 15 min', timeFr: 'Environ 15 min' },
    '2':   { category: 'start',    time: 'About 20 min', timeFr: 'Environ 20 min' },
    '2.5': { category: 'start',    time: 'About 15 min', timeFr: 'Environ 15 min' },
    '3':   { category: 'safe',     time: 'About 15 min', timeFr: 'Environ 15 min' },
    '4':   { category: 'safe',     time: 'About 15 min', timeFr: 'Environ 15 min' },
    '5':   { category: 'safe',     time: 'About 15 min', timeFr: 'Environ 15 min' },
    '6':   { category: 'connect',  time: 'About 20 min', timeFr: 'Environ 20 min' },
    '7':   { category: 'connect',  time: 'About 15 min', timeFr: 'Environ 15 min' },
    '8':   { category: 'connect',  time: 'About 20 min', timeFr: 'Environ 20 min' },
    '9':   { category: 'manage',   time: 'About 20 min', timeFr: 'Environ 20 min' },
    '10':  { category: 'manage',   time: 'About 15 min', timeFr: 'Environ 15 min' },
    '11':  { category: 'manage',   time: 'About 15 min', timeFr: 'Environ 15 min' },
    '12':  { category: 'further',  time: 'About 20 min', timeFr: 'Environ 20 min' },
    '13':  { category: 'further',  time: 'About 20 min', timeFr: 'Environ 20 min' },
    '14':  { category: 'further',  time: 'About 20 min', timeFr: 'Environ 20 min' },
    '15':  { category: 'further',  time: 'About 20 min', timeFr: 'Environ 20 min' }
  };

  var CATEGORIES = [
    {
      id: 'start',
      en: '🚀 Getting Started',
      fr: '🚀 Pour commencer',
      desc_en: 'Begin here — these modules build the foundation.',
      desc_fr: 'Commencez ici — ces modules posent les bases.'
    },
    {
      id: 'safe',
      en: '🔐 Staying Safe',
      fr: '🔐 Rester en sécurité',
      desc_en: 'Protect yourself online with passwords, scam awareness, and safe apps.',
      desc_fr: 'Protégez-vous en ligne avec des mots de passe et la sensibilisation aux arnaques.'
    },
    {
      id: 'connect',
      en: '💬 Connecting with Others',
      fr: '💬 Se connecter avec les autres',
      desc_en: 'Banking, photos, and staying in touch with the people who matter.',
      desc_fr: 'Banque, photos et rester en contact avec les personnes qui comptent.'
    },
    {
      id: 'manage',
      en: '🛒 Managing Your Life Online',
      fr: '🛒 Gérer votre vie en ligne',
      desc_en: 'AI, grocery delivery, and ride-sharing — modern tools made approachable.',
      desc_fr: 'IA, épicerie en ligne et covoiturage — des outils modernes rendus accessibles.'
    },
    {
      id: 'further',
      en: '🌟 Going Further',
      fr: '🌟 Aller plus loin',
      desc_en: 'Advanced topics: social media, smart home, and telehealth.',
      desc_fr: 'Sujets avancés : médias sociaux, maison intelligente et télémédecine.'
    }
  ];

  function getLang() {
    try {
      var l = document.documentElement.getAttribute('data-lang') ||
              localStorage.getItem('dc-lang') || navigator.language || 'en';
      return l.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    } catch (e) { return 'en'; }
  }

  function isModuleComplete(moduleNum) {
    try {
      if (localStorage.getItem('dc-module-' + moduleNum + '-complete') === 'true') return true;
      var prefix = 'dc-progress-m' + moduleNum;
      var hasItems = false, allDone = true;
      for (var i = 1; i <= 10; i++) {
        var val = localStorage.getItem(prefix + '-' + i);
        if (val !== null) { hasItems = true; if (val !== 'true') allDone = false; }
      }
      return hasItems && allDone;
    } catch (e) { return false; }
  }

  function countCompleted() {
    var n = 0;
    Object.keys(MODULE_META).forEach(function (m) {
      if (isModuleComplete(m)) n++;
    });
    return n;
  }

  /* ── Add time estimate and completion badge to a card ── */
  function enhanceCard(card, moduleNum, lang) {
    var meta = MODULE_META[moduleNum];
    if (!meta) return;

    var content = card.querySelector('.card-content');
    if (!content) return;

    /* Time estimate */
    if (!card.querySelector('.card-time')) {
      var timeEl = document.createElement('span');
      timeEl.className = 'card-time';
      timeEl.setAttribute('aria-label', lang === 'fr' ? meta.timeFr : meta.time);
      timeEl.innerHTML = '⏱ ' + (lang === 'fr' ? meta.timeFr : meta.time);
      content.appendChild(timeEl);
    }

    /* Completion state */
    var progressEl = card.querySelector('.card-progress');
    if (progressEl && isModuleComplete(moduleNum)) {
      progressEl.textContent = '';
      card.classList.add('card-done');
      var badge = document.createElement('span');
      badge.className = 'card-complete-badge';
      badge.textContent = lang === 'fr' ? '✅ Terminé' : '✅ Complete';
      content.appendChild(badge);
    }
  }

  /* ── Build sort toggle ── */
  function buildSortToggle(grid, lang) {
    var wrap = document.createElement('div');
    wrap.className = 'mg-sort-wrap';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', lang === 'fr' ? 'Trier les modules' : 'Sort modules');

    var label = document.createElement('span');
    label.className = 'mg-sort-label';
    label.textContent = lang === 'fr' ? 'Afficher par : ' : 'View by: ';
    wrap.appendChild(label);

    var options = [
      { key: 'default', en: 'Default order', fr: 'Ordre par défaut' },
      { key: 'easiest', en: 'Start with easiest', fr: 'Commencer par le plus facile' },
      { key: 'progress', en: 'My progress', fr: 'Ma progression' }
    ];

    options.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'mg-sort-btn' + (i === 0 ? ' active' : '');
      btn.setAttribute('data-sort', opt.key);
      btn.textContent = lang === 'fr' ? opt.fr : opt.en;
      wrap.appendChild(btn);
    });

    grid.parentNode.insertBefore(wrap, grid);

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.mg-sort-btn');
      if (!btn) return;
      wrap.querySelectorAll('.mg-sort-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applySort(btn.getAttribute('data-sort'));
    });
  }

  /* ── Sort logic ── */
  function applySort(sortKey) {
    var grid = document.querySelector('.module-grid.mg-enhanced');
    if (!grid) return;

    var categorySections = Array.from(grid.querySelectorAll('.mg-category-section'));

    if (sortKey === 'default') {
      categorySections.forEach(function (sec) { sec.style.display = ''; });
      var cards = Array.from(grid.querySelectorAll('.module-card[data-module]'));
      cards.forEach(function (card) {
        var mNum = parseFloat(card.getAttribute('data-module'));
        card.style.order = mNum * 10;
      });
    } else if (sortKey === 'easiest') {
      /* Shorter modules first (15 min < 20 min), by module number within group */
      var cards = Array.from(grid.querySelectorAll('.module-card[data-module]'));
      cards.sort(function (a, b) {
        var ma = MODULE_META[a.getAttribute('data-module')] || {};
        var mb = MODULE_META[b.getAttribute('data-module')] || {};
        var ta = ma.time || ''; var tb = mb.time || '';
        var ta15 = ta.indexOf('15') !== -1 ? 0 : 1;
        var tb15 = tb.indexOf('15') !== -1 ? 0 : 1;
        if (ta15 !== tb15) return ta15 - tb15;
        return parseFloat(a.getAttribute('data-module')) - parseFloat(b.getAttribute('data-module'));
      });
      categorySections.forEach(function (sec) { sec.style.display = 'none'; });
      var tempGrid = grid.querySelector('.mg-flat-grid') || (function () {
        var g = document.createElement('div');
        g.className = 'module-grid mg-flat-grid';
        grid.appendChild(g);
        return g;
      })();
      cards.forEach(function (c) { tempGrid.appendChild(c); });
      tempGrid.style.display = 'grid';
    } else if (sortKey === 'progress') {
      var cards = Array.from(grid.querySelectorAll('.module-card[data-module]'));
      cards.sort(function (a, b) {
        var da = isModuleComplete(a.getAttribute('data-module')) ? 1 : 0;
        var db = isModuleComplete(b.getAttribute('data-module')) ? 1 : 0;
        if (da !== db) return db - da; /* complete first */
        return parseFloat(a.getAttribute('data-module')) - parseFloat(b.getAttribute('data-module'));
      });
      categorySections.forEach(function (sec) { sec.style.display = 'none'; });
      var tempGrid = grid.querySelector('.mg-flat-grid') || (function () {
        var g = document.createElement('div');
        g.className = 'module-grid mg-flat-grid';
        grid.appendChild(g);
        return g;
      })();
      cards.forEach(function (c) { tempGrid.appendChild(c); });
      tempGrid.style.display = 'grid';
    }
  }

  /* ── Main enhancement ── */
  function enhanceGrid() {
    var grid = document.querySelector('.module-grid');
    if (!grid || grid.classList.contains('mg-enhanced')) return;

    var lang = getLang();
    var completedCount = countCompleted();
    var cards = Array.from(grid.querySelectorAll('.module-card[data-module]'));
    if (cards.length === 0) return;

    grid.classList.add('mg-enhanced');

    /* Group cards by category */
    var groups = {};
    CATEGORIES.forEach(function (cat) { groups[cat.id] = []; });

    cards.forEach(function (card) {
      var m = card.getAttribute('data-module');
      var meta = MODULE_META[m];
      var catId = meta ? meta.category : 'further';
      if (groups[catId]) groups[catId].push(card);
      enhanceCard(card, m, lang);
    });

    /* "Start here" badge on module 1 */
    if (completedCount === 0) {
      var m1 = grid.querySelector('.module-card[data-module="1"]');
      if (m1) {
        var startBadge = document.createElement('span');
        startBadge.className = 'card-badge badge-start-here';
        startBadge.textContent = lang === 'fr' ? '👉 Commencez ici' : '👉 Start here';
        var content = m1.querySelector('.card-content');
        if (content) content.insertBefore(startBadge, content.firstChild);
      }
    }

    /* Build category sections */
    var fragment = document.createDocumentFragment();
    CATEGORIES.forEach(function (cat) {
      if (groups[cat.id].length === 0) return;
      var section = document.createElement('div');
      section.className = 'mg-category-section';
      section.setAttribute('data-cat', cat.id);

      var header = document.createElement('div');
      header.className = 'mg-category-header';
      header.innerHTML =
        '<h3 class="mg-category-title">' + (lang === 'fr' ? cat.fr : cat.en) + '</h3>' +
        '<p class="mg-category-desc">' + (lang === 'fr' ? cat.desc_fr : cat.desc_en) + '</p>';
      section.appendChild(header);

      var subGrid = document.createElement('div');
      subGrid.className = 'module-grid mg-sub-grid';
      groups[cat.id].forEach(function (card) { subGrid.appendChild(card); });
      section.appendChild(subGrid);

      fragment.appendChild(section);
    });

    /* Keep bonus card (no data-module) at end */
    var bonusCards = Array.from(grid.querySelectorAll('.module-card:not([data-module])'));
    if (bonusCards.length > 0) {
      var bonusSection = document.createElement('div');
      bonusSection.className = 'mg-category-section';
      var bonusHeader = document.createElement('div');
      bonusHeader.className = 'mg-category-header';
      bonusHeader.innerHTML =
        '<h3 class="mg-category-title">' + (lang === 'fr' ? '✨ Bonus' : '✨ Bonus') + '</h3>';
      bonusSection.appendChild(bonusHeader);
      var bonusGrid = document.createElement('div');
      bonusGrid.className = 'module-grid mg-sub-grid';
      bonusCards.forEach(function (c) { bonusGrid.appendChild(c); });
      bonusSection.appendChild(bonusGrid);
      fragment.appendChild(bonusSection);
    }

    grid.innerHTML = '';
    grid.appendChild(fragment);

    /* Build sort toggle above the grid */
    buildSortToggle(grid, lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.module-grid')) {
      enhanceGrid();
    }
  });

})();
