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
      if (this.model.get('id')) {
        this.$el.html(this.template(this.model.attributes));
      } else {
        this.$el.html(this.template(this.model));
      }
    },

    destroy: function() {
      var self = this;
      console.log('Clicked destroy');
      var action = window.confirm('Are you sure you want to delete?');
      if (action === true) {
        self.model.destroy();
      }
    },

    save: function() {
      console.log('Clicked save');
      this.model.save();
      // // @TODO: Hide any errors we may have received
      // var req = Backbone.ajax({
      //   headers: {
      //     'x-access-token': window.localStorage.getItem('token')
      //   },
      //   contentType: 'application/x-www-form-urlencoded',
      //   url: app.notes.url,
      //   type: 'POST',
      //   data: 'title=' + document.getElementById('noteTitle').innerHTML +
      //         '&subtitle=' + 'default' +
      //         '&content=' + document.getElementById('noteBody').innerHTML +
      //         '&folder=' + 'default'
      // });
      // // Save the token in localStorage
      // req.then(function(data) {
      //   console.log(JSON.stringify(data) + ' Succeeded.');
      // }, function(err) {
      //   console.log(err.responseText + ' failed.');
      // }); // if Promise is set
    },
  });
})();