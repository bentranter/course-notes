// Namespaces: Global Backbone, Underscore, jQuery, ENTER_KEY
var app = app || {};

(function() {
  'use strict';

  app.NoteView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#noteTemplate').html()),

    events: {
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      // Somewhere in here I think I can leverage object
      // caching to speed up renders, but idk for sure
      var data = this.model.toJSON();
      this.$el.html(this.template(data));
      return this;
    },

    // editTitle: function(e) {
    //   if (e.which === ENTER_KEY) {
    //     var value = e.target.value;
    //     this.model.save({
    //       data: { username: this.model.toJSON().username },
    //       title: value
    //     });
    //     this.model.trigger('change');
    //   }
    // },

    // editPost: function(e) {
    //   if (e.which === ENTER_KEY) {
    //     var value = e.target.value;
    //     this.model.save({ 
    //       message: value
    //     });
    //     this.model.trigger('change');
    //   }
    // },

    // clear: function() {
    //   this.model.destroy({
    //     data: {
    //       username: this.model.toJSON().username
    //     }
    //   });
    // }
  });
})();