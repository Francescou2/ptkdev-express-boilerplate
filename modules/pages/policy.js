/**
 * Policy pages route
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

class Policy {
	constructor() {
		this.core = core;

		this.LOG_NAME = "pages";
		this.log = new Log(this.LOG_NAME);
	}

	/**
	 * Initialize pages (policy)
	 * =====================
	 * Express render
	 *
	 */
	privacy() {
		let self = this;
		this.core.app.get("/policy/privacy", function(req, res) {
		    res.render("./www/pages/policy/privacy.html", {"config": self.core.config});
		});
	}

	/**
	 * Initialize pages (cookie)
	 * =====================
	 * Express render
	 *
	 */
	cookie() {
		let self = this;
		this.core.app.get("/policy/cookie", function(req, res) {
		    res.render("./www/pages/policy/cookie.html", {"config": self.core.config});
		});
	}
}

module.exports = Policy;