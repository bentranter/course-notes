// -----------------
// Include RethinkDB
// -----------------

var r = require('rethinkdb');
var chalk = require('chalk');

// -----------------
// Configure RethinkDB
// -----------------

var dbConfig = {
	host: process.env.RDB_HOST || 'localhost',
	port: parseInt(process.env.RDB_PORT || 28015),
	db: process.env.RDB_DB || 'StudyFast',
	tables: {
		'users': 'id',
		'notes': 'id'
	}
};

// -----------------
// Connect to RethinkDB
// -----------------

module.exports.setup = function() {
	r.connect({
		host: dbConfig.host,
		port: dbConfig.port
	}, function(err, conn) {

		console.log('Connected to ' + chalk.green('RethinkDB') + ' on port ' + chalk.blue(dbConfig.port));
	});
};