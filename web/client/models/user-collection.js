// User Collection - user-collection.js
var AmpCollection = require('ampersand-rest-collection');
var User = require('./user');


module.exports = AmpCollection.extend({
    model: User,
    url: '/api/user'
});