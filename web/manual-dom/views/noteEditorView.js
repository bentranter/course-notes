// Namespaces: Global Backbone, Underscore, jQuery, ENTER_KEY
var app = app || {};

(function() {
  'use strict';

  app.NoteEditorView = Backbone.View.extend({

    template: _.template($('#noteEditorTemplate').html()),

    events: {
      'click .save': 'save',
      'click .delete': 'delete'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      // Somewhere in here I think I can leverage object
      // caching to speed up renders, but idk for sure
      var data = this.model.toJSON();
      $(this.el).html(this.template(data));
      return this;
    },

    delete: function() {
      app.router.navigate('/notes/new', { trigger: true });
      this.model.destroy();
    },

    save: function() {
      this.model.save({ 
        title: 'Test',
        content: $('#noteContent').html(),
        subtitle: 'Test',
        folder: 'First'
      });
      this.model.trigger('change');
    }
  });
})();