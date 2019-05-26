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
const lang = require(`./../routes/languages`);

class Policy {
	constructor() {
		this.core = core;

		this.LOG_NAME = "pages";
		this.log = new Log(this.LOG_NAME);
		this.lang = lang;
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
			let cookies = {};
			if (typeof req.cookies.style === "undefined") {
				cookies = req.cookies;
				cookies.style = "default";
			} else {
				cookies = req.cookies;
			}

			self.core.config.system.language = (req.query.lang ? req.query.lang : self.core.config.system.language);

			res.set("Content-Type", "text/html");
		    res.render("./pages/policy/privacy/index.html", {"config": self.core.config, "translate": self.lang[self.core.config.system.language], "cookie": cookies});
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
			let cookies = {};
			if (typeof req.cookies.style === "undefined") {
				cookies = req.cookies;
				cookies.style = "default";
			} else {
				cookies = req.cookies;
			}

			self.core.config.system.language = (req.query.lang ? req.query.lang : self.core.config.system.language);

			res.set("Content-Type", "text/html");
		    res.render("./pages/policy/cookie/index.html", {"config": self.core.config, "translate": self.lang[self.core.config.system.language], "cookie": cookies});
		});
	}
}

module.exports = Policy;