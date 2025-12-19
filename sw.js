
const CACHE_NAME = 'jackie-v1';
// Vi använder relativa sökvägar (./) för att det ska fungera på GitHub Pages subfolders
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache öppen, lägger till filer...');
        return cache.addAll(ASSETS);
      })
      .catch(err => console.error('Cache addAll misslyckades:', err))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
