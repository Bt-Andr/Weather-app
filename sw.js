const cacheName = 'weather-app-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/weather.ico'
];

// Installation : cache les fichiers
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(filesToCache);
        })
    );
});

// Fetch : sert depuis cache si offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});