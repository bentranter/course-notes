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
  handleSave: function(e) {
    e.preventDefault();
    var content = React.findDOMNode(this.refs.content).value.trim();
    var title   = 'test';
    var folder  = 'test';
    var subitle = 'test';
    if (!content) {
      return;
    }
    /**
     * @TODO: Figure out submission logic
     */
    this.props.onSubmit({
      content : content,
      title   : title,
      folder  : folder,
      subtitle: subtitle
    });
    return;
  },
  render: function() {
    var routeId = this.context.router.getCurrentParams().noteId ? this.context.router.getCurrentParams().noteId : '';
    return (
      <div className='z1 absolute top-0 left-0 bottom-0 right-offset m4 overflow-auto'>
        <div className='react-contenteditable' contentEditable data-ph='Start note taking...'
          dangerouslySetInnerHTML={{__html: this.context.router.getCurrentParams().noteId ? this.context.router.getCurrentParams().noteId : ''}}>
        </div>
        <button className='absolute bottom-0 right-0'>Save</button>
      </div>
    );
  }
});

module.exports = Editor;