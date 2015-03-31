/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');

var Editor = React.createClass({
  shouldComponentUpdate: function(nextProps) {
    return nextProps.html !== this.getDOMNode().innerHTML;
  },
  componentDidUpdate: function() {
    if ( this.props.html !== this.getDOMNode().innerHTML ) {
      this.getDOMNode().innerHTML = this.props.html;
    }
  },
  emitChange: function(evt){
    var html = this.getDOMNode().innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { value: html };
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  },
  render: function() {
    return (
      <div className='react-contenteditable'
        onInput={this.emitChange} 
        onBlur={this.emitChange}
        contentEditable
        data-ph='Start note taking...'
        dangerouslySetInnerHTML={{__html: this.props.html}}
      >
      </div>
    );
  }
});

module.exports = Editor;