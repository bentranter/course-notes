/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React  = require('react');
var Link = require('react-router').Link; 

/**
 * Sign in form
 */
var NoteListItem = React.createClass({
  render: function() {
    return (
      <li className='noteListItem mb2'>
        <Link to='speedread' className='light-gray ml2'>
          <svg width='12px' height='12px' viewBox='0 0 32 32' className='icon'><path d='M16 0 A16 16 0 0 0 0 16 A16 16 0 0 0 16 32 A16 16 0 0 0 32 16 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 28 16 A12 12 0 0 1 16 28 A12 12 0 0 1 4 16 A12 12 0 0 1 16 4 M14 6 L14 17.25 L22 22 L24.25 18.5 L18 14.75 L18 6z '></path></svg>
        </Link>
        <Link to='test' className='h5 noteTitle ml2 light-gray light'>
          {this.props.title}
        </Link>
      </li>
    );
  }
});

module.exports = NoteListItem;