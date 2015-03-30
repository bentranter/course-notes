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
      <div className='p2'>
        <div className='signInPage'>
          <div className='cntr p2'>
            <h1 className='h3 center light'>Sign in to StudyPiggy</h1>
          </div>
          <div className='cntr p2 bg-silver bl shadow'>
            <SignInForm onSubmit={this.handleSignIn} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SignInPage;