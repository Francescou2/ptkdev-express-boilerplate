caches.open("{{ config.site.url }}").then(function(cache) {
	fetch("{{ config.site.fullurl }}/pwa-updates").then(function(response) {
		var content_type = response.headers.get("content-type");
		if (content_type && content_type.includes("application/json")) {
			return response.json();
		}
	}).then(function(json) {
		"PWA Update: clean cache...";
		if ("{{ config.site.pwa.version }}" == json.version) {
			cache.delete("/images/image.png");
		}
	});
});