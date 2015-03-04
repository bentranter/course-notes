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
    }
  });

  var test = new People();

  /**
   * Event Listeners
   */
  document.getElementById('save').addEventListener('click', test.save);
  document.getElementById('toggleSidebar').addEventListener('click', test.toggleSidebar);

})();