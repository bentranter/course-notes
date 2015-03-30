'use strict';

/**
 * Module Dependencies
 */
var React = require('react');
var request = require('superagent');

/**
 * Area man tests request to see if it works
 */
request
  .get('https://api.github.com/users/bentranter')
  .end(function(err, res) {
    if (err) console.log(err.toString());
    console.log(res);
  });