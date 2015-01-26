
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
 * @api private
 *
 */

var User = thinky.createModel('User', {
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  emailIsVerified: Boolean,
  dateOfSignUp: {_type: Date, default: r.now()}
});

/**
 * @TODO Consider including in the future:
 *
 * Something for two factor auth (phone number???)
 * School
 * Program
 * Major
 * Year Level
 * Country
 * State/Province/Whatever
 * City
 * Language
 * Date they last signed in
 * Date they last wrote a note
 * Date they last reviewed a note
 * AppleID/Google Play Stuff
 * Amount of times they signed in
 *
 * @REVIEW Since strict schema validation must occur on
 * the client, it is still useful to do it here?
 */

var Note = thinky.createModel("Note", {
	id: String,
  user: String, // @REVIEW maybe a user id would be better than a name??
  title: String,
  content: String,
  folder: String,
  noteNumber: Number, // @TODO figure out auto increment.
  dateCreated: {_type: Date, default: r.now()},
  dateUpdated: {_type: Date, default: r.now()},
  dateReviewed: {_type: Date, default: r.now()},
  timesReviewed: Number // @TODO figure out auto increment.
});

/**
 * Dummy data for testing with Ampersand.
 */

var People = thinky.createModel('People', {
  id: Number,
  firstName: String,
  lastName:  String,
  coolnessFactor: Number
});

/**
 * Log a success message to the user.
 */

console.log(chalk.green('Database connection ok.'));
