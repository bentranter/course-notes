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
        console.log('Please sign in');
      },
      403: function() {
        console.log('please provide a valid token');
      },
      500: function() {
        console.log('RIP server... it was a good run.');
      }
    }
  });

  // Turn the key... start the ignition baby!!!
  new app.AppView();

  // Shift into first...
  new app.LoginView();

  // AND PUSH THE GAS!!! (Don't start the router until our posts have loaded)
  app.notes.on('sync', _.once(function() {
    Backbone.history.start();
  }));
});