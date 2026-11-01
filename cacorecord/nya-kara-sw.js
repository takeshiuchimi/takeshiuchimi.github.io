/* NyaKara dedicated Service Worker v6 — manages karaoke.html only. */
const CACHE_NAME = 'nyakara-shell-v6';
const ENTRY = new URL('./karaoke.html', self.location.href);
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(name => name.startsWith('nyakara-shell-') && name !== CACHE_NAME)
          .map(name => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.mode !== 'navigate') return;
  const url = new URL(event.request.url);
  if (url.origin !== ENTRY.origin || url.pathname !== ENTRY.pathname) return;
  event.respondWith(
    fetch(event.request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(ENTRY.href, copy)));
      }
      return response;
    }).catch(async () => (await caches.match(ENTRY.href)) || Response.error())
  );
});
