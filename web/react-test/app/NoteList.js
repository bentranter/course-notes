/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');

var NoteList = React.createClass({
  render: function() {
    return (
      <div className='ml2 mr2 mt2 btl'>
        <span className='left'>
          <h5 className='m0 py2 small-caps btd'>Your Notes</h5>
        </span>
        <span className='right'>
          <h5 className='m0 py2 small-caps light light-gray'>Help</h5> 
        </span>
      </div>
    );
  }
});

module.exports = NoteList;