// Namespaces global
var app = app || {};

(function () {
  'use strict';

  // Routes: used for matching views to a model or collection
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'notes/:id': 'getNote'
    }
  });

  app.router = new Router();

  app.router.on('route:getNote', function(id) {
    var model = app.notes.get(id);

    if (!model) {
      console.log('No model found honey.');
    }

    // Init a new top level view and pass in your model.
  });

  // Use proper URLs if you want for HTML5 history
  Backbone.history.start({
    pushState: true
  });
})();