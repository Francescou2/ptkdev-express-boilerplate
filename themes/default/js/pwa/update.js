caches.open("{{ config.site.url }}").then(function(cache) {

	let current_url = window.location.href;
	let url = new URL(current_url);
	let lang = url.searchParams.get("lang");

	if(lang !== null){
		console.log("{{ translate.pwa_clean }} ");

		{% for url in config.site.pwa.files %}
		cache.delete("{{ config.site.fullurl }}{{ url }}");
		{% endfor %}
		{% for url in config.site.pwa.pages %}
		cache.delete("{{ config.site.fullurl }}{{ url }}");
		{% endfor %}

		sw_refresh();
	}

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

			sw_refresh();
		}
	});
});