const CACHE_NAME = 'CT-v1';

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            '/convertir.js',
            '/convertir.css'
        ]);
    })());
});

self.addEventListener('fetch', event => {
    event.respondWidh((async () => {
        const cache = await caches.open(CACHE_NAME);

        const cacheResponse = await cache.match(event.request);
        if(cacheResponse) {
            return cacheResponse;
        }else {
            try {
                const fetchResponse = await fetch(event.request);

                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                // The network failed.
            }
        }
    })());
});