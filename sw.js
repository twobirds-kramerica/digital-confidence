/* ============================================================
   Digital Confidence Centre — Service Worker
   Provides offline access to core pages and assets.
   Cache strategy: Cache-first for assets, network-first for pages.
   ============================================================ */

var CACHE_NAME = 'dcc-v1';

/* Core pages to pre-cache on install */
var PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/accessibility.css',
  '/css/mobile.css',
  '/js/app.js',
  '/js/accessibility.js',
  '/js/lang-toggle.js',
  '/offline.html'
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
          return cached || caches.match('/offline.html');
        });
      })
    );
  } else {
    /* Cache-first for CSS, JS, images, fonts */
    event.respondWith(
      caches.match(request).then(function (cached) {
        if (cached) return cached;
        return fetch(request).then(function (response) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, clone);
          });
          return response;
        });
      })
    );
  }
});
