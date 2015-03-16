// Global namespace
var app = app || {};

(function() {
  'use strict';

  app.ListView = Backbone.View.extend({
    el: '#notesList',

    template: _.template($('#notesListTemplate').html()),
    
    events: {
      'click #saveButton': 'saveNote',
      'click .destroyButton': 'destroy'
    },

    initialize: function() {
      console.log('listview.js: Initialized new Backbone view for the list of notes.');
      if (window.localStorage.getItem('token')) {
        this.collection.fetch({
          headers: {
            'x-access-token': window.localStorage.getItem('token')
          }
        }).complete(function() {
          console.log('Got notes successfully');
        });
        this.listenTo(this.collection, 'sync', this.render);
      } else {
        console.log('End of initialize func');
      }
   },

    render: function() {
      this.collection.each(function(model) {
        var tmpl = this.template(model.toJSON());
        this.$el.append(tmpl);
      }, this);
    }
  });
})();