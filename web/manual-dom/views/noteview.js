// Namespaces: Global Backbone, Underscore, jQuery, ENTER_KEY
var app = app || {};

(function() {
  'use strict';

  app.NoteView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#noteTemplate').html()),

    events: {
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      // Somewhere in here I think I can leverage object
      // caching to speed up renders, but idk for sure
      var data = this.model.toJSON();
      this.$el.html(this.template(data));
      return this;
    }
  });
})();