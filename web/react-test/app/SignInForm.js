/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');

/**
 * Sign in form
 */
var SignInForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();
    if (!email || !password) {
      return;
    }
    this.props.onSubmit({
      username: email,
      password: password
    });
    React.findDOMNode(this.refs.email).value = '';
    React.findDOMNode(this.refs.password).value = '';
    return;
  },
  componentDidMount: function() {
    console.log('Mounted SignInForm');
  },
  render: function() {
    return (
      <form className='signInForm fieldset-reset' onSubmit={this.handleSubmit} action='http://localhost:3000/api/login' method='post'>
        <input className='block full-width' type='email' placeholder='Email' ref='email' />
        <input className='block full-width' type='password' placeholder='Password' ref='password' />
        <input className='button block bg-silver blue center caps light' type='submit' value='Sign In' />
      </form>
    );
  }
});

module.exports = SignInForm;