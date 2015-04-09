// Namespaces: Global Backbone, Microtemplate, ENTER_KEY
var app = app || {};

// Self-execute
(function() {
	'use strict';

	// Our overall AppView is the top-level piece of UI
	app.AppView = Backbone.View.extend({
		// Instead of making a new element, bind to the existing skeleton
		// of the App already present in the HTML
		el: '#app',

		// Delegated events for toggling visibility of UI elements
		events: {
			'click #accountToggle': 'toggleAccount',
			'click #searchToggle' : 'toggleSearch',
			'click #sidebarToggle': 'toggleSidebar',
			'keypress #search'    : 'search'
		},

		// What to do once everything has loaded
		initialize: function() {
			console.log('appview.js: Initialized.');
		},

		// What to render
		render: function() {
			console.log('appview.js: Rendered.');
		},

		// @TODO: Searches for whatever is in the search bar
		search: function() {
			var query = document.getElementById('search').value;
			console.log('appview.js: Searching for:' + query);
			var text = document.getElementById('noteBody').innerHTML;

			for (var i in text) {
				console.log(i);
			}
		},

		// Toggles the visibility of the account section
		toggleAccount: function() {
			console.log('appview.js: Toggled account.');
			var account = document.getElementById('account');
			account.classList.toggle('hide');
		},

		// Toggles the visibility of the search box
		toggleSearch: function() {
			console.log('appview.js: Toggled search');
			var search = document.getElementById('search');
			search.classList.toggle('hide');
		},

		// Toggles the visibility of the sidebar
		toggleSidebar: function() {
			console.log('appview.js: Toggled sidebar');
			var sidebar = document.getElementById('sidebar');
			var main = document.getElementById('main');

			sidebar.classList.toggle('hide');
			main.classList.toggle('sidebar-offset');
		}
	});
})();