// Global namespace
var app = app || {};

(function() {
  'use strict';

  app.NoteView = Backbone.View.extend({
    el: '#noteContent',

    template: _.template($('#noteContentTemplate').html()),
    
    events: {
      'click #saveButton'    : 'save',
      'click #destroyButton' : 'destroy'
    },

    initialize: function() {
      console.log('noteview.js: Initialized new Backbone view for a note.');
      if (window.localStorage.getItem('token')) {
        this.render();
      } else {
        console.log('End of initialize func');
      }
   },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
    },

    destroy: function() {
      var self = this;
      console.log('Clicked destroy');
      var action = window.confirm('Are you sure you want to delete?');
      if (action === true) {
        self.model.destroy({
        headers: {
          'x-access-token': window.localStorage.getItem('token')
        }
      }).complete(function() {
        // Route to the new note view
        console.log('Delete fired');
      });
      }
    },

    save: function() {
      this.model.set('title', $('#noteTitle').html());
      this.model.set('content', $('#noteBody').html());
      this.model.save({},{
        headers: {
          'x-access-token': window.localStorage.getItem('token')
        }
      });
    }
  });
})();