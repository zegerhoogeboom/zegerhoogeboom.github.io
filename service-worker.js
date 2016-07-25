---
    layout: null
---

var cacheName = 'zegerhoogeboom.github.io-cache-v1';
var filesToCache = [
    {% for page in site.html_pages %}
        '{{ page.url }}',
    {% endfor %}
    {% for page in site.posts %}
        '{{ page.url }}',
    {% endfor %}
    {% for asset in site.assets %}
        '{{ asset.url }}',
    {% endfor %}

// Blog posts
    '/resume'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    if (response) {
                        console.log('[*] Serving cached: ' + event.request.url);
                        return response;
                    }

                    console.log('[*] Fetching: ' + event.request.url);
                    return fetch(event.request);
                }
            )
    );
});
