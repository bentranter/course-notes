/**
 * Note: This is the only place you should require the
 * module thinky. If you include it anywhere else, it 
 * will result in a new instance of thinky being 
 * created, and we don't want to do that!
 *
 * Use this in place of a config file, since it would be
 * redundant to include this data elsewhere
 *
 * @param {String} host
 * @param {Int} port
 * @param {String} database name
 *
 *@api private
 *
 */

var thinky = require('thinky')({
	host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT || 28015),
    db:   process.env.RDB_DB || 'StudyFast'
});

exports.thinky = thinky;