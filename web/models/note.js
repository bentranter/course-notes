
/**
 * Module dependencies.
 */

var r = require('rethinkdb');
var chalk = require('chalk');

/**
 * @TODO: Since you can't require thinky in more than one
 * place, you'll to load this up in its own file. Follow
 * the instructions provided in their docs.
 */

var thinky = require('thinky')({
	host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT || 28015),
  db:   process.env.RDB_DB || 'StudyFast'
});

// Testing
console.log(chalk.green('Database connection ok.'));

/**
 * Dummy data for testing with Ampersand.
 */

var People = thinky.createModel('People', {
  id: Number,
  firstName: String,
  lastName:  String,
  coolnessFactor: Number
});

module.exports = function() {
	return People;
};