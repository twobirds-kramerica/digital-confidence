/* ============================================================
   module-ecosystem.js
   Injects "What You Learned" summaries and enriches Quick Answers
   on every module page.
   Data sourced from /data/module-summaries.json and /data/module-qas.json
   ============================================================ */

(function () {
  'use strict';

  /* Map URL filename to data key */
  var FILE_TO_KEY = {
    'module-1.html':                     'module-1',
    'module-2.html':                     'module-2',
    'module-2-5.html':                   'module-2.5',
    'module-3.html':                     'module-3',
    'module-4.html':                     'module-4',
    'module-5.html':                     'module-5',
    'module-6.html':                     'module-6',
    'module-7.html':                     'module-7',
    'module-8.html':                     'module-8',
    'module-9.html':                     'module-9',
    'module-10.html':                    'module-10',
    'module-11.html':                    'module-11',
    'module-12.html':                    'module-12',
    'module-13.html':                    'module-13',
    'module-14.html':                    'module-14',
    'module-15.html':                    'module-15',
    'module-16-travel-safety.html':      'module-16',
    'module-17-ai-research.html':        'module-17',
    'module-18-staying-connected.html':  'module-18',
    'module-19-digital-legacy.html':     'module-19'
  };

  function isFr() {
    return (document.documentElement.lang || '').toLowerCase().indexOf('fr') === 0;
  }

  function getCurrentKey() {
    var filename = window.location.pathname.split('/').pop() || '';
    return FILE_TO_KEY[filename] || null;
  }

  function injectStyles() {
    if (document.getElementById('dc-ecosystem-styles')) return;
    var style = document.createElement('style');
    style.id = 'dc-ecosystem-styles';
    style.textContent = [
      '.dc-what-learned{background:#E8F5E9;border-left:5px solid #2E7D32;',
      'border-radius:8px;padding:1.5rem 1.75rem;margin:2rem 0;}',
      '.dc-what-learned h3{color:#1B5E20;font-size:1.15rem;margin:0 0 0.85rem;}',
      '.dc-what-learned ul{margin:0;padding-left:1.25rem;}',
      '.dc-what-learned li{margin-bottom:0.6rem;line-height:1.55;font-size:1rem;color:#2E7D32;}',
      '.dc-what-learned li:last-child{margin-bottom:0;}'
    ].join('');
    document.head.appendChild(style);
  }

  /* ---- Inject "What You Learned" summary ---- */
  function injectSummary(key, summaries) {
    var tips = summaries[key];
    if (!tips || !tips.length) return;

    var heading = isFr() ? 'Ce que vous avez appris' : 'What You Learned';
    var box = document.createElement('div');
    box.className = 'dc-what-learned';
    box.setAttribute('role', 'complementary');
    box.setAttribute('aria-label', heading);
    box.innerHTML = '<h3>' + heading + '</h3><ul>' +
      tips.map(function (t) { return '<li>' + t + '</li>'; }).join('') +
      '</ul>';

    /* Insert before .sources-block or before .quick-answers-accordion */
    var target = document.querySelector('.sources-block') ||
                 document.querySelector('.quick-answers-accordion') ||
                 document.querySelector('main');

    if (target && target.parentNode) {
      target.parentNode.insertBefore(box, target);
    }
  }

  /* ---- Enrich Quick Answers if fewer than 3 Q&As exist ---- */
  function enrichQAs(key, qas) {
    var data = qas[key];
    if (!data || !data.length) return;

    var accordion = document.querySelector('.quick-answers-accordion');
    if (!accordion) return;

    /* Count existing QA items */
    var existing = accordion.querySelectorAll('.qa-item');
    var existingCount = existing.length;

    /* Add any Q&As not already present (match by question text) */
    var existingQs = [];
    for (var i = 0; i < existing.length; i++) {
      var btn = existing[i].querySelector('.qa-question span');
      if (btn) existingQs.push(btn.textContent.trim().toLowerCase());
    }

    data.forEach(function (item) {
      var qNorm = item.q.toLowerCase().trim();
      /* Skip if a very similar question already exists */
      var alreadyThere = existingQs.some(function (eq) {
        return eq.indexOf(qNorm.substring(0, 25)) !== -1;
      });
      if (alreadyThere) return;

      var div = document.createElement('div');
      div.className = 'qa-item';
      div.innerHTML = [
        '<button class="qa-question" aria-expanded="false">',
        '<span>' + item.q + '</span>',
        '<span class="qa-chevron" aria-hidden="true">&#9660;</span>',
        '</button>',
        '<div class="qa-answer" hidden>',
        '<p>' + item.a + '</p>',
        '</div>'
      ].join('');
      accordion.appendChild(div);
    });

    /* Re-initialise accordion for newly added items */
    if (window.DCC_QAAccordion && typeof window.DCC_QAAccordion.init === 'function') {
      window.DCC_QAAccordion.init();
    } else {
      /* Inline fallback if qa-accordion.js hasn't run yet */
      accordion.querySelectorAll('.qa-question').forEach(function (btn) {
        if (btn.dataset.ecoBound) return;
        btn.dataset.ecoBound = '1';
        btn.addEventListener('click', function () {
          var expanded = btn.getAttribute('aria-expanded') === 'true';
          var answer = btn.nextElementSibling;
          btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          if (answer) {
            if (expanded) { answer.hidden = true; } else { answer.removeAttribute('hidden'); }
          }
        });
      });
    }
  }

  function init() {
    var key = getCurrentKey();
    if (!key) return;

    injectStyles();

    /* Fetch both data files in parallel. Relative paths — all consumer
       pages sit at the repo root, and domain-root paths 404 on GitHub
       Pages project sites. */
    var summaryUrl = 'data/module-summaries.json';
    var qaUrl = 'data/module-qas.json';

    Promise.all([
      fetch(summaryUrl).then(function (r) { return r.json(); }).catch(function () { return {}; }),
      fetch(qaUrl).then(function (r) { return r.json(); }).catch(function () { return {}; })
    ]).then(function (results) {
      injectSummary(key, results[0]);
      enrichQAs(key, results[1]);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
