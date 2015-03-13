// Global namespace
var app = app || {};

(function() {
  'use strict';

  app.NoteView = Backbone.View.extend({
    el: '#noteContent',

    template: _.template($('#noteContentTemplate').html()),
    
    events: {
      'click #saveButton': 'save'
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
      var newNote = new Backbone.Model({
        title: '',
        content: '',
        folder: '',
        subtitle: ''
      });
      this.$el.html(this.template(newNote));
      // Render only does one element at a time, taken from the URL params?
      // var noteContentTemplate = this.template(model.toJSON());
      // this.$el.append(noteContentTemplate);
    },

    save: function() {
      console.log('Clicked save');
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
    },
  });
})();