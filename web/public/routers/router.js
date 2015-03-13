// Namespaces global
var app = app || {};

(function () {
  'use strict';

  // Routes
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'notes/:id': 'getNote'
    }
  });

  app.router = new Router();
  app.router.on('route:getNote', function(id) {
    console.log('Opening note, ' + id);
  });
  Backbone.history.start();
})();