// The only true globals in the app :)
var app = app || {};
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

// Kick things off when we're ready
$(document).ready(function() {
  'use strict';

  app.alert = function(message) {
    window.alert(message);
  };

  // Make a new app view to essentially 'start' the app
  new app.AppView();

  // Initialize your things
  new app.AccountView({
    collection: app.users
  });
  new app.ListView({
    collection: app.notes
  });
});