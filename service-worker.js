---
    layout: null
---

var cacheName = "zegerhoogeboom.github.io-{{site.time | date: '%Y%m%d%H%M%S'}}";
var filesToCache = [
    {% for page in site.html_pages %}
        '{{ page.url }}',
    {% endfor %}
    {% for page in site.posts %}
        '{{ page.url }}',
    {% endfor %}
    {% for file in site.static_files %}
        '{{ file.path }}',
    {% endfor %}
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
