/**
 * oAuth
 * =====================
 * Social newtork login (twitter, facebook, etc...)
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
const config_keys = require("./../../configs/config_keys");
const passport = require("passport");
const Passport_twitter = require("passport-twitter").Strategy;
const core = require("./../core/core");
const Log = require("./../logger/log");

class Oauth {
	constructor() {
		this.core = core;

		this.LOG_NAME = "oauth";
		this.log = new Log(this.LOG_NAME);
	}

	express() {
		this.core.app.use(require("express-session")({secret: config_keys.services.express.session_key, resave: true, saveUninitialized: true}));
		this.core.app.use(passport.initialize());
		this.core.app.use(passport.session());
	}

	twitter_init() {
		passport.use(new Passport_twitter({
		    consumerKey: config_keys.services.twitter.consumer_key,
		    consumerSecret: config_keys.services.twitter.consumer_secret,
		    callbackURL: `${this.core.config.fullurl}/auth/twitter/callback`,
		    includeEmail: true
		  },
		  function(token, token_secret, profile, cb) {
			return cb(null, profile);
		  }
		));
	}

	serialize() {
		passport.serializeUser(function(user, cb) {
			cb(null, user);
		});

		passport.deserializeUser(function(obj, cb) {
		  cb(null, obj);
		});
	}

	twitter() {
		this.core.app.get("/auth/twitter",
		  passport.authenticate("twitter"));

		this.core.app.get("/auth/twitter/callback", passport.authenticate("twitter", {failure_redirect: "/login"}),
			function(req, res) {
				res.redirect("/");
			}
		);
	}
}

module.exports = Oauth;