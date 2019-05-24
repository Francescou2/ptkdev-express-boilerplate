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
	return gulp.src(["./themes/default/css/vendor/bulma/bulma.min.css", "./themes/default/css/main.scss", "./themes/default/css/animate.scss"])
		.pipe(gulp_concat({path: "./full.min.tmp"}))
		.pipe(gulp_sass())
		.pipe(gulp_minifycss())
		.pipe(gulp_rename("full.min.css"))
		.pipe(gulp.dest("./themes/default/css/"))
		.pipe(browsersync.stream());
});

gulp.task("build-css-skeleton", function() {
	return gulp.src(["./themes/default/css/skeleton.scss"])
		.pipe(gulp_concat({path: "./skeleton.min.tmp"}))
		.pipe(gulp_sass())
		.pipe(gulp_minifycss())
		.pipe(gulp_rename("skeleton.min.css"))
		.pipe(gulp.dest("./themes/default/css/"));
});

gulp.task("build-css-skin-default", function() {
	return gulp.src(["./themes/default/css/skin-default.scss"])
		.pipe(gulp_concat({path: "./skin-default.min.tmp"}))
		.pipe(gulp_sass())
		.pipe(gulp_minifycss())
		.pipe(gulp_rename("skin-default.min.css"))
		.pipe(gulp.dest("./themes/default/css/"))
		.pipe(browsersync.stream());
});

gulp.task("build-css-skin-nightmode", function() {
	return gulp.src(["./themes/default/css/skin-nightmode.scss"])
		.pipe(gulp_concat({path: "./skin-nightmode.min.tmp"}))
		.pipe(gulp_sass())
		.pipe(gulp_minifycss())
		.pipe(gulp_rename("skin-nightmode.min.css"))
		.pipe(gulp.dest("./themes/default/css/"))
		.pipe(browsersync.stream());
});

gulp.task("build-js", function() {
	let jsarray = ["./themes/default/js/vendor/cash-dom/cash.min.js", "./themes/default/js/vendor/lazyload/lazyload.min.js", "./themes/default/js/main.js", "./themes/default/js/skin-switcher.js", "./themes/default/js/policy/cookielaw.js", "./themes/default/js/main.js", "./themes/default/js/events.js"];

	if (config.site.pwa.status === "enabled") {
		jsarray.push("./themes/default/js/pwa/prompt.js");
		jsarray.push("./themes/default/js/pwa/update.js");
	}

	return gulp.src(jsarray)
		.pipe(gulp_concat({path: "full.min.tmp"}))
		.pipe(gulp_nunjucks.compile({config: config, translate: translate}))
		.pipe(gulp_minifyjs())
		.pipe(gulp_rename("full.min.js"))
		.pipe(gulp.dest("./themes/default/js/"));
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
			      "./themes/default/**/*.html",
			      "./themes/default/css/skeleton.min.css",
			      "./themes/default/js/full.min.js"
			     ],
		"ext": "js, html, css"
	}).on("restart", function() {
		browsersync.reload();
	});

	gulp.watch(["./themes/default/**/*.scss", "!./themes/default/css/skeleton.scss", "!./themes/default/css/skin-default.scss", "!./themes/default/css/skin-nightmode.scss"]).on("change", gulp.parallel("build-css"));
	gulp.watch(["./themes/default/css/skeleton.scss"]).on("change", gulp.parallel("build-css-skeleton"));
	gulp.watch(["./themes/default/css/skin-default.scss", "./themes/default/css/skin-nightmode.scss"]).on("change", gulp.parallel("build-css-skin"));

	gulp.watch(["./configs/**/*", "./themes/default/**/*.js", "!./themes/default/js/full.min.js"]).on("change", gulp.parallel("build-js"));
});

/**
* Task: server
* =====================
* Run in combo gulp-nodemon + browser-sync tasks
*
*/
gulp.task("server", gulp.parallel("browser-sync"));