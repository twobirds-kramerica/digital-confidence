/**
 * DCC News Feed — "AI & Digital Safety in the News"
 * Reads from data/news-feed.json (same-origin, updated daily by GitHub Action).
 * Silent-fail on any network error.
 */
(function () {
  'use strict';

  var JSON_URL = 'data/news-feed.json';

  function formatDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function buildItem(item) {
    var li = document.createElement('li');
    li.className = 'dcc-news-item';

    var a = document.createElement('a');
    a.href   = item.link || '#';
    a.target = '_blank';
    a.rel    = 'noopener noreferrer';
    a.className = 'dcc-news-link';
    a.textContent = item.title || '(no title)';

    var span = document.createElement('span');
    span.className = 'dcc-news-date';
    span.textContent = formatDate(item.pubDate);

    li.appendChild(a);
    li.appendChild(span);
    return li;
  }

  function renderItems(list, items) {
    list.innerHTML = '';
    if (!items || items.length === 0) {
      var empty = document.createElement('li');
      empty.className = 'dcc-news-empty';
      empty.textContent = 'No stories found right now. ';
      var fallback = document.createElement('a');
      fallback.href = 'https://www.cbc.ca/technology';
      fallback.target = '_blank';
      fallback.rel = 'noopener';
      fallback.textContent = 'Visit CBC Technology';
      empty.appendChild(fallback);
      list.appendChild(empty);
      return;
    }
    for (var i = 0; i < items.length; i++) {
      list.appendChild(buildItem(items[i]));
    }
  }

  function init() {
    var section = document.getElementById('dcc-news-feed');
    var list    = document.getElementById('dcc-news-list');
    if (!section || !list) return;

    fetch(JSON_URL)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (data) {
        if (!data || !data.items || !data.items.length) {
          section.style.display = 'none';
          return;
        }
        renderItems(list, data.items);
      })
      .catch(function () {
        section.style.display = 'none';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
