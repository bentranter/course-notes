(function() {

  'use strict';

  var People = Backbone.Model.extend({
    url: 'http://localhost:3000/api/people',
    type: 'Test',
    initialize: function() {
      console.log('Initialized a new People model instance');
    },
    save: function() {
      var data = document.getElementById('noteBody').innerHTML;
      todoItem.set({description: data});
      console.log(todoItem.get('description'));
    },
    toggleSidebar: function() {

      var sidebar = document.getElementById('main');
      
      if (sidebar.classList.contains('ml220')) {
        sidebar.classList.remove('ml220');
      } else {
        sidebar.classList.add('ml220');
      }
    }
  });

  var test = new People();

  /**
   * Event Listeners
   */
  document.getElementById('save').addEventListener('click', test.save);
  document.getElementById('toggleSidebar').addEventListener('click', test.toggleSidebar);

})();