/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React        = require('react');
var request      = require('superagent');
var NoteListItem = require('./NoteListItem.js');

var NoteList = React.createClass({
  render: function() {
    var noteNodes = this.props.data.map(function(note) {
      return (
        <NoteListItem title={note.title} id={note.id} key={note.id} />
      );
    });
    return (
      <div className='ml2 mr2 mt3 mb2 btl'>
        <span className='left'>
          <h5 className='m0 py2 small-caps btd'>Your Notes</h5>
        </span>
        <span className='right'>
          <h5 className='inline-block m0 mr2 py2 small-caps light blue'>New</h5> 
          <h5 className='inline-block m0 py2 small-caps light light-gray'>Hide</h5>
        </span>
        <div className='cf'></div>
        <ul className='list-reset'>
          {noteNodes}
        </ul>
      </div>
    );
  }
});

module.exports = NoteList;