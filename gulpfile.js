/**
 * Gulp Config
 * =====================
 * Automation task
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
const argv = require("yargs").argv;
const gulp = require("gulp");
const gulp_concat = require("gulp-concat");
const gulp_sass = require("gulp-sass");
const gulp_minifycss = require("gulp-clean-css");
const gulp_minifyjs = require("gulp-terser");
const gulp_nunjucks = require("gulp-nunjucks");
const gulp_rename = require("gulp-rename");
const nodemon = require("gulp-nodemon");
const browsersync = require("browser-sync").create();
const Utils = require("./modules/commons/utils");
const utils = new Utils();

let config = (argv.config ? require(argv.config) : require("./configs/config.js"));
config = utils.fix_config(config);

const translate = require(`./translations/${config.system.language}`);

/**
* Task: build-css & build-js + nunjucks
* =====================
* Minify and concat js and css files
*
*/
gulp.task("build-css", function() {
	return gulp.src(["./www/css/vendor/bulma/bulma.min.css", "./www/css/main.scss", "./www/css/animate.scss"])
		.pipe(gulp_concat({path: "./full.min.tmp"}))
		.pipe(gulp_sass())
		.pipe(gulp_minifycss())
		.pipe(gulp_rename("full.min.css"))
		.pipe(gulp.dest("./www/css/"))
		.pipe(browsersync.stream());
});

gulp.task("build-css-skeleton", function() {
	return gulp.src(["./www/css/skeleton.scss"])
		.pipe(gulp_concat({path: "./skeleton.min.tmp"}))
		.pipe(gulp_sass())
		.pipe(gulp_minifycss())
		.pipe(gulp_rename("skeleton.min.css"))
		.pipe(gulp.dest("./www/css/"));
});

gulp.task("build-css-skin-default", function() {
	return gulp.src(["./www/css/skin-default.scss"])
		.pipe(gulp_concat({path: "./skin-default.min.tmp"}))
		.pipe(gulp_sass())
		.pipe(gulp_minifycss())
		.pipe(gulp_rename("skin-default.min.css"))
		.pipe(gulp.dest("./www/css/"))
		.pipe(browsersync.stream());
});

gulp.task("build-css-skin-nightmode", function() {
	return gulp.src(["./www/css/skin-nightmode.scss"])
		.pipe(gulp_concat({path: "./skin-nightmode.min.tmp"}))
		.pipe(gulp_sass())
		.pipe(gulp_minifycss())
		.pipe(gulp_rename("skin-nightmode.min.css"))
		.pipe(gulp.dest("./www/css/"))
		.pipe(browsersync.stream());
});

gulp.task("build-js", function() {
	let jsarray = ["./www/js/vendor/cash-dom/cash.min.js", "./www/js/main.js", "./www/js/skin-switcher.js", "./www/js/main.js", "./www/js/events.js"];

	if (config.site.pwa.status === "enabled") {
		jsarray.push("./www/js/pwa/prompt.js");
		jsarray.push("./www/js/pwa/update.js");
	}

	return gulp.src(jsarray)
		.pipe(gulp_concat({path: "full.min.tmp"}))
		.pipe(gulp_nunjucks.compile({config: config, translate: translate}))
		.pipe(gulp_minifyjs())
		.pipe(gulp_rename("full.min.js"))
		.pipe(gulp.dest("./www/js/"));
});

gulp.task("build-css-skin", gulp.parallel("build-css-skin-default", "build-css-skin-nightmode"));
gulp.task("build-static", gulp.parallel("build-css", "build-css-skeleton", "build-css-skin", "build-js"));

/**
* Task: browser-sync
* =====================
* Start browser sync in combo with express: auto refresh files and browser page.
*
*/
gulp.task("browser-sync", function() {
	browsersync.init({
		port: parseInt(config.server.bs_port),
		proxy: `http://localhost:${parseInt(config.server.express_port)}`,
		ui: {port: parseInt(config.server.ui_port)},
		reloadDelay: 500
	});

	nodemon({
		script: "app.js",
		"watch": ["./app.js",
			      "./modules/**/*",
			      "./translations/**/*",
			      "./configs/**/*",
			      "./www/**/*.html",
			      "./www/css/skeleton.min.css",
			      "./www/js/full.min.js"
			     ],
		"ext": "js, html, css"
	}).on("restart", function() {
		browsersync.reload();
	});

	gulp.watch(["./www/**/*.scss", "!./www/css/skeleton.scss", "!./www/css/skin-default.scss", "!./www/css/skin-nightmode.scss"]).on("change", gulp.parallel("build-css"));
	gulp.watch(["./www/css/skeleton.scss"]).on("change", gulp.parallel("build-css-skeleton"));
	gulp.watch(["./www/css/skin-default.scss", "./www/css/skin-nightmode.scss"]).on("change", gulp.parallel("build-css-skin"));

	gulp.watch(["./configs/**/*", "./www/**/*.js", "!./www/js/full.min.js"]).on("change", gulp.parallel("build-js"));
});

/**
* Task: server
* =====================
* Run in combo gulp-nodemon + browser-sync tasks
*
*/
gulp.task("server", gulp.parallel("browser-sync"));