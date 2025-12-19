
const CACHE_NAME = 'jackie-v3';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Enkel genomströmning för att undvika problem med sandbox-miljöer
  // som har restriktiva CORS-regler
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
