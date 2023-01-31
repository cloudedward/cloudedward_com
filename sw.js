var CACHE_NAME = 'pwgen-cache-v1';
var urlsToCache = [
    "index.html",
    "favicon.html",
    "src/js/prism.js",
    "src/css/prism.css"
];
console.log('loading sw.js');

self.addEventListener('install', function (event) {
    // Perform install steps
    console.log('installing sw');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                var x = cache.addAll(urlsToCache);
                console.log('cache added');
                return x;
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
                return fetch(event.request);
            }
            )
    );
});