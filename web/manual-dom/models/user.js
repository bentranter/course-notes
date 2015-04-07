// Namespace global
var app = app || {};

(function() {
  'use strict';

  app.User = Backbone.Model.extend({
    defaults: {
      username: '',
      signedIn: false
    }
  });
})();