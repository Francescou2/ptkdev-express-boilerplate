module.exports = {
	// Developer Configs
	"system": {
		"config_version": "1.0.0",   // version of this file, version increase if change values from previously config
		"debug": "enabled",          // debug mode, disabled for prod
		"language": "en",            // available: en = English / it = Italian
		"nginx": "disabled",         // Better performance if you use ngnix for serve static files, example: configs/nginx.conf.tpl
		"terminal_colors": "enabled" // enabled/disabled if you want colors in windows power shell/cmd, mac console or linux terminal
	},

	// Server
	"server": {
		"express_port": 3000, // express port and prod port
		"bs_port": 3001,	  // browsersync port
		"ui_port": 3002       // ui port
	},

	"services": {
		"google": {
			"analytics_id": "",  // example: UA-XXXXXXXX-1
			"webmaster_id": "",  // google webmaster meta-tag verify
			"adsense_id": ""
		},
		"facebook": {
			"app_id": "",    // facebook app id from developer console
			"pixel_id": "",  // facebook ads pixel id
		}
	},

	"site": {
		"author": "Patryk Rzucidło (PTKDev)",
		"email": "support@ptkdev.io",
		"protocol": "http://",               // force https urls or http urls
		"www": "hide",					     // with www or without www url (values: hide / show)
		"url": "yourprojectname.com",	     // website short url, fullurl is generated automatically
		"charset": "UTF-8",					 // html encoding
		"dns_prefetch": [					 // array of external cdn urls
			"https://fonts.googleapis.com"
		],
		"pingback": "disabled",
		"social": {
			"facebook:": "", // nickname from url
			"twitter": "",   // nickname, without @
			"instagram": "", // nickname, without @
			"pinterest": ""  // nickname from url
		},
		"pwa": {
			"status": "enabled",
			"manifest": "/manifest.webmanifest",
			"service_worker": "/sw.js",
			"color": "#ffffff",
			"bgcolor": "#ffffff",
			"files": [
				"/js/full.min.js",
				"/css/full.min.css",
				"/img/logo.png",
				"/img/logo.webp"
			],
			"pages": [
				"/",
				"/?pwa=1",
				"/policy/privacy",
				"/policy/cookie"
			],
			"version": ""  // if empty: automatically is taken from package.json (recommended)
		},
		"mui": {
			"status": "disabled",
			"languages": [
				{
					"lang": "en",
					"url": "yourprojectname.com"
				},
				{
					"lang": "it",
					"url": "it.yourprojectname.com"
				}
			]
		}
	},

	// LOGS
	"log": {
		"path": {
			"debug_log": "./logs/debug.log",
			"error_log": "./logs/errors.log"
		},
		"debug": "enabled",    // enabled/disabled all logs with tag debug
		"info": "enabled",     // enabled/disabled all logs with tag info
		"warning": "enabled",  // enabled/disabled all logs with tag warning
		"errors": "enabled"    // enabled/disabled all logs with tag errors
	}
};