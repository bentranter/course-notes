'use strict';

/**
 * Module dependencies.
 */
var jwt = require('jwt-simple');

/**
 * Decodes a JSON web token.
 *
 * @param {Object} the request to our server
 * @return {Object} the decoded JSON web token
 * @api private
 */
exports.decode = function(req) {
  var token = (req.body && req.body.accessToken) || (req.query && req.query.accessToken) || req.headers['x-access-token'];
  var decoded = jwt.decode(token, 'mysecret');
  return decoded;
};