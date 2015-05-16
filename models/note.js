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
  id: type.string(),
  title: type.string(),
  content: type.string(),
  username: type.string(),
  folder: type.string(),
  dateCreated: type.date().default(r.now()),
  nextReview: type.date(),
  timesReviewed: type.number()
});

// Ensure indices for ordering
Note.ensureIndex('dateCreated');

module.exports = Note;
