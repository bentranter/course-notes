'use strict';

/**
 * Module dependencies
 */

var thinky = require(__dirname + '/../util/thinky.js');

// Keep reference to RethinkDB's driver
var r = thinky.r;

// Create model for notes
var Note = thinky.createModel('Note', {
  id: String,
  title: String,
  subtitle: String,
  content: String,
  username: String,
  folder: String,
  dateCreated: { _type: Date, default: r.now() },
  dateUpdated: { _type: Date, default: r.now() },
  timesReviewed: Number
});

// Ensure indices for ordering
Note.ensureIndex('dateCreated');

module.exports = Note;