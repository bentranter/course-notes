// Namespaces: Global Backbone, Underscore, jQuery, ENTER_KEY
var app = app || {};

(function() {
  'use strict';

  // Our overall AppView is the top-level piece of UI
  app.AppView = Backbone.View.extend({
    // Instead of making a new element, bind to the existing skeleton
    // of the App already present in the HTML
    el: '#app',

    events: {
    },

    initialize: function() {
      app.notes.fetch();

      this.$list = this.$('#noteList');
      this.$account = this.$('#account');

      this.listenTo(app.notes, 'add', this.addOne);
      this.listenTo(app.notes, 'all', this.render);
    },

    render: function() {
      // Nothing!
    },

    addOne: function(note) {
      var view = new app.NoteView({
        model: note
      });
      this.$list.append(view.render().el);
    }
  });
})();