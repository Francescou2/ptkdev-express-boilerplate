module.exports = {
	"databases": {
		"mysql": {
		    "host": "localhost",
		    "user": "root",
		    "password": "password",
		    "database": "app",
		    "dbprefix": "app",
		    "conn_limit": 100
		},
		"lowdb": {
			"name": "yourprojectname",
			"host": "localstorage"
		}
	}
};