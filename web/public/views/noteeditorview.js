// Namespaces: Global Backbone, Underscore, jQuery, ENTER_KEY
var app = app || {};

(function() {
  'use strict';

  app.NoteEditorView = Backbone.View.extend({

    template: _.template($('#noteEditorTemplate').html()),

    events: {
      'click #save': 'save',
      'click #delete': 'delete',
      'click #speedread': 'openSpeedReadingDialog',
      'click #finish': 'nextReview',
      // Keyboard shortcut for save
      'keydown': 'handleSaveShortcut'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      // Somewhere in here I think I can leverage object
      // caching to speed up renders, but idk for sure
      var data = this.model.toJSON();
      $(this.el).html(this.template(data));
      return this;
    },

    delete: function() {
      var response = window.confirm('Are you sure you want to delete this note?');
      if (response === true) {
        // Roll outta that view! (before we know if the model could even be destroyed)
        app.router.navigate('/notes/new', { trigger: true });
        this.model.destroy();
        this.alert('#alertDeleted');
      }
    },

    save: function() {
      if (this.model.isNew()) {
        app.notes.create({
          title: $('#noteTitle').html(),
          content: $('#noteContent').html(),
          subtitle: 'Unused',
          folder: $('#noteFolder').html()
        }, {
          wait: true,
          success: function(res) {
            app.router.navigate('/notes/' + res.id, false);
          }
        });
        this.alert('#alertSaved');
      } else {
        this.model.save({ 
          title: $('#noteTitle').html(),
          content: $('#noteContent').html(),
          subtitle: 'Unused',
          folder: $('#noteFolder').html()
        });
        // Backbone is smart enough not to re-render anything unless the server throws an error
        this.model.trigger('change');
        this.alert('#alertSaved');
      }
    },

    handleSaveShortcut: function(e) {
      if((e.ctrlKey || e.metaKey) && e.which === 83) {
        e.preventDefault();
        this.save();
        return false;
      }
      return true;
    },

    openSpeedReadingDialog: function() {
      var self = this;
      $('#overlay').show();
      $('#dialog').fadeIn(300);
      $('#overlay').click(function(e) {
        self.closeSpeedReadingDialog();
      });
      this.speedread();
    },

    closeSpeedReadingDialog: function() {
      $('#overlay').hide();
      $('#dialog').fadeOut(300);
    },

    speedread: function() {
      app.speedRead('pause', 'finish', 'reader', 'wpm', 'noteContent');
    },

    alert: function(el) {
      $(el).show().delay(3000).fadeOut();
    },

    toggleFinish: function() {

    },

    nextReview: function() {
      var nextReview = this.model.get('nextReview');
      var timesReviewed = this.model.get('timesReviewed');
      var grade = $('[name="grade"]:checked').val();

      if (!grade) {
        this.alert('#alertErrorSelectOption');
        console.log('wut');
      } else {
        console.log(nextReview, timesReviewed, grade);
        
        // Do this at the end fam
        // this.model.save({ 
        //   title: $('#noteTitle').html(),
        //   content: $('#noteContent').html(),
        //   subtitle: 'Unused',
        //   folder: $('#noteFolder').html()
        // }); 
        // Change model so sidebar colour changes after speedread
        // this.model.trigger('change');
        // this.alert('#alertSaved');
        // this.closeSpeedReadingDialog();
      }
    }
  });
})();