// The only true globals in the app :)
var app = app || {};
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

// Kick things off inside a DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Make a new app view to essentially 'start' the app
  new app.AppView();

  // Initialize your things
  new app.UserView({
    collection: app.users
  });
  new app.NoteView({
    collection: app.notes
  });
}, false);