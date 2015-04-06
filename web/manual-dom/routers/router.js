// Namespaces global
var app = app || {};

(function () {
  'use strict';

  // Routes: used for matching views to a model or collection
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'notes/new': 'newNote',
      'notes/:id': 'getNote'
    },

    newNote: function() {
      console.log('Nrwe');
    },

    getNote: function(id) {
      this.note = app.notes.get(id);
      console.log(this.note);
    }
  });

  app.router = new Router();

})();