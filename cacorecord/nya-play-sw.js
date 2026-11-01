/* NyaPlay service worker v6 — controls song.html only; never intercepts other apps. */
const CACHE='nyaplay-song-shell-v6';
const ENTRY=new URL('./song.html',self.location.href);
self.addEventListener('install', event=>{
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate',event=>{
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET' || event.request.mode!=='navigate') return;
  const url=new URL(event.request.url);
  if(url.origin!==ENTRY.origin || url.pathname!==ENTRY.pathname) return;
  event.respondWith(fetch(event.request).then(response=>{
    if(response.ok) {
      const copy=response.clone();
      event.waitUntil(caches.open(CACHE).then(cache=>cache.put(ENTRY.href,copy)));
    }
    return response;
  }).catch(async()=> (await caches.match(ENTRY.href)) || Response.error()));
});
