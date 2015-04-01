/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React   = require('react');
var request = require('superagent');

var Editor = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  handleSave: function() {
    //
  },
  render: function() {
    return (
      <div className='z1 absolute top-0 left-0 bottom-0 right-offset m4 overflow-auto'>
        <div className='react-contenteditable' contentEditable data-ph='Start note taking...'
          dangerouslySetInnerHTML={{__html: this.context.router.getCurrentParams().noteId ? this.context.router.getCurrentParams().noteId : ''}}>
        </div>
      </div>
    );
  }
});

module.exports = Editor;