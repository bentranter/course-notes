/**
 * Module dependencies.
 *
 * Note: This is the only place you should require the
 * module thinky. If you include it anywhere else, it 
 * will result in a new instance of thinky being 
 * created, which won't share the same models. Don't
 * do that!
 */

var r = require('rethinkdb');
var chalk = require('chalk');

/**
 * Use this method of initializing thinky in place of a 
 * config file, since it would be redundant to include 
 * this data elsewhere.
 *
 * @param {String} host
 * @param {Int} port
 * @param {String} database name
 *
 * @api private
 */
var thinky = require('thinky')({
	host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT || 28015),
  db:   process.env.RDB_DB || 'StudyFast'
});

/**
 * Creates a data model
 *
 * @param {String} model name
 * @param {Object} data types
 *
 *@api private
 *
 */

var User = thinky.createModel("User", {
    id: String,
    name: String,
    age: Number
});

// Configure RethinkDB

// var dbConfig = {
// 	host: process.env.RDB_HOST || 'localhost',
// 	port: parseInt(process.env.RDB_PORT || 28015),
// 	db: process.env.RDB_DB || 'StudyFast',
// 	tables: {
// 		'users': 'id',
// 		'notes': 'id'
// 	}
// };

// // Connect to RethinkDB
// module.exports.setup = function() {

// 	// Setup, connect, create

// 	r.connect({
// 		host: dbConfig.host,
// 		port: dbConfig.port
// 	}, function(err, conn) {
// 		// Log connection

// 	console.log('Connected to ' + chalk.green('RethinkDB') + ' on port ' + chalk.blue(dbConfig.port));
// 		// Create DB if it doesn't already exist
// 		r.dbCreate(dbConfig.db).run(conn, function(err, result) {
// 			if(err) {
// 				console.log(chalk.yellow('Info: ') + 'database ' + dbConfig.db + ' already exists.');
// 			} else {
// 				console.log(chalk.blue('Rethink database ') + chalk.bold(dbConfig.db) + chalk.blue(' created.'));

// 				// Loop through each table name, creating tables
// 				for(var tbl in dbConfig.tables) {
// 					(function (tableName) {

// 						r.db(dbConfig.db).tableCreate(tableName, {

// 							primaryKey: dbConfig.tables[tbl]
// 						}).run(conn, function(err, result) {

// 							if(err) {
// 								console.log(chalk.yellow('Debug: ') + 'RethinkDB table ' + tableName + ' already exists.   ' + chalk.red(err.name) + chalk.red(err.msg) + chalk.red(err.message));
// 							} else {
// 								console.log(chalk.yellow('Info: ') + 'RethinkDB table ' + tableName + ' created. ');
// 							}
// 						});
// 					})(tbl);
// 				}
// 			}
// 		});
// 	});
// };

// // Wrap everything in the function for some reason??
// function onConnect(callback) {
//   r.connect({host: dbConfig.host, port: dbConfig.port }, function(err, conn) {
//     conn._id = Math.floor(Math.random()*10001);
//     callback(err, conn);
//   });
// }

// module.exports.newUser = function(username, password, callback) {
// 	// AHHHH
// };

// // $TODO: Wrap everything in Thinky and build API from there