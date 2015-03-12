// Namespaces global
var app = app || {};

(function () {
  'use strict';

  // Routes
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home'
    }
  });

  app.router = new Router();
  Backbone.history.start();
})();