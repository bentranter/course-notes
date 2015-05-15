'use strict';

/**
 * Module dependencies
 */
var thinky = require('thinky')({
    host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT || 28015),
    db:   process.env.RDB_DB || 'StudyPiggy'
});

module.exports = thinky;