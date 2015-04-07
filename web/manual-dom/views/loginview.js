// Namespaces: Global Backbone, Underscore, jQuery, ENTER_KEY
var app = app || {};

(function() {
  'use strict';

  app.LoginView = Backbone.View.extend({

    template: _.template($('#account').html()),

    events: {
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'all', this.render);
      console.log('Hello');
    },

    render: function() {
      if (window.getItem('token')) {
        console.log('Signed in');
      } else {
        console.log('Not signed in');
      }
      // var data = this.model.toJSON();
      // this.$el.html(this.template(data));
      // return this;
    }
  });
})();