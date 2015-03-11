// Global namespace
var app = app || {};

(function() {
  'use strict';

  app.User = Backbone.Model.extend({
    // Set the default username to be guest, so
    // users without an account can still demo
    // the app. This will be overridden when a
    // user signs in
    defaults: {
      username: 'Guest'
    }
  });
})();