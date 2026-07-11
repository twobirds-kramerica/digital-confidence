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
    glossInput.addEventListener('input', function () {
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
    });
  }
})();
