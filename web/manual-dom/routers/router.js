// Namespaces global
var app = app || {};

(function () {
  'use strict';

  // Routes: used for matching views to a model or collection
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      '/:id': 'getNote'
    },

    getNote: function() {
      
    }
  });

  app.Router = new Router();
})();