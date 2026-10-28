/* ニャープレーヤー PWA v1.0
   オフライン時はプレーヤー画面のみ。MP3再生には通信が必要です。 */
const CACHE='nya-player-shell-v1';
const PRECACHE=['./song.html','./manifest.webmanifest','./icons/nya-player-180.png','./icons/nya-player-192.png','./icons/nya-player-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(PRECACHE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('nya-player-shell-')&&key!==CACHE).map(key=>caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  const scope=new URL(self.registration.scope);
  const pathname=url.pathname;
  // 楽曲はキャッシュしない。曲別ページやニャーカラオケの挙動は変更しない。
  if(pathname===scope.pathname+'song.html'){
    event.respondWith(fetch(request).then(response=>{
      if(response.ok&&response.type==='basic'){
        const copy=response.clone();
        event.waitUntil(caches.open(CACHE).then(cache=>cache.put('./song.html',copy)));
      }
      return response;
    }).catch(()=>caches.match('./song.html')));
  }else if(pathname.startsWith(scope.pathname+'icons/')||pathname===scope.pathname+'manifest.webmanifest'){
    event.respondWith(caches.match(request,{ignoreSearch:true}).then(hit=>hit||fetch(request)));
  }
});
