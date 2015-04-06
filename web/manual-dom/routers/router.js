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
      if (app.noteEditorView) app.noteEditorView.close();
      this.noteEditorView = new app.NoteEditorView({ model: this.note });
      $('#noteEditor').html(this.noteEditorView.render().el);
    }
  });

  app.router = new Router();

})();