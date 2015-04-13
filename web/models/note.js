'use strict';

/**
 * Module dependencies
 */

var thinky = require(__dirname + '/../util/thinky.js');

// Keep reference to RethinkDB's driver(s)
var r = thinky.r;
var type = thinky.type;

// Create model for notes
var Note = thinky.createModel('Note', {
  id: String,
  title: String,
  subtitle: String,
  content: String,
  username: String,
  folder: String,
  dateCreated: type.date().default(r.now()),
  dateUpdated: type.date().default(r.now()),
  timesReviewed: Number
});

// Ensure indices for ordering
Note.ensureIndex('dateCreated');

module.exports = Note;