'use strict';
const PREFIX='nyabell-'+new URL(self.registration.scope).pathname+'-';
const CACHE=PREFIX+'4bfb4ee36b15';
const ASSETS=['./','./index.html','./nyabell.webmanifest','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png'].map(p=>new URL(p,self.registration.scope).href);
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:'reload'})))));});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith(PREFIX)&&k!==CACHE)await caches.delete(k);await self.clients.claim();})());});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);u.search='';u.hash='';if(!ASSETS.includes(u.href))return;e.respondWith((async()=>{const c=await caches.open(CACHE),saved=await c.match(u.href);if(saved)return saved;const r=await fetch(e.request);if(r.ok&&r.type==='basic')await c.put(u.href,r.clone());return r;})());});
