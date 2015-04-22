/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React         = require('react');
var SignInPage    = require('./SignInPage.js');
var NoteList      = require('./NoteList.js');
var EditorButtons = require('./EditorButtons.js');

var Sidebar = React.createClass({
  render: function() {
    return(
      <div className='z1 absolute sidebar top-0 bottom-0 right-0 overflow-auto bg-silver bll'>
        <SignInPage url='http://localhost:3000/api/login' />
        <NoteList data={this.props.data} />
        <EditorButtons />
      </div>
    );
  }
});

module.exports = Sidebar;