// Global namespace
var app = app || {};

(function() {
  'use strict';

  app.UserView = Backbone.View.extend({
    // I guess el is required
    el: '#account',

    events: {
      'click #loginButton': 'login'
    },

    initialize: function() {
      console.log('userview.js: Initialized new Backbone view for a user.');
    },


    login: function(e) {
      e.preventDefault();

      // @TODO: Hide any errors we may have received while
      // attempting to sign in
      var req = Backbone.ajax({
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://localhost:3000/api/login',
        type: 'POST',
        data: 'username=' + document.getElementById('username').value + '&password=' + document.getElementById('password').value
      });
      req.then(function(data) {
        console.log(JSON.stringify(data) + ' succeeded.');
      }, function(err) {
        console.log(err.responseText + ' failed.');
      }); // if Promise is set
    }
  });
})();