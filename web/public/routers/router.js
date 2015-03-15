// Namespaces global
var app = app || {};

(function () {
  'use strict';

  // Routes: used for matching views to a model or collection
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'notes/:id': 'getNote',
      'notes/new': 'newNote'
    }
  });

  app.router = new Router();

  app.router.on('route:getNote', function(id) {
    var model = app.notes.get(id);

    new app.NoteView({
      model: model,
      collection: app.notes
    });

    if (!model) {
      console.log('No model found honey.');
    }
  });

  app.router.on('route:newNote', function() {
    new app.NoteView({
      model: new app.Note,
      collection: app.notes
    });
  });

  // Danger warning: don't use pushState or you'll die!!! (for now)
  Backbone.history.start();
})();