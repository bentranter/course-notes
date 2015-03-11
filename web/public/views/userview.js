// Global namespace
var app = app || {};

(function() {
  'use strict';

  app.UserView = Backbone.View.extend({
    // I guess el is required
    el: '#account',

    events: {
      'click #loginButton' : 'login',
      'click #logoutButton': 'logout'
    },

    // Does so much
    initialize: function() {
      console.log('userview.js: Initialized new Backbone view for a user.');

      if (window.localStorage.getItem('token')) {
        console.log('User is already signed in.');
      } else {
        // Open the account bar - change this to a route in the future
        console.log('userview.js: Opened account dropdown.');
        var account = document.getElementById('account');
        account.classList.remove('hide');
      }
    },


    login: function(e) {
      e.preventDefault();

      // @TODO: Hide any errors we may have received while
      // attempting to sign in
      var req = Backbone.ajax({
        contentType: 'application/x-www-form-urlencoded',
        url: this.collection.url,
        type: 'POST',
        data: 'username=' + document.getElementById('username').value +
              '&password=' + document.getElementById('password').value
      });
      // Save the token in localStorage
      req.then(function(data) {
        console.log('Succeeded.');
        //
        window.localStorage.setItem('token', data.token);
        console.log(window.localStorage.getItem('token'));
      }, function(err) {
        console.log(err.responseText + ' failed.');
      }); // if Promise is set
    },

    // Logging out just deletes your token
    logout: function(e) {
      e.preventDefault();
      window.localStorage.setItem('token', '');
    }
  });
})();