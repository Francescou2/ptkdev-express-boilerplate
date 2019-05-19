/**
 * Logger: write log
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 * 				  Ilua Chubarov [@agoalofalife] <agoalofalife@gmail.com>
 *
 * @license: MIT License
 *
 */
const fse = require("fs-extra");
const chalk = require("chalk");
const ansi = require("strip-ansi");
const TYPES_LOG = require("./types");
const core = require("./../core/core");
const clogger = console; // exception

class Log {
	constructor(func) {
		this.core = core;
		this.func = func;
	}

	/**
	* Date now
	* =====================
	* Current (now) date and time for prefix of logs
	*
	* @return {string} time - current Date.now()
	*
	*/
	current_time() {
		let tz_offset = (new Date()).getTimezoneOffset() * 60000;
		return (new Date(Date.now() - tz_offset)).toISOString().slice(0, -5).replace("T", " ");
	}

	/**
	* Output console log to file
	* =====================
	* Write in debug.log and error.log in /logs folder
	*
	* @param {string} type    - example: INFO/WARNING/ERROR/DEBUG or other valid type string (see ./types.js) (mandatory)
	* @param {string} func    - function name, class or similar when this log appear (mandatory)
	* @param {string} message - error, warning or info description (mandatory)
	*
	*/
	append_file(type, tag, message) {
		let log_text = `[${this.current_time()}] [${type.id}] ${tag}: ${message}\n`;

		fse.appendFile(this.core.config.log.path.debug_log, ansi(log_text), function(err) {
			if (err) {
				clogger.log(err);
			}
		});

		if (type.id === "ERROR") {
			fse.appendFile(this.core.config.log.path.error_log, ansi(log_text), function(err) {
				if (err) {
					clogger.log(err);
				}
			});
		}

	}

	/**
	* Output console log
	* =====================
	* Log manager - don't use this directly. Use info() error() debug() warning()
	*
	* @param {string} type    - example: INFO/WARNING/ERROR/DEBUG or other valid type string (see ./types.js) (mandatory)
	* @param {string} func    - function name, class or similar when this log appear (mandatory)
	* @param {string} message - error, warning or info description (mandatory)
	*
	*/
	log(type, message) {
		let time = TYPES_LOG.TIME;
		if (this.core.config.system.terminal_colors === "enabled") {
			clogger.log(chalk`${type.bgcolor(type.label)}${time.bgcolor(` ${this.current_time()} `)}${type.bgcolor(" ")} ${type.color(message)}`);
		} else {
			clogger.log(ansi(chalk`${type.bgcolor(type.label)}${time.bgcolor(` ${this.current_time()} `)}${type.bgcolor(" ")} ${type.color(message)}`));
		}
	}

	/**
	* Output console log type info
	* =====================
	* Write log on console and file
	*
	* @param {string} tag     - func unique tag (mandatory)
	* @param {string} message - description of issue (mandatory)
	*
	*/
	info(tag, message) {
		if (this.core.config.log.info === "enabled") {
			this.log(TYPES_LOG.INFO, `${message}`);
			this.append_file(TYPES_LOG.INFO, tag, message);
		}
	}

	/**
	* Output console log type warning
	* =====================
	* Write log on console and file
	*
	* @param {string} tag     - func unique tag (mandatory)
	* @param {string} message - description of issue (mandatory)
	*
	*/
	warning(tag, message) {
		if (this.core.config.log.warning === "enabled") {
			this.log(TYPES_LOG.WARNING, `${message}`);
			this.append_file(TYPES_LOG.WARNING, tag, message);
		}
	}

	/**
	* Output console log type error
	* =====================
	* Write log on console and file
	*
	* @param {string} tag     - func unique tag (mandatory)
	* @param {string} message - description of issue (mandatory)
	*
	*/
	error(tag, message) {
		if (this.core.config.log.errors === "enabled") {
			this.log(TYPES_LOG.ERROR, `${message}`);
			this.append_file(TYPES_LOG.ERROR, tag, message);
		}
	}

	/**
	* Output console log type debug
	* =====================
	* Write log on console and file
	*
	* @param {string} tag     - func unique tag (mandatory)
	* @param {string} message - description of issue (mandatory)
	*
	*/
	debug(tag, message) {
		if (this.core.config.log.debug === "enabled") {
			this.log(TYPES_LOG.DEBUG, `${message}`);
			this.append_file(TYPES_LOG.DEBUG, tag, message);
		}
	}

	/**
	* Output console log type docs
	* =====================
	* Write log on console and file
	*
	* @param {string} section - documentation section (mandatory)
	* @param {string} tag     - h1 paragraph anchor (mandatory)
	*
	*/
	docs(section, tag) {
		let args = tag.split("::");
		let url = `https://docs.yourprojectname.com/igbot/${section}/${args[0]}/README.md#${encodeURI(args[1])}`;
		this.log(TYPES_LOG.DOCS, `${chalk.rgb(236, 135, 191).underline.italic(url)}`);
		this.append_file(TYPES_LOG.DOCS, `${tag}: ${chalk.rgb(236, 135, 191).blue.underline.italic(url)}`);
	}

	/**
	* Output console log type stackoverflow
	* =====================
	* Write log on console and file
	*
	* @param {string} tag           - stackoverflow tag / error tag (mandatory)
	* @param {string} api           - prefix of issue (mandatory)
	* @param {string} error_message - description of error message (mandatory)
	*
	*/
	stackoverflow(tag, api, error_message) {
		let url = `https://stackoverflow.com/search?q=%5B${api}%5D+${encodeURI(error_message)}`;
		this.log(TYPES_LOG.STACKOVERFLOW, `${chalk.rgb(243, 156, 18).blue.underline.italic(url)}`);
		this.append_file(TYPES_LOG.STACKOVERFLOW, `${tag}: ${chalk.rgb(243, 156, 18).blue.underline.italic(url)}`);
	}

	/**
	* Output console log type sponsor
	* =====================
	* Write log on console and file
	*
	* @param {string} tag     - func unique tag (mandatory)
	* @param {string} message - description of issue (mandatory)
	*
	*/
	sponsor(tag, message) {
		this.log(TYPES_LOG.SPONSOR, message);
		this.append_file(TYPES_LOG.SPONSOR, tag, message);
	}
}

module.exports = Log;