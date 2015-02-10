'use strict';

/** 
 * Module dependencies.
 */

var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');
// var passport = require('passport');
// var BasicStrategy = require('passport-http').BasicStrategy;
var thinky = require('thinky')({
    host: process.env.RDB_HOST || 'localhost',
    port: parseInt(process.env.RDB_PORT || 28015),
    db:   process.env.RDB_DB || 'StudyFast'
});
var r = thinky.r;
var c = require('chalk');

/**
 * Creating Users -- The Good Parts
 */

var User = thinky.createModel('User', {
    username: String,
    password: String,
    date: { _type: Date, default: r.now() }
}, {
    pk: 'username'
});

// Put stupid constructor here
var People = thinky.createModel('People', {
      firstName: String,
      lastName:  String,
      coolnessFactor: Number,
      date: { _type: Date, default: r.now() }
});

// Ensure that date can be used as an index
People.ensureIndex('date');
User.ensureIndex('date');


/**
 * API Endpoints
 *
 * USER
 */

/**
 * Hash and salt user's info when `save` is called.
 *
 * @params {Callback} The next process in the `save` function
 * @API private
 *
 */

// THIS IS HORRIBLY UNSTABLE! -- YOU CANT CALL `NEXT()` 
// UNLESS YOU'RE SURE THERE ARE NO ERRORS AND THE PASSWORD 
// HASN'T CHANGED
User.pre('save', function(next) {

    // Get object from req
    var user = this;

    // Break out if the password hasn't changed
    // if (!user.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if (err) {
            console.log(c.red('Errors while generating salt: ') + err);
        }

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

/**
 * The great JSON Web Tokens Test
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
        }, 'mysecret');

        // Issue the token in the response
        res.json({
            token: token,
            expires: expires,
            user: user.username
        });

    }).error(function(err) {
        console.log(c.red('\nError: could not find user with username: ') + req.body.username);

        // This is where you need to setup the logic to suggest that new users sign up.
        console.log(c.yellow('Maybe you should create an account?'));
        res.send(404);
    });
};

// Setup token-based auth. This _does_ work perfectly for 
// multiple clients connection, ie iOS/Android/Web sessions.
// However, this means a user can sign in as many times as
// they like and generate more and more tokens. This is something
// we can prevent client side though.
//
// Also, once you have a token, you can request all the data, and
// it'll return success. We need to lock down the API so that the
// response only gives you your own data, and your username or
// userId has to _come from the token_ when you make the request.
exports.authorizeToken = function(req, res, next) {

    // Get the token, wherever it may be
    var token = (req.body && req.body.accessToken) || (req.query && req.query.accessToken) || req.headers['x-access-token'];

    if (token) {
        try {
            
            // Decode the token with the secret
            var decoded = jwt.decode(token, 'mysecret');
            console.log(c.green('Authenticated!'));
            // Use `decoded.iss` to grab username when making requests
            console.log(c.yellow('User: ') + decoded.iss);
            next();

            if (decoded.exp <= Date.now()) {
                res.status(400).json({
                    message: 'Authorization token expired'
                });
            }
        } catch (err) {

            var message = err + '. This means that the your token does not match the one given to you when you logged in. Are you trying to hack us? ;)';
            // Log the error for debugging
            console.log(c.red(err));
            res.status(403).json({
                message: message
            });
        }
    } else {
        console.log(c.red('Error: No token provided'));
        res.status(401).json({
            message: 'No token provided'
        });
    }

};

//For verify password, you can use `User.define(key, function(){ ... });`

//Setup Basic Auth strategy
// passport.use(new BasicStrategy(function(username, password, callback) {

//     User.get(username).run().then(function(user) {

//         console.log(c.green('\nFound user: ') + username);

//         bcrypt.compare(password, user.password, function(err, res) {
//             console.log(c.red('Errors: ') + err);
//             console.log(c.blue('Password matched: ') + res);
//             return callback(err, res);
//         });
//     }).error(function(err) {
//         console.log(c.red('\nError: could not find user with username: ') + username);

//         // This is where you need to setup the logic to suggest that new users sign up.
//         console.log(c.yellow('Maybe you should create an account?'));
//     });
// }));

// exports.isAuthenticated = passport.authenticate('basic', { session: false });

// Create endpoint /api/users for POST -- USE x-www-url-formencoded
exports.addUser = function(req, res) {

    // Create new instance of 'User' model
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    // Save the person and check for errors kind-of. It'll also call `save`'s `pre` hook
    user.save(function(err, doc) {
        if (err) {
            console.log(c.red('Error: ') + err);
            res.send(err);
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
        }
    });
};

// Create endpoint /api/users for GET all users
exports.getUserList = function(req, res) {

    // Order the users by date just cause
    User.orderBy({ index: r.desc('date') }).run().then(function(user) {
        res.json(user);
    });
};

/**
 * PEOPLE
 *
 * Get a list of all users
 *
 * @api public
 *
 * @HTTP GET
 */

exports.list = function (req, res) {

    People.orderBy({ index: r.desc('date') }).run().then(function(people) {
        res.json(people);
    });
};


/**
 * Create a new user.
 *
 * @api public
 *
 * @HTTP POST
 */

exports.add = function (req, res) {

    // Create new instance of 'People' model
    var person = new People({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        coolnessFactor: parseInt(req.body.coolnessFactor)
    });

    // Save the person and check for errors kind-of
    person.save(function(err, doc) {
        if (err) {
            console.log(c.red('Errors:') + err);
            res.send(err);
        } else {
            console.log(c.green('\nSuccessfully added new person.\n') + '\nFirst name: ' + doc.firstName + '\nLast name: ' + doc.lastName + '\nCoolness factor: ' + doc.coolnessFactor);
            res.json(doc);
        }
    });
};


/**
 * Get a user by id.
 *
 * @param {Int} id
 * @return Object
 *
 * @api private
 */

exports.get = function (req, res) {

    People.get(req.params.id).run().then(function(person) {
        res.json(person);
    });
};


/**
 * Delete a user by id
 * 
 * @api public
 *
 * @HTTP DELETE
 */

exports.delete = function (req, res) {

    People.get(req.params.id).delete().run().then(function(error, result) {
        res.json({
            error: error,
            result: result
        });
    });
};


/**
 * Update an existing user by id
 *
 * @api public
 *
 * @HTTP PUT
 */

exports.update = function (req, res) {

    // NOTE TO DUMB SELF: Use `x-www-url-formencoded` for put req's you idiot
    People.get(req.params.id).run().then(function(person) {

        // So &yet does this with Underscore's `_.extend` but it's more
        // readable with if statements IMHO. Obv here we're just checking
        // to see if the field is sent in the body of the req.
        if (req.body.firstName) {
            person.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            person.lastName = req.body.lastName;
        }
        if (req.body.coolnessFactor) {
            person.coolnessFactor = parseInt(req.body.coolnessFactor);
        }
        person.date = r.now();

        // Save the person and check for errors kind-of
        person.save(function(err, doc) {
            if (err) {
                res.send(err); 
            } else {
                res.json(doc); 
            }
        });
    });
};