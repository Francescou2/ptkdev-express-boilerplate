/**
 * Sitemap xml route
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

class Seo {
	constructor() {
		this.core = core;

		this.LOG_NAME = "pages";
		this.log = new Log(this.LOG_NAME);
	}

	/**
	 * Initialize pages (sitemap)
	 * =====================
	 * Express render
	 *
	 */
	sitemap() {
		let self = this;
		this.core.app.get("/sitemap.xml", function(req, res) {
			res.header("Content-Type", "application/xml");
		    res.render("./pages/sitemap.xml", {"config": self.core.config});
		});
	}

	/**
	 * Initialize pages (robots.txt)
	 * =====================
	 * Express render
	 *
	 */
	robotstxt() {
		let self = this;
		this.core.app.get("/robots.txt", function(req, res) {
			res.header("Content-Type", "text/plain");
		    res.render("./pages/robots.txt", {"config": self.core.config});
		});
	}
}

module.exports = Seo;