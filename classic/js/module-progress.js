/* ============================================================
   DCC — Module progress dots (S-030)
   Auto-generates a thin dot strip below the <h1> of module pages,
   one dot per <h2> section. Dots fill as the user scrolls past
   each section (IntersectionObserver). Persists in localStorage
   keyed by page slug so a returning user sees prior progress.
   Filled dots are also visibly announced to assistive tech.
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_PREFIX = 'dcc-module-progress:';

  function init() {
    var main = document.querySelector('main#main, main.main-content');
    if (!main) return;
    if (main.querySelector('.module-progress-dots')) return;

    var h1 = main.querySelector('h1');
    var h2s = main.querySelectorAll('h2');
    if (!h1 || h2s.length < 2) return;

    var slug = pageSlug();
    var saved = loadProgress(slug, h2s.length);

    var nav = document.createElement('nav');
    nav.className = 'module-progress-dots';
    nav.setAttribute('aria-label', 'Module progress');

    var list = document.createElement('ol');
    list.className = 'module-progress-dots__list';

    var dots = [];
    for (var i = 0; i < h2s.length; i++) {
      var li = document.createElement('li');
      li.className = 'module-progress-dots__item';
      if (saved[i]) li.classList.add('is-complete');

      var dot = document.createElement('span');
      dot.className = 'module-progress-dots__dot';
      dot.setAttribute('aria-hidden', 'true');

      var lbl = document.createElement('span');
      lbl.className = 'sr-only';
      var headingText = (h2s[i].textContent || '').trim() || ('Section ' + (i + 1));
      lbl.textContent = 'Section ' + (i + 1) + ': ' + headingText +
                        (saved[i] ? ' (read)' : ' (not yet read)');

      li.appendChild(dot);
      li.appendChild(lbl);
      list.appendChild(li);
      dots.push({ el: li, label: lbl, heading: headingText });
    }

    var counter = document.createElement('span');
    counter.className = 'module-progress-dots__counter';
    counter.setAttribute('aria-live', 'polite');
    counter.textContent = countLabel(saved);

    nav.appendChild(list);
    nav.appendChild(counter);

    if (h1.nextSibling) {
      h1.parentNode.insertBefore(nav, h1.nextSibling);
    } else {
      h1.parentNode.appendChild(nav);
    }

    /* IntersectionObserver: mark a dot complete when the corresponding
       H2 crosses ~40% from the top of the viewport. */
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = parseInt(entry.target.dataset.progressIdx, 10);
          if (!isNaN(idx) && !saved[idx]) {
            saved[idx] = true;
            dots[idx].el.classList.add('is-complete');
            dots[idx].label.textContent =
              'Section ' + (idx + 1) + ': ' + dots[idx].heading + ' (read)';
            counter.textContent = countLabel(saved);
            saveProgress(slug, saved);
          }
        }
      });
    }, { rootMargin: '0px 0px -55% 0px', threshold: 0 });

    for (var j = 0; j < h2s.length; j++) {
      h2s[j].dataset.progressIdx = j;
      observer.observe(h2s[j]);
    }
  }

  function pageSlug() {
    var p = location.pathname.split('/').pop() || 'index';
    return p.replace(/\.html?$/, '') || 'index';
  }

  function loadProgress(slug, count) {
    var out = [];
    for (var i = 0; i < count; i++) out.push(false);
    try {
      var raw = localStorage.getItem(STORAGE_PREFIX + slug);
      if (!raw) return out;
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return out;
      for (var j = 0; j < count && j < parsed.length; j++) {
        out[j] = !!parsed[j];
      }
    } catch (e) {}
    return out;
  }

  function saveProgress(slug, arr) {
    try {
      localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(arr));
    } catch (e) {}
  }

  function countLabel(arr) {
    var done = 0;
    for (var i = 0; i < arr.length; i++) if (arr[i]) done++;
    return done + ' of ' + arr.length + ' sections read';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
