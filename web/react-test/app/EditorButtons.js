/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');

var EditorButtons = React.createClass({
  render: function() {
    return (
      <div className='ml2 mr2 mt3 btl'>
        <span className='left'>
          <h5 className='m0 py2 small-caps btd'>Editor</h5>
        </span>
        <span className='right'>
          <h5 className='m0 py2 small-caps light light-gray'>Hide</h5> 
        </span>
        <div className='cf'></div>
      </div>
    );
  }
});

module.exports = EditorButtons;