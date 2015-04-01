/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React  = require('react');
var Editor = require('./Editor.js');

var NoteContainer = React.createClass({
  render: function() {
    return (
      <Editor data={this.props} />
    );
  }
});

module.exports = NoteContainer;