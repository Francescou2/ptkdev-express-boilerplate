caches.open("{{ config.site.url }}").then(function(cache) {
	fetch("{{ config.site.fullurl }}/pwa-updates").then(function(response) {
		var content_type = response.headers.get("content-type");
		if (content_type && content_type.includes("application/json")) {
			return response.json();
		}
	}).then(function(json) {
		if ("{{ config.site.pwa.version }}" !== json.version) {
			console.log("{{ translate.pwa_clean }} ");

			{% for url in config.site.pwa.files %}
			cache.delete("{{ config.site.fullurl }}{{ url }}");
			{% endfor %}
			{% for url in config.site.pwa.pages %}
			cache.delete("{{ config.site.fullurl }}{{ url }}");
			{% endfor %}
		}
	});
});