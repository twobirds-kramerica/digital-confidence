/* DCC v2 - support-page search filters (Sprint V2-5).
   One small script for the FAQ and Glossary pages. No dependencies,
   no old-site imports. Filters existing static markup only. */
(function () {
  'use strict';

  function norm(s) { return (s || '').toLowerCase(); }

  /* FAQ: filter <details class="faq-item"> by question + answer text. */
  var faqInput = document.getElementById('faq-search');
  if (faqInput) {
    var items = Array.prototype.slice.call(document.querySelectorAll('.faq-item'));
    var cats = Array.prototype.slice.call(document.querySelectorAll('.faq-category'));
    var count = document.getElementById('faq-search-count');
    var noRes = document.getElementById('faq-no-results');
    faqInput.addEventListener('input', function () {
      var q = norm(faqInput.value.trim());
      var shown = 0;
      items.forEach(function (it) {
        var hit = !q || norm(it.textContent).indexOf(q) !== -1;
        it.hidden = !hit;
        if (hit) shown++;
      });
      cats.forEach(function (cat) {
        var any = false, el = cat.nextElementSibling;
        while (el && !el.classList.contains('faq-category')) {
          if (el.classList.contains('faq-item') && !el.hidden) { any = true; break; }
          el = el.nextElementSibling;
        }
        cat.hidden = !any;
      });
      if (count) count.textContent = q ? shown + ' question' + (shown === 1 ? '' : 's') + ' match' : '';
      if (noRes) noRes.hidden = shown !== 0;
    });
  }

  /* Glossary: filter .gloss-card by term + definition text. */
  var glossInput = document.getElementById('gloss-search');
  if (glossInput) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.gloss-card'));
    var sections = Array.prototype.slice.call(document.querySelectorAll('.gloss-section'));
    var gCount = document.getElementById('gloss-count');
    var gNoRes = document.getElementById('gloss-no-results');
    var total = cards.length;
    if (gCount) gCount.textContent = 'Showing all ' + total + ' terms';

    function runFilter() {
      var q = norm(glossInput.value.trim());
      var shown = 0;
      cards.forEach(function (c) {
        var hit = !q || norm(c.textContent).indexOf(q) !== -1;
        c.hidden = !hit;
        if (hit) shown++;
      });
      sections.forEach(function (sec) {
        sec.hidden = !sec.querySelector('.gloss-card:not([hidden])');
      });
      if (gCount) gCount.textContent = q ? 'Showing ' + shown + ' of ' + total + ' terms' : 'Showing all ' + total + ' terms';
      if (gNoRes) gNoRes.hidden = shown !== 0;
    }

    /* Predictive suggestions: top 5 term names, so people don't have to
       type the whole word. Term-name matches rank above definition-text
       matches; matches at the START of the term rank above matches in
       the middle (so "pass" suggests "Password" before "Bypass"). */
    var suggestBox = document.getElementById('gloss-suggest');
    var terms = cards.map(function (c) {
      return { card: c, name: c.querySelector('.gloss-term').textContent, norm: norm(c.querySelector('.gloss-term').textContent) };
    });
    var activeIndex = -1;

    function closeSuggest() {
      suggestBox.hidden = true;
      suggestBox.innerHTML = '';
      glossInput.setAttribute('aria-expanded', 'false');
      activeIndex = -1;
    }

    function jumpTo(card) {
      closeSuggest();
      glossInput.value = card.querySelector('.gloss-term').textContent;
      runFilter();
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('gloss-jump-highlight');
      setTimeout(function () { card.classList.remove('gloss-jump-highlight'); }, 2000);
    }

    function renderSuggest(q) {
      if (!q) { closeSuggest(); return; }
      var starts = terms.filter(function (t) { return t.norm.indexOf(q) === 0; });
      var contains = terms.filter(function (t) { return t.norm.indexOf(q) > 0; });
      var top = starts.concat(contains).slice(0, 5);
      if (!top.length) { closeSuggest(); return; }
      suggestBox.innerHTML = '';
      top.forEach(function (t, i) {
        var li = document.createElement('li');
        li.setAttribute('role', 'presentation');
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gloss-suggest-item';
        btn.id = 'gloss-suggest-opt-' + i;
        btn.setAttribute('role', 'option');
        btn.textContent = t.name;
        btn.addEventListener('mousedown', function (e) { e.preventDefault(); jumpTo(t.card); });
        li.appendChild(btn);
        suggestBox.appendChild(li);
      });
      suggestBox.hidden = false;
      glossInput.setAttribute('aria-expanded', 'true');
      activeIndex = -1;
    }

    glossInput.addEventListener('input', function () {
      runFilter();
      renderSuggest(norm(glossInput.value.trim()));
    });

    glossInput.addEventListener('keydown', function (e) {
      var opts = suggestBox.querySelectorAll('.gloss-suggest-item');
      if (suggestBox.hidden || !opts.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % opts.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + opts.length) % opts.length;
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        opts[activeIndex].dispatchEvent(new MouseEvent('mousedown'));
        return;
      } else if (e.key === 'Escape') {
        closeSuggest();
        return;
      } else {
        return;
      }
      opts.forEach(function (o, i) { o.classList.toggle('is-active', i === activeIndex); });
      glossInput.setAttribute('aria-activedescendant', opts[activeIndex].id);
    });

    glossInput.addEventListener('blur', function () {
      setTimeout(closeSuggest, 100); /* delay so a click/mousedown on an option still registers */
    });
  }
})();
