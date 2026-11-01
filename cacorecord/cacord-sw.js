/* Ca&coRD dedicated service worker — scope is ./index.html ONLY. */
const CACHE_NAME='cacord-shell-v1';
const URLS=['./index.html','./cacord.webmanifest','./icons/cacord-192.png','./icons/cacord-512.png','./icons/cacord-180.png'];
const HOME=new URL('./index.html',self.location.href);
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k.startsWith('cacord-shell-') && k!==CACHE_NAME).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const requestURL=new URL(e.request.url);
  if(e.request.mode==='navigate' && requestURL.origin===HOME.origin && requestURL.pathname===HOME.pathname){
    e.respondWith(fetch(e.request).then(response=>{
      if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(c=>c.put(HOME.href,copy));}
      return response;
    }).catch(()=>caches.match(HOME.href)));
  }
  // Other pages and MP3 files are network-only; no cross-app caching.
});
