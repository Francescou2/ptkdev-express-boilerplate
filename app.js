/**
 * Yourprojectname
 * =====================
 * yourprojectdesc
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 * @link:    Homepage: https://yourprojectname.com
 *           Docs:     https://docs.yourprojectname.com/README.md
 *           NPM:      https://npmjs.com/package/@ptkdevio/yourprojectname
 *           GitHub:   https://github.com/ptkdev/yourprojectname
 *
 */
const argv = require("yargs").argv;
const config = (argv.config ? require(argv.config) : require("./configs/config.js"));
const Yourprojectname = require("./modules/core/lib");

/**
 * Start the app
 * =====================
 * Run
 *
 */
let yourprojectname = new Yourprojectname(config);
yourprojectname.init();
yourprojectname.start();