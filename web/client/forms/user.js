var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');


module.exports = FormView.extend({
    fields: function () {
        return [
            new InputView({
                label: 'Username',
                name: 'username',
                value: this.model.username || '',
                required: false,
                placeholder: 'Username',
                parent: this
            }),
            new InputView({
                label: 'Password',
                name: 'password',
                value: this.model.password || '',
                required: false,
                placeholder: 'Password',
                parent: this
            })
        ];
    }
});