// Namespaces: Global Backbone, Underscore, jQuery, ENTER_KEY
var app = app || {};

(function() {
  'use strict';

  app.NoteEditorView = Backbone.View.extend({

    template: _.template($('#noteEditorTemplate').html()),

    events: {
      'click #save': 'save',
      'click #delete': 'delete',
      'click #speedread': 'openSpeedReadingDialog'
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
      var response = window.confirm('Are you sure?');
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

    // This is pretty insane, and should probably be
    // in its own file
    speedread: function() {
      var self = this;

      // We set up our elements like this to take advantage
      // of object chaching and stay outta the DOM
      var pauseBtn = $('#pause');
      var finishBtn = $('#finish');
      var reader = $('#reader');
      var speedControl = $('#wpm');

      var wpm = parseInt(speedControl.val());
      speedControl.on('change mousemove', function() {
        wpm = speedControl.val();
      });
      var wordsPerMs = 60000/wpm;
      // Split on any spaces, remove any line breaks present in the note
      var text = this.model.get('content').replace(/\<br\>/g,' ').split(/\s+/);

      // The reader won't stop if the selection starts or ends with spaces
      if (text[0] === '') {
        text = text.slice(1, text.length);
      }
      if (text[text.length - 1] === '') {
        text = text.slice(0, text.length - 1);
      }

      /**
       * Preprocess words
       *
       * Start by copying the array
       */
      var temp = text.slice(0);
      var t = 0;

      for (var i = 0; i < text.length; i++) {
        // Double up on long words and words with commas.
        if((text[i].indexOf(',') !== -1 || text[i].indexOf(':') !== -1 || text[i].indexOf('-') !== -1 || text[i].indexOf('(') !== -1|| text[i].length > 8) && text[i].indexOf('.') === -1) {
          temp.splice(t+1, 0, text[i]);
          t++;
        }
        // Add an additional space after punctuation.
        if(text[i].indexOf('.') !== -1 || text[i].indexOf('!') !== -1 || text[i].indexOf('?') !== -1 || text[i].indexOf(':') !== -1 || text[i].indexOf(';') !== -1|| text[i].indexOf(')') !== -1) {
          temp.splice(t+1, 0, ' ');
          t++;
        }
        t++;
      }

      text = temp.slice(0);

      var currentWord = 0;
      var running = false;
      var timer = [];

      pauseBtn.click(function() {
        pausePlay();
      });

      function pausePlay() {
        if (running) {
          stopPlayer();
        } else {
          startPlayer();
        }
      }

      function updateValues(i) {
          reader.html(text[i]);
          currentWord = i;
      }

      function startPlayer() {
          running = true;
          timer.push(setInterval(function() {
              updateValues(currentWord);
              currentWord++;
              if(currentWord >= text.length) {
                  currentWord = 0;
                  stopPlayer();
                  self.closeSpeedReadingDialog();
              }
          }, wordsPerMs));
      }

      function stopPlayer() {
          for(var i = 0; i < timer.length; i++) {
              clearTimeout(timer[i]);
          }
          running = false;
      }
    },

    alert: function(el) {
      // Basically just a popup message. Unfortuately,
      // it gets ripped out from the DOM afer the
      // request fires
      $(el).show().delay(3000).fadeOut();
    }
  });
})();