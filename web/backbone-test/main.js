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

  function toggleAccount() {

    console.log('Toggled');
    var account = document.getElementById('account');
    account.classList.toggle('hide');
  }

  function toggleSearch(e) {

    var search = document.getElementById('search');
    search.classList.toggle('hide');



    // Close the searchbar if you click outside of it
  }

  function toggleSidebar() {
    console.log('Toggled sidebar');
    var sidebar = document.getElementById('sidebar');
    var main = document.getElementById('main');

    sidebar.classList.toggle('hide');
    main.classList.toggle('ml220');
  }

  function search() {

    var query = document.getElementById('search').value;
    console.log('Searching for:' + query);

    var text = document.getElementById('noteBody').innerHTML;
    
    for (var i in text) {

      console.log(i);
    }
  }

  document.getElementById('accountToggle').addEventListener('click', toggleAccount);
  document.getElementById('searchToggle').addEventListener('click', toggleSearch);
  document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
  document.getElementById('search').addEventListener('keyup', search);

})();