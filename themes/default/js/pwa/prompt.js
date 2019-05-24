if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("{{ config.site.fullurl }}/sw.js").then(function(registration) {
		console.log("{{ translate.sw_reg }}");
	});

	navigator.serviceWorker.ready.then(function(registration) {
		console.log("{{ translate.sw_ready }}");
	});
}

if ("{{ config.site.pwa.install }}" === "enabled") {
let pwa_deferred_prompt;
let pwa_add_btn = document.getElementById("pwa-install");
pwa_add_btn.style.display="none";
	window.addEventListener("beforeinstallprompt", (e) => {
		e.preventDefault();
		pwa_deferred_prompt = e;
		pwa_add_btn.style.display="flex";
		pwa_add_btn.addEventListener("click", (e) => {
			pwa_deferred_prompt.prompt();
			pwa_deferred_prompt.userChoice.then((choice_result) => {
				if (choice_result.outcome === "accepted") {
					console.log("{{ translate.pwa_installed }}");
				} else {
					console.log("{{ translate.pwa_dismiss }}");
				}
				pwa_deferred_prompt = null;
			});
		});
	});
}