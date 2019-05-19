/**
 * Pages route
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

class Pages {
	constructor() {
		this.core = core;

		this.LOG_NAME = "pages";
		this.log = new Log(this.LOG_NAME);
		this.lang = lang;
	}

	/**
	 * Initialize pages (all)
	 * =====================
	 * Express render
	 *
	 */
	index() {
		let self = this;
		this.core.app.get("/", function(req, res) {
			let cookies = {};
			if (typeof req.cookies.style === "undefined") {
				cookies = req.cookies;
				cookies.style = "default";
			} else {
				cookies = req.cookies;
			}
		    res.render("./www/pages/templates/index.html", {"config": self.core.config, "translate": self.lang[self.core.config.system.language], "cookie": cookies});
		});
	}
}

module.exports = Pages;