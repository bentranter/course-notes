/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React         = require('react');
var request       = require('superagent');
var Router        = require('react-router');
var NoteContainer = require('./NoteContainer.js');
var Sidebar       = require('./Sidebar.js');
var SignInForm    = require('./SignInForm.js');
var SignInPage    = require('./SignInPage.js');
var Editor        = require('./Editor');

var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;
var Route         = Router.Route;
var RouteHandler  = Router.RouteHandler;

/**
 * App main entry point
 */
var App = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadNotesFromServer: function() {
    // OH MY GOD
    var self = this;
    request
      .get('http://localhost:3000/api/notes')
      .set('X-Access-Token', window.localStorage.getItem('token'))
      .end(function(err, res) {
        if (res.ok) {
          self.setState({data: res.body});
        } else {
          console.log('Error' + res.text);
        }
      });
  },
  componentDidMount: function() {
    this.loadNotesFromServer();
  },
  render: function() {
    return (
      <div>
        <NoteContainer data={this.state.data} />
        <Sidebar data={this.state.data} />
        <RouteHandler />
      </div>
    );
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
 *
 * Fun react router fact: don't bother assigning handlers to routes,
 * they'll conflict with EVERYTHING, and you can't pass state in
 * properly???
 */
var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='notes' path='notes/:noteId'>
      <Route name='speedread' path='speedread' handler={Speedread}/>
    </Route>
  </Route>
);

/**
 * Start the Router
 */
Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});