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

class Sitemap {
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
		    res.render("./www/pages/seo/sitemap.xml", {"config": self.core.config});
		});
	}
}

module.exports = Sitemap;