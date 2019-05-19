/**
 * Translate
 * =====================
 * Localization of text and logs, from /translations folder
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
const languages = require("../routes/languages.js");
const Log = require("./../logger/log");
const core = require("./../core/core");

class Translate {
	constructor() {
		this.core = core;

		this.LOG_NAME = "translate";
		this.log = new Log(this.LOG_NAME);
	}

	/**
     * Replace Params
     * =====================
     * If translation text is: hi {name} how are you?
     * This function replace {name} token with correct value
     *
     * @param {string} text            - text of current phrase to translate (mandatory)
     * @param {Object} language_params - object with token to replace, example: {name:"alex"} (mandatory)
     *
     * @return {string} text - text with replaced token
     *
     */
	replace_params(text, language_params) {
		for (let [key, value] of Object.entries(language_params)) {
			text = text.replace(`##${key}##`, value);
		}

		return text;
	}

	/**
     * Check
     * =====================
     * Check if exist translation in selected language, if not exist get string of phrase from "en" translation
     *
     * @param {string} language_id - key of translation phrase from /translation/*.js (mandatory)
     *
     * @return {string} text - text of available translation
     *
     */
	check(language_id) {
		let text = "";
		if (this.core.config.system.language !== "en" && typeof languages[this.core.config.system.language][language_id] === "undefined") {
			text = languages["en"][language_id];
		} else {
			text = languages[this.core.config.system.language][language_id];
		}

		return text;
	}

	/**
     * Translate
     * =====================
     * Get correct translation
     *
     * @param {string} language_id     - key of translation phrase from /translation/*.js (mandatory)
     * @param {Object} language_params - object with token to replace, example: {name:"alex"} (optional)
     *
     * @return {string} text - text of available translation
     *
     */
	translate(language_id, language_params = null) {
		let text = "";
		text = this.check(language_id);
		if (language_params != null) {
			text = this.replace_params(text, language_params);
		}

		return text;
	}

}

module.exports = Translate;