// Global namespace
var app = app || {};

(function() {
  'use strict';

  var Users = Backbone.Collection.extend({
    // Provide reference this collection's model
    model: app.User,

    url: 'http://localhost:3000/api/login',

    // Save notes under the `'StudyPiggy'` namespace
    // in localstorage
    localStorage: new Backbone.LocalStorage('StudyPiggyUsers')
  });

  app.users = new Users();
})();