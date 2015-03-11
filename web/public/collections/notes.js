// Global namespace
var app = app || {};

(function() {
  'use strict';

  var Notes = Backbone.Collection.extend({
    // Provide reference this collection's model
    model: app.Note,

    url: 'http://localhost:3000/api/notes',

    // Save notes under the `'StudyPiggy'` namespace
    // in localstorage
    localStorage: new Backbone.LocalStorage('StudyPiggyNotes')
  });

  app.notes = new Notes();
})();