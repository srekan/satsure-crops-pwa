/*eslint no-console: 0 */
console.log('Worker here')
var CACHE_NAME = 'my-site-cache-v1.0.1';
var urlsToCache = [
    'index.html',
    'favicon.ico',
    'main.86690e6f1a5e7aa4e9ac.css',
    'index.html',
    'main.86690e6f1a5e7aa4e9ac.css.map',
    'main.2a36bdd3309b08162d40.js',
    'main.2a36bdd3309b08162d40.js.map',
    // '/sw.js',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});