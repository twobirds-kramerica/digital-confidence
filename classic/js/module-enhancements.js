/**
 * module-enhancements.js
 * Phase 2 — Module Ecosystem Polish
 * Injects: header badge/metadata, collapsible summary, star rating, share button, section progress
 * Zero HTML changes to module files — everything injected via JS
 */

(function () {
  'use strict';

  // ── Determine current module key from URL ──────────────────────────────────
  function getModuleKey() {
    var path = window.location.pathname;
    var file = path.split('/').pop().replace('.html', '');
    return file || null;
  }

  // ── Fetch module metadata and initialise enhancements ─────────────────────
  function init() {
    var key = getModuleKey();
    if (!key) return;

    // Only run on module-type pages
    var modulePattern = /^(module-|digital-literacy|family-setup|module-visual-ai)/;
    if (!modulePattern.test(key)) return;

    fetch('data/module-meta.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var meta = data.modules[key];
        if (!meta) return;

        var isfr = document.documentElement.lang === 'fr' ||
          (localStorage.getItem('dc-lang') === 'fr');

        injectHeaderBadge(meta, isfr);
        injectCollapsibleSummary(meta, isfr);
        injectStarRating(meta, isfr);
        injectShareButton(meta, isfr);
        initSectionProgress(meta);
      })
      .catch(function () { /* silent fail */ });
  }

  // ── 2A: Header badge / metadata strip ─────────────────────────────────────
  function injectHeaderBadge(meta, isfr) {
    var h1 = document.querySelector('.main-content h1:not(.sidebar-header h1)');
    if (!h1) return;
    if (document.querySelector('.module-meta-strip')) return; // already injected

    var category = isfr ? meta.categoryFr : meta.category;
    var difficulty = isfr ? meta.difficultyFr : meta.difficulty;
    var updated = isfr ? meta.updatedFr : meta.updated;
    var updatedLabel = isfr ? 'Mis à jour' : 'Updated';
    var timeLabel = isfr ? 'Durée' : 'Read time';

    var strip = document.createElement('div');
    strip.className = 'module-meta-strip';
    strip.setAttribute('aria-label', isfr ? 'Informations sur le module' : 'Module information');
    strip.innerHTML =
      '<span class="module-badge">' + meta.categoryIcon + ' ' + category + '</span>' +
      '<span class="module-meta-item"><span class="module-meta-label">' + timeLabel + '</span> ' + meta.time + '</span>' +
      '<span class="module-meta-item"><span class="module-meta-label">' + (isfr ? 'Niveau' : 'Level') + '</span> ' + difficulty + '</span>' +
      '<span class="module-meta-item"><span class="module-meta-label">' + updatedLabel + '</span> ' + updated + '</span>';

    h1.insertAdjacentElement('afterend', strip);
  }

  // ── 2B: Collapsible summary ────────────────────────────────────────────────
  function injectCollapsibleSummary(meta, isfr) {
    var strip = document.querySelector('.module-meta-strip');
    if (!strip) return;
    if (document.querySelector('.module-summary-block')) return;

    var summary = isfr ? meta.summaryFr : meta.summary;
    var items = isfr ? meta.whatYouLearnFr : meta.whatYouLearn;
    var summaryTitle = isfr ? 'Résumé du module' : 'Module Summary';
    var learnTitle = isfr ? 'Ce que vous allez apprendre :' : 'What you will learn:';

    var learnHtml = (items || []).map(function (item) {
      return '<li>' + item + '</li>';
    }).join('');

    var block = document.createElement('details');
    block.className = 'module-summary-block';
    block.innerHTML =
      '<summary class="module-summary-toggle">' +
        '<span class="summary-icon">📋</span> ' + summaryTitle +
        '<span class="summary-chevron" aria-hidden="true">▼</span>' +
      '</summary>' +
      '<div class="module-summary-body">' +
        '<p>' + summary + '</p>' +
        '<p class="summary-learn-label"><strong>' + learnTitle + '</strong></p>' +
        '<ul class="summary-learn-list">' + learnHtml + '</ul>' +
      '</div>';

    strip.insertAdjacentElement('afterend', block);
  }

  // ── 2C: Star rating ────────────────────────────────────────────────────────
  function injectStarRating(meta, isff) {
    var anchor = document.querySelector('.related-modules, .quick-answers-accordion, .sources-block');
    if (!anchor) return;
    if (document.querySelector('.module-star-rating')) return;

    var key = getModuleKey();
    var stored = localStorage.getItem('dc-rating-' + key);
    var currentRating = stored ? parseInt(stored, 10) : 0;

    var labelText = isff ? 'Évaluez ce module :' : 'Rate this module:';
    var thanksText = isff ? 'Merci !' : 'Thank you!';
    var stars = '';
    for (var i = 1; i <= 5; i++) {
      stars += '<button class="star-btn' + (i <= currentRating ? ' star-active' : '') +
        '" data-star="' + i + '" aria-label="' + i + ' star' + (i > 1 ? 's' : '') + '"' +
        ' aria-pressed="' + (i <= currentRating ? 'true' : 'false') + '">★</button>';
    }

    var widget = document.createElement('div');
    widget.className = 'module-star-rating';
    widget.innerHTML =
      '<span class="star-label">' + labelText + '</span>' +
      '<div class="star-row" role="group" aria-label="' + labelText + '">' + stars + '</div>' +
      '<span class="star-thanks" aria-live="polite">' + (currentRating ? thanksText : '') + '</span>';

    anchor.insertAdjacentElement('beforebegin', widget);

    // Star click handler
    widget.querySelectorAll('.star-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var rating = parseInt(btn.getAttribute('data-star'), 10);
        localStorage.setItem('dc-rating-' + key, rating);
        widget.querySelectorAll('.star-btn').forEach(function (b, idx) {
          var active = (idx + 1) <= rating;
          b.classList.toggle('star-active', active);
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        widget.querySelector('.star-thanks').textContent = thanksText;
        // Fire GA4 event if available
        if (typeof gtag === 'function') {
          gtag('event', 'module_rated', { module: key, rating: rating });
        }
      });
    });
  }

  // ── 2C: Share button ───────────────────────────────────────────────────────
  function injectShareButton(meta, isff) {
    var existing = document.querySelector('.module-share-btn');
    if (existing) return;

    var anchor = document.querySelector('.module-star-rating, .related-modules, .quick-answers-accordion');
    if (!anchor) return;

    var shareLabel = isff ? 'Partager cette leçon' : 'Share this lesson';
    var copiedLabel = isff ? 'Lien copié !' : 'Link copied!';

    var btn = document.createElement('button');
    btn.className = 'module-share-btn';
    btn.setAttribute('aria-label', shareLabel);
    btn.textContent = '🔗 ' + shareLabel;

    btn.addEventListener('click', function () {
      var url = window.location.href;
      if (navigator.share) {
        navigator.share({ title: meta.title, url: url }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          btn.textContent = '✓ ' + copiedLabel;
          setTimeout(function () { btn.textContent = '🔗 ' + shareLabel; }, 2500);
        }).catch(function () {});
      }
      if (typeof gtag === 'function') {
        gtag('event', 'module_shared', { module: getModuleKey() });
      }
    });

    anchor.insertAdjacentElement('beforebegin', btn);
  }

  // ── 2D: Section progress bar ──────────────────────────────────────────────
  function initSectionProgress(meta) {
    var sections = Array.from(document.querySelectorAll('.main-content h2'));
    if (sections.length < 2) return;
    if (document.querySelector('.section-progress-bar')) return;

    var isfr = document.documentElement.lang === 'fr' ||
      (localStorage.getItem('dc-lang') === 'fr');

    /* ── localStorage key for this module's section progress ── */
    var storageKey = 'dc-section-progress-' + getModuleKey();
    var savedSection = parseInt(localStorage.getItem(storageKey) || '1', 10);
    if (isNaN(savedSection) || savedSection < 1) savedSection = 1;

    var total = sections.length;
    var currentSection = 1;

    /* ── Build progress bar ── */
    var bar = document.createElement('div');
    bar.className = 'section-progress-bar';
    bar.setAttribute('role', 'status');
    bar.setAttribute('aria-live', 'polite');
    bar.setAttribute('aria-label', isfr ? 'Progression de la section' : 'Section progress');

    var labelOf = isfr ? 'de' : 'of';
    var labelSection = isfr ? 'Section' : 'Section';

    bar.innerHTML =
      '<div class="spb-inner">' +
        '<span class="spb-text">' + labelSection + ' <strong class="spb-current">1</strong> ' + labelOf + ' ' + total + '</span>' +
        '<div class="spb-track"><div class="spb-fill" style="width:' + Math.round((1 / total) * 100) + '%"></div></div>' +
      '</div>';

    document.body.appendChild(bar);

    var fill = bar.querySelector('.spb-fill');
    var currentEl = bar.querySelector('.spb-current');

    /* ── Resume banner if returning to a partially read module ── */
    if (savedSection > 1 && savedSection <= total) {
      var resumeTarget = sections[savedSection - 1];
      if (resumeTarget && !document.querySelector('.spb-resume-banner')) {
        var resumeBanner = document.createElement('div');
        resumeBanner.className = 'spb-resume-banner';
        resumeBanner.style.cssText = [
          'background:#fff3e0;border-left:4px solid #e65100;border-radius:0 8px 8px 0',
          'padding:10px 16px;margin:12px 0;font-size:0.9rem;display:flex',
          'align-items:center;justify-content:space-between;gap:12px'
        ].join(';');
        var resumeText = isfr
          ? 'Vous en étiez à la section ' + savedSection + ' sur ' + total + ' lors de votre dernière visite.'
          : 'You were on section ' + savedSection + ' of ' + total + ' last time.';
        var resumeLink = isfr ? 'Reprendre →' : 'Resume →';
        resumeBanner.innerHTML =
          '<span>📖 ' + resumeText + '</span>' +
          '<a href="#" class="spb-resume-link" style="color:#e65100;font-weight:700;white-space:nowrap;text-decoration:none">' + resumeLink + '</a>';

        var firstSection = document.querySelector('.main-content');
        if (firstSection) firstSection.insertBefore(resumeBanner, firstSection.firstChild);

        resumeBanner.querySelector('.spb-resume-link').addEventListener('click', function (e) {
          e.preventDefault();
          resumeTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
          resumeBanner.style.display = 'none';
        });
      }
    }

    /* ── IntersectionObserver for section tracking ── */
    function saveProgress(n) {
      try { localStorage.setItem(storageKey, String(n)); } catch (err) { /* ignore */ }
    }

    function updateBar(n) {
      if (n < 1) n = 1;
      if (n > total) n = total;
      currentSection = n;
      currentEl.textContent = n;
      fill.style.width = Math.round((n / total) * 100) + '%';
      bar.setAttribute('aria-label', (isfr ? 'Section ' + n + ' de ' + total : 'Section ' + n + ' of ' + total));
      saveProgress(n);
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = sections.indexOf(entry.target);
            if (idx !== -1) updateBar(idx + 1);
          }
        });
      }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

      sections.forEach(function (section) { observer.observe(section); });
    } else {
      /* Fallback: scroll listener */
      function onScroll() {
        var scrollY = window.scrollY + 140;
        var active = 1;
        sections.forEach(function (section, idx) {
          if (section.getBoundingClientRect().top + window.scrollY <= scrollY) {
            active = idx + 1;
          }
        });
        if (active !== currentSection) updateBar(active);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  // ── Bootstrap ──────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run summary injection with correct language after lang toggle
  document.addEventListener('dc-lang-changed', function () {
    document.querySelectorAll('.module-meta-strip, .module-summary-block, .module-star-rating, .module-share-btn, .section-progress-bar')
      .forEach(function (el) { el.remove(); });
    init();
  });

})();
