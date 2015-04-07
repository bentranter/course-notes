'use strict';

/**
 * Module dependencies
 */
 
var bcrypt = require('bcrypt-nodejs');
var c = require('chalk');
var validator = require('validator');
var thinky = require(__dirname + '/../util/thinky.js');

// Keep reference to RethinkDB's driver
var r = thinky.r;
var type = thinky.type;

var User = thinky.createModel('User', {
  username: String,
  password: String,
  date: { 
  _type: Date, default: r.now() }
}, {
  // Make the username the primary key
  pk: 'username'
});

// Ensure indices for ordering
User.ensureIndex('date');

// @TODO: Never return a password, even if it's requested
User.define('getView', function() {
  return this.without('password');
});

// Salt and hash the password on save
User.pre('save', function(next) {
  // Get object from req
  var user = this;

  // Salt the password
  bcrypt.genSalt(5, function(err, salt) {
    if (err) {
      console.log(c.red('Errors while generating salt: ') + err);
    }

    // Hash the password
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
          return console.log(c.red('Errors while hashing password: ') + err);
      } else {
          user.password = hash;
          next();
      }
    });
  });
});

module.exports = User;