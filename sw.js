let staticCache = 'resturant-cache-1';


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith("my-") && cacheName != staticCache
                }).map(function (cacheName) {
                    return cache.delete(cacheName);
                })

            );
        })
    );
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCache).then(function (cache) {
            return cache.addAll(
                [   
                    '/',
                    'img/',
                    'css/styles.css',
                    'js/dbhelper.js',
                    'js/main.js',
                    'js/restaurant_info.js',
                ]
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request)
        })
    );
});