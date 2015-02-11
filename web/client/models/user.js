// User Model - user.js
var AmpModel = require('ampersand-model');


module.exports = AmpModel.extend({
    props: {
        username: ['string'],
        password: ['string']
    }
});