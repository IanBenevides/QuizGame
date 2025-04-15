
const CACHE_NAME = 'milionario-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap',
  'https://www.soundjay.com/buttons/sounds/button-3.mp3',
  'https://www.soundjay.com/buttons/sounds/button-10.mp3',
  'https://cdn.pixabay.com/audio/2021/08/04/audio_fa6b1d4b50.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
