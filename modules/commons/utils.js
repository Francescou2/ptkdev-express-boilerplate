/**
 * Utils
 * =====================
 * Logger and other functions...
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
const fse = require("fs-extra");
const Log = require("./../logger/log");
const Translate = require("./../commons/translate");
const core = require("./../core/core");
const version = require("./../commons/version");

class Utils {
	constructor() {
		this.core = core;

		this.LOG_NAME = "utils";
		this.log = new Log(this.LOG_NAME);
		this.lang = new Translate();
		this.version = version;
	}

	/**
     * Init all empty files and directory.
     * =====================
     * This fix file system errors at boot
     *
     */
	create_files() {
		let tag = "utils::create_files()";

		if (!fse.existsSync(this.core.config.log.path.debug_log)) {
			fse.outputFileSync(this.core.config.log.path.debug_log, "");
			this.log.info(tag, `${this.core.config.log.path.debug_log} ${this.lang.translate("created")}`);
		} else {
			this.log.info(tag, `${this.core.config.log.path.debug_log} ${this.lang.translate("exist")}`);
		}
		if (!fse.existsSync(this.core.config.log.path.error_log)) {
			fse.outputFileSync(this.core.config.log.path.error_log, "");
			this.log.info(tag, `${this.core.config.log.path.error_log} ${this.lang.translate("created")}`);
		} else {
			this.log.info(tag, `${this.core.config.log.path.error_log} ${this.lang.translate("exist")}`);
		}
	}

	/**
     * Random
     * =====================
     * Random number between two numbers
     *
     * @param {int} min - start value (mandatory)
     * @param {int} max - end value (mandatory)
     *
     * @return {int} number - middle random number from input min/max interval
     *
     */
	random_interval(min, max) {
		return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
	}

	/**
     * Mix array element
     * =====================
     * Randomize array values
     *
     * @param {Array} arr - array (mandatory)
     *
     * @return {Array} arr - mixed array
     *
     */
	mix_array(arr) {
		return arr.sort(() => Math.random() - 0.5);
	}

	/**
     * Sleep
     * =====================
     * Zzz
     *
     * @param {int} sec - seconds to need sleep
     *
     * @return {Promise<Promise>} - async wait
     *
     */
	sleep(sec) {
		return new Promise(resolve => setTimeout(resolve, sec));
	}

	/**
     * Default config.js
     * =====================
     * Get default value if config.js is not updated from config.js.tpl
     *
     * @param {Object} config - this.core.config or require("./config")
     *
     * @return {Object} config - fixed
     *
     */
	fix_config(config) {
		let tag = "utils::fix_config()";
		this.log.info(tag, this.lang.translate("config_fix"));

		if (config.system.debug === "enabled") {
			config.site.www = "hide";
			config.site.protocol = "http://";
			config.site.url = `localhost:${config.server.bs_port}`;
		}

		let www = "";
		if (config.site.www === "show") {
			www = "www.";
		}
		config.site.fullurl = config.site.protocol + www + config.site.url;
		config.system.version = this.version;

		if (config.site.pwa.version === "") {
			config.site.pwa.version = this.version;
		}

		return config;
	}
}

module.exports = Utils;