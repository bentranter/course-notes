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
      var response = window.confirm('Are you sure lol');
      if (response === true) {
        // Roll outta that view! (before we know if the model could even be destroyed)
        app.router.navigate('/notes/new', { trigger: true });
        this.model.destroy();
      }
    },

    save: function() {
      if (this.model.isNew()) {
        app.notes.create({
          title: 'New note',
          content: $('#noteContent').html(),
          subtitle: 'New subtitle',
          folder: 'Whatever'
        }, {
          wait: true,
          success: function(res) {
            app.router.navigate('/notes/' + res.id, false);
          }
        });
      } else {
        this.model.save({ 
          title: 'Test',
          content: $('#noteContent').html(),
          subtitle: 'Test',
          folder: 'First'
        });
        // Backbone is smart enough not to re-render anything unless the server throws an error
        this.model.trigger('change');
      }
    }
  });
})();