var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
      // Might want an email in here
        id: 'any',
        username: ['string', true, ''],
        password: ['string', true, '']
    },
    session: {
        signedIn: ['boolean', true, false],
    }
});