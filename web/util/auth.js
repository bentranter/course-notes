'use strict';

/**
* Module dependencies
*/
var jwt = require('jwt-simple');
var c = require('chalk');

/**
 * Authorizes a request by ensuring there is a valid 
 * JSON web token.
 *
 * @param {Object} the request sent to our server
 * @param {Object} the response sent back to the client
 * @param {Function} move to the next function to be called
 * @api private
 */
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

      var message = err + '. This means that the token does not match the one given to you when you logged in. Are you trying to hack us? ;)';
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