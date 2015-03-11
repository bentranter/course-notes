'use strict';

/** 
 * Module dependencies.
 */

var util = require('util'),
  bcrypt = require('bcrypt-nodejs'),
  jwt = require('jwt-simple'),
  moment = require('moment'),
  c = require('chalk'),
  thinky = require(__dirname + '/util/thinky.js'),
  token = require(__dirname + '/util/jwt.js'),
  User = require(__dirname + '/models/user.js'),
  Note = require(__dirname + '/models/note.js');

// Keep reference to RethinkDB's driver
var r = thinky.r;

/**
 * Login to StudyPiggy. Finds the username, and compares
 * passwords to indicate a successful signin attempt.
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client.
 * Includes a valid JSON web token
 * @api public
 */ 

exports.login = function(req, res) {
  // Start by finding the username
  User.get(req.body.username).run().then(function(user) {
    console.log(c.green('\nFound user: ') + req.body.username);

    // Compare the password here with the password in the database
    bcrypt.compare(req.body.password, user.password, function(err, res) {
      console.log(c.red('Errors: ') + err);
      console.log(c.blue('Password matched: ') + res);
    });

    // Create a token that expires 7 days from now
    var expires = moment().add(7, 'days').valueOf();
    var token = jwt.encode({
      iss: user.username,
      exp: expires
      // @TODO: Use NODE_ENV to create a secret when you start the server in production
    }, 'mysecret');

    // Issue the token in the response
    res.json({
      token: token,
      expires: expires,
      user: user.username
    });

  }).error(function(err) {
    console.log(c.red('\nError: could not find user with username: ') + req.body.username);

    // @TODO: This is where you need to setup the logic to suggest that new users sign up.
    console.log(c.yellow('Maybe you should create an account?'));
    res.status(404).json(err);
  });
};

/**
 * Creates a new user from a username and password.
 *
 * @param {Object} the request to our server
 * @param {response} the response to the client
 * @api public
 */

exports.signUp = function(req, res) {
  // Create new instance of 'User' model
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  // Save the person and check for errors kind-of. It'll also call `save`'s `pre` hook
  user.save(function(err, doc) {
  if (err) {
    res.status(403).json({
      error: 'Username already taken. Choose a different username.'
    });
    console.log(c.red('Error: ') + err);

  } else {
    // Create a token that expires 7 days from now
    var expires = moment().add(7, 'days').valueOf();
    var token = jwt.encode({
      iss: user.username,
        exp: expires
    }, 'mysecret');

    // Issue the token in the response
    res.json({
      token: token,
      expires: expires,
      user: user.username
    });
  }});
};

/**
 * Get a list of users.
 *
 * @param {Object} the request to our server
 * @param {Object} the response back to the client
 * @api public
 */

exports.getUserList = function(req, res) {
  // Order the users by date
  User.orderBy({ index: r.desc('date') }).run().then(function(user) {
    res.json(user);
  });
};

/**
 * Delete a user's account.
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client
 * @api public
 */

exports.deleteUser = function(req, res) {
  // Get the username from the token
  var user = token.decode(req);

  // Immediately expire the token
  user.expires = moment(); // @TODO: respond with the updated token

  // @TODO: Delete all notes belonging to that user?
  User.get(user.iss).delete().run().then(function(result) {
    res.json({
      result: util.inspect(result)
    });
  });
};

/**
 * Get all the notes belonging to a user.
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client
 * @api public
 */

exports.listNotes = function (req, res) {
  // Get the JSON web token
  var decoded = token.decode(req);
  var username = decoded.iss;

  Note.filter({
    username: username
  }).run().then(function(notes) {
    res.json(notes);
  });
};



/**
 * Create a new user.
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client
 * @api public
 */

exports.addNote = function (req, res) {
  // Get the username from the users web token
  var decoded = token.decode(req);

  // Create new instance of 'Notes' model
  var note = new Note({
    title: req.body.title,
    subtitle: req.body.subtitle,
    content: req.body.content,
    username: decoded.iss,
    folder: req.body.folder,
    dateCreated: r.now(),
    dateUpdated: r.now(),
    timesReviewed: 0 // Initialize at 0
  });

  // Save the person and check for errors kind-of
  note.save(function(err, note) {
    if (err) {
      console.log(c.red('Errors:') + err);
      res.json(err);
    } else {
      console.log(c.green('\nSuccessfully added note'));
      res.json(note);
    }
  });
};

/**
 * Get a note by id.
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client
 * @api public
 */

exports.getNote = function(req, res) {
  Note.get(req.params.id).run().then(function(note) {
    res.json(note);
  });
};

/**
 * Delete a note by id.
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client
 * @api public
 */

exports.deleteNote = function (req, res) {
  Note.get(req.params.id).delete().run().then(function(result) {
    res.json({
      // Something is broken in RethinkDBDash - this is
      // a hotfix for it
      result: util.inspect(result)
    });
  });
};

/**
 * Update an existing note by id
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client
 * @api public
 */

exports.updateNote = function (req, res) {
  Note.get(req.params.id).run().then(function(note) {
    var decoded = token.decode(req);

    if (req.body.title) {
      note.title = req.body.title;
    }
    if (req.body.subtitle) {
      note.subtitle = req.body.subtitle;
    }
    if (req.body.content) {
      note.content = req.body.content;
    }
    // Always get username from token on every request
    note.username = decoded.iss;
    if (req.body.folder) {
      note.folder = req.body.folder;
    }
    note.dateCreated = note.dateCreated;
    note.dateUpdated = r.now();
    note.timesReviewed = parseInt(note.timesReviewed) + 1;

    // Save the person and check for errors kind-of
    note.save(function(err, doc) {
      if (err) {
        res.send(err); 
      } else {
        res.json(doc); 
      }
    });
  });
};