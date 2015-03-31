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
 * Routing test shit
 */
var Test = React.createClass({
  render: function() {
    console.log('Test passed');
    return null;
  }
});

/**
 * Routing test shit
 */
var Speedread = React.createClass({
  render: function() {
    console.log('Speedreading some note');
    return null;
  }
});

/**
 * Define routes
 */
var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='test' path='/test' handler={Test} />
    <Route name='speedread' path='/speedread' handler={Speedread} />
  </Route>
);

/**
 * Start the Router
 */
Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});