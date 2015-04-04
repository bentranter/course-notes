// Global namespace
var app = app || {};

(function() {
  'use strict';

  var Notes = Backbone.Collection.extend({
    // Provide reference this collection's model
    model: app.Note,

    url: 'http://localhost:3000/api/notes',

    comparator: 'folder'
  });

  app.notes = new Notes();
})();