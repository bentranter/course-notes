// Namespaces: Global Backbone, Underscore, jQuery, ENTER_KEY
var app = app || {};

(function() {
  'use strict';

  app.LoginView = Backbone.View.extend({

    el: '#account',

    signedInTemplate: _.template($('#accountSignedIn').html()),

    signedOutTemplate: _.template($('#accountSignedOut').html()),

    events: {
      'click #signin': 'signIn',
      'click #signout': 'signOut'
    },

    username: window.localStorage.getItem('token') ? window.localStorage.getItem('username') : '',

    initialize: function() {
      this.render();
    },

    render: function() {
      if (!this.username) {
        $(this.el).html(this.signedOutTemplate());
      } else {
        $(this.el).html(this.signedInTemplate({ username: this.username }));
      }
    },

    signIn: function(e) {
      // HAHA I LOVE CALLBACKS
      e.preventDefault();
      var self = this;
      $.ajax({
        url: 'http://localhost:3000/api/login',
        type:'POST',
        data: {
          username: $('#username').val(),
          password: $('#password').val()
        },
        success: function(res) {
          // Re-run ajaxSetup when someone signs in
          self.handleSuccess(res, function() {
            $.ajaxSetup({
              headers: {
                'X-Access-Token': window.localStorage.getItem('token')
              },
              statusCode: {
                401: function() {
                  console.log('Please sign in');
                },
                403: function() {
                  console.log('please provide a valid token');
                },
                500: function() {
                  console.log('RIP server... it was a good run.');
                }
              }
            });
            app.notes.fetch({
              success: function() {
                self.render();
              },
              error: function(err) {
                console.log(err);
              }
            });
          });
        },
        error: function(err) {
          console.log(err);
        }
      });
    },

    signOut: function() {
      window.localStorage.setItem('token', '');
      window.localStorage.setItem('username', '');
      this.username = '';
      this.render();
      // @TODO: (Note to self) After going through so much
      // trouble to update the DOM manually for insane
      // perf, you do this... 
      window.location.reload();
    },

    handleSuccess: function(res, cb) {
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('username', res.user);
      this.username = res.user;
      cb();
    }
  });
})();