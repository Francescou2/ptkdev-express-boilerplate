self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open("{{ config.site.url }}").then(function(cache) {
			return cache.addAll(["{{ config.site.pwa.cache }}"]);
		})
	);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function() {
      return caches.match('/offline');
    })
  );
});