const CACHE='wheel-tracker-v8-live';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('query1.finance.yahoo.com')||e.request.url.includes('corsproxy.io')||e.request.url.includes('allorigins.win')) return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});