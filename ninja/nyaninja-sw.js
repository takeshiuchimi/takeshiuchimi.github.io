
'use strict';
const CACHE_PREFIX='nyaninja-'+new URL(self.registration.scope).pathname+'-';
const CACHE=CACHE_PREFIX+'0cb28b0ca8';
const FILES=['./','./index.html','./NyaNinja.html','./nyaninja.webmanifest','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png'];
const URLS=FILES.map(p=>new URL(p,self.registration.scope).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(URLS))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(CACHE_PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET')return;
 const url=new URL(request.url);url.search='';url.hash='';if(!URLS.includes(url.href))return;
 // Only this application's static files are cached. Image input and codes stay in page memory.
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const saved=await cache.match(url.href);if(saved)return saved;const response=await fetch(request);if(response.ok&&response.type==='basic')await cache.put(url.href,response.clone());return response;})());
});
