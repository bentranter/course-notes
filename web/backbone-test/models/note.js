// Namespace global
var app = app || {};

(function() {
  'use strict';

  app.Note = Backbone.Model.extend({
    defaults: {
      title: '',
      subtitle: '',
      content: '',
      folder: ''
    }
  });
})();