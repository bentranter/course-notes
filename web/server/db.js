// Include RethinkDB in this file only!
var r = require('rethinkdb');
var chalk = require('chalk');
var thinky = require ('./thinky');

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