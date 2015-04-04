// Namespace global
var app = app || {};

(function() {
  'use strict';

  app.Note = Backbone.Model.extend({
    defaults: {
      title: 'Untitled',
      subtitle: '',
      content: '',
      folder: ''
    }
  });
})();