/** @jsx React.DOM */

'use strict';

/**
 * Module dependencies
 */
var React = require('react');
var request = require('superagent');
var SignInForm = require('./SignInForm.js');
/**
 * Sign in page
 */
var SignInPage = React.createClass({
  componentDidMount: function() {
    console.log('Mounted SignInPage');
  },
  handleSignIn: function(userInfo) {
    request
      .post(this.props.url)
      .send(userInfo)
      .end(function(err, res) {
        if (res.ok) {
          window.localStorage.setItem('token', res.body.token);
          console.log(window.localStorage.getItem('token'));
        } else {
          console.log('Oh no! error ' + res.text);
        }
      });
    console.log('Request fired');
  },
  render: function() {
    return (
      <div className='signInPage ml2 mr2 mt2 btl'>
        <span className='left'>
          <h5 className='m0 py2 small-caps btd'>Sign in to StudyPiggy</h5>
        </span>
        <span className='right'>
          <h5 className='m0 py2 small-caps light light-gray'>Forgot password?</h5> 
        </span>
        <div className='cf'></div>
        <SignInForm onSubmit={this.handleSignIn} />
      </div>
    );
  }
});

module.exports = SignInPage;