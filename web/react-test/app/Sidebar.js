/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React         = require('react');
var request       = require('superagent');
var SignInPage    = require('./SignInPage.js');
var NoteList      = require('./NoteList.js');
var EditorButtons = require('./EditorButtons.js');

var Sidebar = React.createClass({
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
    return(
      <div className='z1 absolute sidebar top-0 bottom-0 right-0 overflow-auto bg-silver bll'>
        <SignInPage url='http://localhost:3000/api/login' />
        <NoteList data={this.state.data}/>
        <EditorButtons />
      </div>
    );
  }
});

module.exports = Sidebar;