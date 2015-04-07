// Namespaces: Global Backbone, Underscore, jQuery, ENTER_KEY
var app = app || {};

(function() {
  'use strict';

  app.NoteEditorView = Backbone.View.extend({

    template: _.template($('#noteEditorTemplate').html()),

    events: {
      'click #save': 'save',
      'click #delete': 'delete',
      'click #speedread': 'speedread'
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
          title: $('#noteTitle').html(),
          content: $('#noteContent').html(),
          subtitle: 'Unused',
          folder: $('#noteFolder').html()
        }, {
          wait: true,
          success: function(res) {
            app.router.navigate('/notes/' + res.id, false);
          }
        });
      } else {
        this.model.save({ 
          title: $('#noteTitle').html(),
          content: $('#noteContent').html(),
          subtitle: 'Unused',
          folder: $('#noteFolder').html()
        });
        // Backbone is smart enough not to re-render anything unless the server throws an error
        this.model.trigger('change');
      }
    },

    speedread: function() {
      var self = this;
      $('#overlay').show();
      $('#dialog').fadeIn(300);
      $('#overlay').click(function(e) {
        self.closeSpeedReadingDialog();
      });
    },

    closeSpeedReadingDialog: function() {
      $('#overlay').hide();
      $('#dialog').fadeOut(300);
    }
  });
})();