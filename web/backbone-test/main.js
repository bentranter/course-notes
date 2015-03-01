(function() {

  'use strict';

  var People = Backbone.Model.extend({
    url: 'http://localhost:3000/api/people'
  });

  var save = function() {
    var data = document.getElementById('noteBody').innerHTML;
    todoItem.set({description: data});
    console.log(todoItem.get('description'));
  };

  var toggleSidebar = function() {

    var sidebar = document.getElementById('sidebar');
    
    if (sidebar.classList.contains('ml220')) {
      sidebar.classList.remove('ml220');
    } else {
      sidebar.classList.add('ml220');
    }
  };

  /**
   * Event Listeners
   */
  document.getElementById('save').addEventListener('click', save);
  document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);

})();