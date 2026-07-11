/* ============================================================
   Digital Confidence Centre — service worker kill switch
   (2026-07-11 v2 cutover)

   The original site's service worker was registered at this
   scope (/digital-confidence/) and cached the old pages. The
   original site now lives at /classic/ (with its own sw.js);
   the v2 site at root does not use a service worker. This
   file replaces the old worker on returning visitors, clears
   every cache it created, and unregisters itself so root
   pages are always served fresh from the network.
   ============================================================ */

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (names) {
        return Promise.all(names.map(function (n) { return caches.delete(n); }));
      })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (clients) {
        clients.forEach(function (client) { client.navigate(client.url); });
      })
  );
});
