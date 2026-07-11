/* ============================================================
   Digital Confidence Centre — Service Worker
   Provides offline access to core pages and assets.
   Cache strategy: Cache-first for assets, network-first for pages.
   JSON data files: cache-first with network update.
   ============================================================ */

var CACHE_NAME = 'dcc-v21';

/* Core pages to pre-cache on install.
   Paths are relative to this script's location so they resolve correctly
   on GitHub Pages project sites, where the site root is not the domain root. */
var PRECACHE_URLS = [
  './',
  'index.html',
  'css/main.css',
  'css/accessibility.css',
  'css/mobile.css',
  'js/app.js',
  'js/accessibility.js',
  'js/lang-toggle.js',
  'offline.html',
  /* JSON data files — cached so quizzes and summaries work offline */
  'data/module-quizzes.json',
  'data/module-summaries.json',
  'data/module-qas.json',
  'data/cheat-sheet-tips.json',
  'data/module-meta.json',
  'data/scam-of-month.json',
  'data/answers-index.json',
  'data/content-dates.json',
  'data/tips-index.json'
];

/* ---- Install: pre-cache core assets ---- */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

/* ---- Activate: clean up old caches ---- */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          return key !== CACHE_NAME;
        }).map(function (key) {
          return caches.delete(key);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* ---- Fetch: network-first for HTML, cache-first for assets ---- */
self.addEventListener('fetch', function (event) {
  var request = event.request;

  /* Only handle GET requests to same origin */
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  var url = request.url;

  /* JSON data files: cache-first, then update cache in background */
  var isJSON = url.indexOf('/data/') !== -1 && url.indexOf('.json') !== -1;
  if (isJSON) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(request).then(function (cached) {
          var networkFetch = fetch(request).then(function (response) {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(function () {
            return null;
          });
          /* Return cached immediately; update cache in background */
          return cached || networkFetch;
        });
      })
    );
    return;
  }

  var isHTML = request.headers.get('Accept') &&
               request.headers.get('Accept').indexOf('text/html') !== -1;

  if (isHTML) {
    /* Network-first for HTML pages */
    event.respondWith(
      fetch(request).then(function (response) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(request, clone);
        });
        return response;
      }).catch(function () {
        return caches.match(request).then(function (cached) {
          return cached || caches.match('offline.html');
        });
      })
    );
  } else {
    /* Stale-while-revalidate for CSS, JS, images, fonts.
       Plain cache-first meant deployed asset changes NEVER reached
       returning visitors (no cache busting on this site) — serve the
       cached copy for speed, but always refresh the cache in the
       background so the next page view gets the new version. */
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(request).then(function (cached) {
          var networkFetch = fetch(request).then(function (response) {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(function () {
            return cached;
          });
          return cached || networkFetch;
        });
      })
    );
  }
});
