/* ============================================
   Homepage Module Grid — Categorised & Collapsible
   Matches sidebar 5-section structure.
   Begin Here: always open, featured cards.
   Safety First / Daily Life / Staying Independent: collapsible, state persisted in localStorage.
   ============================================ */

(function () {
  'use strict';

  var MODULE_META = {
    '1':   { category: 'begin',       time: '20 min', timeFr: '20 min', skill: '20 min to feel safe on any screen',         skillFr: '20 min pour naviguer sans panique' },
    '2':   { category: 'begin',       time: '25 min', timeFr: '25 min', skill: '25 min to spot online scams',               skillFr: '25 min pour repérer les arnaques' },
    '2.5': { category: 'begin',       time: '20 min', timeFr: '20 min', skill: '20 min to handle everyday digital tasks',   skillFr: '20 min pour les tâches numériques courantes' },
    '3':   { category: 'safety',      time: '25 min', timeFr: '25 min', skill: '25 min to secure your passwords',           skillFr: '25 min pour sécuriser vos mots de passe' },
    '4':   { category: 'safety',      time: '20 min', timeFr: '20 min', skill: '20 min to download apps safely',            skillFr: '20 min pour télécharger des applis en sécurité' },
    '5':   { category: 'safety',      time: '25 min', timeFr: '25 min', skill: '25 min to recognise phishing messages',     skillFr: '25 min pour reconnaître les messages hameçons' },
    '6':   { category: 'daily',       time: '30 min', timeFr: '30 min', skill: '30 min to bank safely online',              skillFr: '30 min pour faire ses opérations bancaires en ligne' },
    '7':   { category: 'daily',       time: '20 min', timeFr: '20 min', skill: '20 min to share photos with family',        skillFr: '20 min pour partager des photos en famille' },
    '8':   { category: 'daily',       time: '25 min', timeFr: '25 min', skill: '25 min to video call your family',          skillFr: '25 min pour appeler votre famille en vidéo' },
    '9':   { category: 'daily',       time: '25 min', timeFr: '25 min', skill: '25 min to understand AI tools',             skillFr: "25 min pour comprendre les outils d'IA" },
    '10':  { category: 'daily',       time: '20 min', timeFr: '20 min', skill: '20 min to order groceries online',          skillFr: '20 min pour commander des épiceries en ligne' },
    '11':  { category: 'daily',       time: '25 min', timeFr: '25 min', skill: '25 min to book a ride safely',              skillFr: '25 min pour réserver un taxi en toute sécurité' },
    '12':  { category: 'daily',       time: '20 min', timeFr: '20 min', skill: '20 min to find reliable tech help',         skillFr: "20 min pour trouver de l'aide technologique" },
    '13':  { category: 'daily',       time: '25 min', timeFr: '25 min', skill: '25 min to use social media safely',         skillFr: '25 min pour utiliser les réseaux sociaux en sécurité' },
    '14':  { category: 'daily',       time: '25 min', timeFr: '25 min', skill: '25 min to set up a smart speaker',          skillFr: '25 min pour configurer un assistant vocal' },
    '15':  { category: 'daily',       time: '25 min', timeFr: '25 min', skill: '25 min to see your doctor online',          skillFr: '25 min pour consulter votre médecin en ligne' },
    '16':  { category: 'independent', time: '25 min', timeFr: '25 min', skill: '25 min to stay safe while travelling',      skillFr: '25 min pour voyager avec votre téléphone' },
    '17':  { category: 'independent', time: '30 min', timeFr: '30 min', skill: '30 min to use AI research tools',           skillFr: '30 min pour utiliser les outils de recherche IA' },
    '18':  { category: 'independent', time: 'About 20 min', timeFr: 'Environ 20 min' },
    '19':  { category: 'independent', time: 'About 20 min', timeFr: 'Environ 20 min' },
    '20':  { category: 'independent', time: 'About 15 min', timeFr: 'Environ 15 min' },
    '21':  { category: 'independent', time: 'About 15 min', timeFr: 'Environ 15 min' },
    '22':  { category: 'independent', time: 'About 15 min', timeFr: 'Environ 15 min' },
    '23':  { category: 'independent', time: 'About 20 min', timeFr: 'Environ 20 min' },
    '24':  { category: 'independent', time: 'About 20 min', timeFr: 'Environ 20 min' }
  };

  var CATEGORIES = [
    {
      id: 'begin',
      en: 'Begin Here',
      fr: 'Commencez ici',
      icon: '👉',
      desc_en: 'Start with these three lessons. They build the foundation for everything that follows.',
      desc_fr: 'Commencez par ces trois leçons. Elles posent les bases de tout ce qui suit.',
      alwaysOpen: true,
      featured: true
    },
    {
      id: 'safety',
      en: 'Safety First',
      fr: 'La sécurité d\'abord',
      icon: '🛡️',
      desc_en: 'Passwords, app safety, and spotting scams — your digital self-defence toolkit.',
      desc_fr: 'Mots de passe, sécurité des applis et arnaques — votre boîte à outils de défense numérique.',
      alwaysOpen: false
    },
    {
      id: 'daily',
      en: 'Daily Life',
      fr: 'Vie quotidienne',
      icon: '🌤️',
      desc_en: 'Banking, staying connected, grocery delivery, and everyday digital tasks made easy.',
      desc_fr: 'Banque, rester en contact, épicerie et tâches numériques quotidiennes simplifiées.',
      alwaysOpen: false
    },
    {
      id: 'independent',
      en: 'Staying Independent',
      fr: 'Rester autonome',
      icon: '🌟',
      desc_en: 'Travel safety, managing your bills, and taking charge of your digital world.',
      desc_fr: 'Sécurité en voyage, gérer vos factures et prendre en main votre monde numérique.',
      alwaysOpen: false
    }
  ];

  var LS_PREFIX = 'dc-cat-';

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

  function getCatOpen(catId, defaultVal) {
    try {
      var stored = localStorage.getItem(LS_PREFIX + catId + '-open');
      if (stored === null) return defaultVal;
      return stored === 'true';
    } catch (e) { return defaultVal; }
  }

  function setCatOpen(catId, isOpen) {
    try { localStorage.setItem(LS_PREFIX + catId + '-open', isOpen ? 'true' : 'false'); } catch (e) {}
  }

  function enhanceCard(card, moduleNum, lang) {
    var meta = MODULE_META[moduleNum];
    if (!meta) return;
    var content = card.querySelector('.card-content');
    if (!content) return;

    if (!card.querySelector('.card-time')) {
      var timeEl = document.createElement('span');
      timeEl.className = 'card-time';
      var label = lang === 'fr'
        ? (meta.skillFr || meta.timeFr)
        : (meta.skill  || meta.time);
      timeEl.setAttribute('aria-label', label);
      timeEl.innerHTML = '&#9201; ' + label;
      content.appendChild(timeEl);
    }

    var progressEl = card.querySelector('.card-progress');
    if (progressEl && isModuleComplete(moduleNum)) {
      progressEl.textContent = '';
      card.classList.add('card-done');
      if (!card.querySelector('.card-complete-badge')) {
        var badge = document.createElement('span');
        badge.className = 'card-complete-badge';
        badge.textContent = lang === 'fr' ? '✅ Terminé' : '✅ Complete';
        content.appendChild(badge);
      }
    }
  }

  function injectCategoryStyles() {
    if (document.getElementById('mg-category-styles')) return;
    var style = document.createElement('style');
    style.id = 'mg-category-styles';
    style.textContent = [
      /* Section wrapper */
      '.mg-section{margin:0 0 1.5rem;}',

      /* Begin Here — always open, featured */
      '.mg-section--begin .mg-section-header{',
      '  display:flex;flex-direction:column;gap:0.25rem;',
      '  padding:0 0 0.75rem;border-bottom:3px solid var(--color-primary,#2A7B6F);',
      '  margin-bottom:1rem;',
      '}',
      '.mg-section--begin .mg-section-title{',
      '  font-size:1.35rem;font-weight:700;color:var(--color-primary,#2A7B6F);margin:0;',
      '  display:flex;align-items:center;gap:0.5rem;',
      '}',
      '.mg-section--begin .mg-section-badge{',
      '  display:inline-block;background:var(--color-primary,#2A7B6F);color:#fff;',
      '  font-size:0.72rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;',
      '  padding:3px 10px;border-radius:20px;',
      '}',
      '.mg-section--begin .mg-section-desc{',
      '  font-size:0.95rem;color:var(--color-text-light,#595959);margin:0;',
      '}',
      '.mg-section--begin .module-grid .module-card{',
      '  border-left:4px solid var(--color-primary,#2A7B6F);',
      '}',

      /* Collapsible sections */
      '.mg-section details{border:none;}',
      '.mg-section-summary{',
      '  list-style:none;cursor:pointer;',
      '  display:flex;align-items:center;gap:0.75rem;',
      '  padding:0.85rem 1rem;',
      '  background:var(--bg-surface,#f5f5f0);',
      '  border:1.5px solid var(--border-color,#e0e0e0);',
      '  border-radius:8px;',
      '  min-height:52px;',
      '  user-select:none;',
      '  transition:background 0.15s;',
      '}',
      '.mg-section-summary::-webkit-details-marker{display:none;}',
      '.mg-section-summary:hover{background:var(--bg-hover,#ede9e3);}',
      '[data-theme="dark"] .mg-section-summary{',
      '  background:#1E2D3D;border-color:#37474F;',
      '}',
      '[data-theme="dark"] .mg-section-summary:hover{background:#263238;}',
      '.mg-section-summary-icon{font-size:1.2rem;flex-shrink:0;}',
      '.mg-section-summary-text{flex:1;min-width:0;}',
      '.mg-section-summary-title{',
      '  font-size:1.05rem;font-weight:700;color:var(--color-heading,#1B3A4B);display:block;',
      '}',
      '[data-theme="dark"] .mg-section-summary-title{color:#E8EAF0;}',
      '.mg-section-summary-desc{',
      '  font-size:0.82rem;color:var(--color-text-light,#595959);display:block;margin-top:2px;',
      '}',
      '.mg-section-count{',
      '  font-size:0.78rem;font-weight:600;color:var(--color-text-light,#595959);',
      '  white-space:nowrap;',
      '}',
      '.mg-chevron{',
      '  font-size:0.8rem;color:var(--color-text-light,#888);',
      '  transition:transform 0.2s;flex-shrink:0;',
      '}',
      'details[open] .mg-chevron{transform:rotate(180deg);}',
      '.mg-section-body{padding:1rem 0 0;}',
      '.mg-section-desc-expanded{',
      '  font-size:0.9rem;color:var(--color-text-light,#595959);',
      '  margin:0 0 0.75rem;',
      '}',

      /* Bonus section */
      '.mg-section--bonus .mg-section-header{',
      '  padding:0.5rem 0 0.75rem;',
      '  border-bottom:1px solid var(--border-color,#e0e0e0);',
      '  margin-bottom:1rem;',
      '}',
      '.mg-section--bonus .mg-section-title{',
      '  font-size:1.05rem;font-weight:700;color:var(--color-text,#3D3229);',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }

  function buildBeginSection(cards, lang, completedCount) {
    var cat = CATEGORIES[0];
    var section = document.createElement('div');
    section.className = 'mg-section mg-section--begin';

    var header = document.createElement('div');
    header.className = 'mg-section-header';

    var titleRow = document.createElement('p');
    titleRow.className = 'mg-section-title';
    titleRow.innerHTML =
      '<span class="mg-section-badge" aria-label="Recommended starting point">' +
        (lang === 'fr' ? 'Commencez ici' : 'Start here') +
      '</span>&nbsp;' +
      (lang === 'fr' ? cat.fr : cat.en);

    var desc = document.createElement('p');
    desc.className = 'mg-section-desc';
    desc.textContent = lang === 'fr' ? cat.desc_fr : cat.desc_en;

    header.appendChild(titleRow);
    header.appendChild(desc);
    section.appendChild(header);

    /* "Start here" badge on Module 1 when no progress */
    if (completedCount === 0 && cards.length > 0) {
      var m1 = cards[0];
      var content = m1.querySelector('.card-content');
      if (content && !content.querySelector('.card-badge.badge-start-here')) {
        var badge = document.createElement('span');
        badge.className = 'card-badge badge-start-here';
        badge.textContent = lang === 'fr' ? '👉 Commencez ici' : '👉 Start here';
        content.insertBefore(badge, content.firstChild);
      }
    }

    var grid = document.createElement('div');
    grid.className = 'module-grid';
    cards.forEach(function (c) { grid.appendChild(c); });
    section.appendChild(grid);

    return section;
  }

  function buildCollapsibleSection(cat, cards, lang, bonusCards) {
    var section = document.createElement('div');
    section.className = 'mg-section';

    var details = document.createElement('details');
    var catOpen = getCatOpen(cat.id, false);
    if (catOpen) details.setAttribute('open', '');

    var summary = document.createElement('summary');
    summary.className = 'mg-section-summary';
    summary.setAttribute('aria-label', (lang === 'fr' ? cat.fr : cat.en));

    var count = cards.length + (bonusCards ? bonusCards.length : 0);
    var countLabel = count === 1
      ? (lang === 'fr' ? '1 module' : '1 module')
      : (lang === 'fr' ? count + ' modules' : count + ' modules');

    summary.innerHTML =
      '<span class="mg-section-summary-icon" aria-hidden="true">' + cat.icon + '</span>' +
      '<span class="mg-section-summary-text">' +
        '<span class="mg-section-summary-title">' + (lang === 'fr' ? cat.fr : cat.en) + '</span>' +
        '<span class="mg-section-summary-desc">' + (lang === 'fr' ? cat.desc_fr : cat.desc_en) + '</span>' +
      '</span>' +
      '<span class="mg-section-count">' + countLabel + '</span>' +
      '<span class="mg-chevron" aria-hidden="true">&#9660;</span>';

    details.appendChild(summary);

    var body = document.createElement('div');
    body.className = 'mg-section-body';

    var grid = document.createElement('div');
    grid.className = 'module-grid';
    cards.forEach(function (c) { grid.appendChild(c); });

    if (bonusCards && bonusCards.length > 0) {
      bonusCards.forEach(function (c) { grid.appendChild(c); });
    }

    body.appendChild(grid);
    details.appendChild(body);
    section.appendChild(details);

    details.addEventListener('toggle', function () {
      setCatOpen(cat.id, details.open);
    });

    return section;
  }

  function enhanceGrid() {
    var grid = document.querySelector('.module-grid');
    if (!grid || grid.classList.contains('mg-enhanced')) return;

    injectCategoryStyles();
    var lang = getLang();

    /* Remove any existing .module-category-divider elements */
    var dividers = grid.querySelectorAll('.module-category-divider');
    dividers.forEach(function (d) { d.parentNode.removeChild(d); });

    var cards = Array.from(grid.querySelectorAll('.module-card[data-module]'));
    var bonusCards = Array.from(grid.querySelectorAll('.module-card:not([data-module])'));
    if (cards.length === 0 && bonusCards.length === 0) return;

    grid.classList.add('mg-enhanced');

    var completedCount = 0;
    cards.forEach(function (card) {
      var m = card.getAttribute('data-module');
      if (isModuleComplete(m)) completedCount++;
    });

    /* Enhance all cards (time estimates, completion badges) */
    cards.forEach(function (card) {
      enhanceCard(card, card.getAttribute('data-module'), lang);
    });

    /* Group by category */
    var groups = { begin: [], safety: [], daily: [], independent: [] };
    cards.forEach(function (card) {
      var m = card.getAttribute('data-module');
      var meta = MODULE_META[m];
      var catId = meta ? meta.category : 'independent';
      if (groups[catId]) groups[catId].push(card);
    });

    /* Build new structure */
    var fragment = document.createDocumentFragment();

    /* Begin Here — always open */
    if (groups.begin.length > 0) {
      fragment.appendChild(buildBeginSection(groups.begin, lang, completedCount));
    }

    /* Safety First */
    if (groups.safety.length > 0) {
      fragment.appendChild(buildCollapsibleSection(CATEGORIES[1], groups.safety, lang, null));
    }

    /* Daily Life — include visual-ai (bonus) cards */
    if (groups.daily.length > 0 || bonusCards.length > 0) {
      fragment.appendChild(buildCollapsibleSection(CATEGORIES[2], groups.daily, lang, bonusCards));
    }

    /* Staying Independent */
    if (groups.independent.length > 0) {
      fragment.appendChild(buildCollapsibleSection(CATEGORIES[3], groups.independent, lang, null));
    }

    grid.innerHTML = '';
    grid.appendChild(fragment);
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.module-grid')) {
      enhanceGrid();
    }
  });

})();
