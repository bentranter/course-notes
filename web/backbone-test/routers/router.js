// Namespaces global
var app = app || {};

(function () {
  'use strict';

  // Routes
  var Router = Backbone.Router.extend({
    routes: {
      '*filter': 'setFilter'
    },

    setFilter: function (param) {
      // Set the current filter to be used
      app.TodoFilter = param || '';

      // Trigger a collection filter event, causing hiding/unhiding
      // of view items
        app.todos.trigger('filter');
      }
  });

  app.router = new Router();
  Backbone.history.start();
})();