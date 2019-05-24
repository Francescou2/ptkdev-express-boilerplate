/**
 * Static files
 * =====================
 * css and js routes
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
const express = require("express");
const path = require("path");
const core = require("./../core/core");
const Log = require("./../logger/log");

class Static_files {
	constructor() {
		this.core = core;

		this.LOG_NAME = "static";
		this.log = new Log(this.LOG_NAME);
	}

	/**
	 * Initialize static files
	 * =====================
	 * Nginx or express static files
	 *
	 */
	static_files() {
		this.core.app.set("view cache", true);
		if (this.core.config.system.nginx === "disabled") {
		    this.core.app.use("/css", express.static(path.join(__dirname, `../../themes/${this.core.config.site.theme}/css`)));
		    this.core.app.use("/js", express.static(path.join(__dirname, `../../themes/${this.core.config.site.theme}/js`)));
		    this.core.app.use("/img", express.static(path.join(__dirname, `../../themes/${this.core.config.site.theme}/img`)));
		    this.core.app.use("/favicon.png", express.static(path.join(__dirname, `../../themes/${this.core.config.site.theme}/img/icons/favicon/favicon.png`)));
		    this.core.app.use("/favicon.ico", express.static(path.join(__dirname, `../../themes/${this.core.config.site.theme}/img/icons/favicon/favicon.ico`)));
		    this.core.app.use("/robots.txt", express.static(path.join(__dirname, `../../themes/${this.core.config.site.theme}/img/pages/robots.txt`)));
		}
	}
}

module.exports = Static_files;