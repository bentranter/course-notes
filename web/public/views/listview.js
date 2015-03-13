// Global namespace
var app = app || {};

(function() {
  'use strict';

  app.ListView = Backbone.View.extend({
    el: '#notesList',

    template: _.template($('#notesListTemplate').html()),
    
    events: {
      'click #saveButton': 'saveNote'
    },

    initialize: function() {
      console.log('listview.js: Initialized new Backbone view for a note.');
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
    },

    save: function() {
      this.model.save();
    },

    saveNote: function() {
      console.log('Called save note');

      // @TODO: Hide any errors we may have received
      var req = Backbone.ajax({
        headers: {
          'x-access-token': window.localStorage.getItem('token')
        },
        contentType: 'application/x-www-form-urlencoded',
        url: app.notes.url,
        type: 'POST',
        data: 'title=' + document.getElementById('noteTitle').innerHTML +
              '&subtitle=' + 'default' +
              '&content=' + document.getElementById('noteBody').innerHTML +
              '&folder=' + 'default'
      });
      // Save the token in localStorage
      req.then(function(data) {
        console.log(JSON.stringify(data) + ' Succeeded.');
      }, function(err) {
        console.log(err.responseText + ' failed.');
      }); // if Promise is set
    }
  });
})();