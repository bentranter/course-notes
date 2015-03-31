/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React         = require('react');
var Router        = require('react-router');
var NoteContainer = require('./NoteContainer.js');
var Sidebar       = require('./Sidebar.js');
var SignInForm    = require('./SignInForm.js');
var SignInPage    = require('./SignInPage.js');

var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;
var Route         = Router.Route;
var RouteHandler  = Router.RouteHandler;

/**
 * App main entry point
 */
var App = React.createClass({
  render: function() {
    return (
      <div>
        <NoteContainer />
        <Sidebar />
        <RouteHandler />
      </div>
    );
  }
});

/**
 * Define routes
 */
var routes = (
  <Route name='app' path='/' handler={App}>
  </Route>
);

/**
 * Start the Router
 */
Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});