/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React  = require('react');
var Editor = require('./Editor.js');

var NoteContainer = React.createClass({
  getInitialState: function() {
    /**
     * This is how you autopopulate content
     */
    return {html: ''};
  },
  handleChange: function(evt){
    this.setState({html: evt.target.value});
  },
  render: function() {
    return(
      <div className='z1 absolute top-0 left-0 bottom-0 right-offset m4 overflow-auto'>
        <Editor html={this.state.html} onChange={this.handleChange} />
      </div>
    );
  }
});

module.exports = NoteContainer;