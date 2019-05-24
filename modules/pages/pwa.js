/**
 * Progressive web app
 * =====================
 * Express routes
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
const core = require("./../core/core");
const Log = require("./../logger/log");
const lang = require(`./../routes/languages`);

class Pwa {
	constructor() {
		this.core = core;

		this.LOG_NAME = "pages";
		this.log = new Log(this.LOG_NAME);
		this.lang = lang;
	}

	/**
	 * Initialize pages (service worker and pwa)
	 * =====================
	 * Express render
	 *
	 */
	serviceworker() {
		let self = this;

		this.core.config.site.pwa.cache = (this.core.config.site.pwa.pages.concat(this.core.config.site.pwa.files));
		for (let i in this.core.config.site.pwa.cache) {
			this.core.config.site.pwa.cache[i] = this.core.config.site.fullurl + this.core.config.site.pwa.cache[i];
		}
		this.core.config.site.pwa.cache = this.core.config.site.pwa.cache.join("\",\"");

		this.core.app.get("/sw.js", function(req, res) {
			res.header("Content-Type", "text/javascript");
		    res.render("./js/pwa/sw.js", {"config": self.core.config, "translate": self.lang[self.core.config.system.language]});
		});
	}

	/**
	 * Initialize pages (service worker and pwa)
	 * =====================
	 * Express render
	 *
	 */
	webmanifest() {
		let self = this;
		this.core.app.get("/manifest.webmanifest", function(req, res) {
			res.header("Content-Type", "application/manifest+json");
		    res.render("./js/pwa/manifest.webmanifest", {"config": self.core.config, "translate": self.lang[self.core.config.system.language]});
		});
	}

	/**
	 * Initialize pages (service worker and pwa)
	 * =====================
	 * Express render
	 *
	 */
	updates() {
		let self = this;
		this.core.app.get("/pwa-updates", function(req, res) {
			res.header("Content-Type", "application/json");
		    res.render("./js/pwa/update.json", {"config": self.core.config, "translate": self.lang[self.core.config.system.language]});
		});
	}
}

module.exports = Pwa;