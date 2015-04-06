// The only true globals in the app :)
var app = app || {};
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

// Kick things off when we're ready
$(document).ready(function() {
  'use strict';

  // Send the token with every request
  $.ajaxSetup({
    headers: {
      'X-Access-Token': window.localStorage.getItem('token')
    },
    statusCode: {
      401: function() {
        window.alert('Please sign in to continue');
      },
      403: function() {
        window.alert('Please sign in to continue');
      },
      500: function() {
        window.alert('Oh no');
      }
    }
  });

  // Turn the key... start the ignition baby!!!
  new app.AppView();

  // Don't start the router until our posts have loaded
  app.notes.on('sync', _.once(function() {
    Backbone.history.start();
  }));
});