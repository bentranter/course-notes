// Namespaces global
var app = app || {};

(function () {
  'use strict';

  // Routes: used for matching views to a model or collection
  var Router = Backbone.Router.extend({
    routes: {
      '/': 'home',
      'notes/:id': 'getNote',
      'new'      : 'newNote',
      '*notFound': 'notFound'
    }
  });

  app.router = new Router();

  app.router.on('route:getNote', function(id) {
    var model = app.notes.get(id);

    this.view = new app.NoteView({
      model: model,
      collection: app.notes
    });

    if (!model) {
      console.log('No model found.');
    }
  });

  // Todo: set URL when this gets initialized
  app.router.on('route:newNote', function() {
    // You have to explicitly add the note to the collection 
    // before you can save it
    var newNoteModel = new app.Note();

    new app.NoteView({
      model: newNoteModel,
      collection: app.notes
    });

    app.notes.add(newNoteModel);
  });

  app.router.on('route:notFound', function() {
    app.router.navigate('/', {trigger: true});
  });

  // Danger warning: don't use pushState or you'll die!!! (for now)
  app.notes.on('sync', _.once(function() {
    Backbone.history.start();
  }));
})();