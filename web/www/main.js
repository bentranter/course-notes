(function() {

  'use strict';

  var form = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    submit: document.getElementById('submit')
  };
  var formInfo = {
    invalid: document.getElementById('invalidFormData'),
    success: document.getElementById('signUpSuccessful'),
    close: document.getElementById('close')
  };
  var emailRe = /(.+)@(.+){2,}\.(.+){2,}/;

  // Event listener for dismissing alerts
  formInfo.close.addEventListener('click', function() {
    formInfo.invalid.classList.add('hide');
  });

  // Global to decide of we can submit the form and send the request or not.
  var formIsValid = false;



  // Handle form submission
  form.submit.addEventListener('click', function(e) {

    // Check to see if the hidden field was filled in
    if (form.name.value === null) {
      console.log('Not a bot signup.');
    }

    // Check to see if email is valid (lots of fake emails can get through, doesn't matter right now tho)
    if (emailRe.test(form.email.value)) {
      formIsValid = true;
    } else {
      formIsValid = false;
      console.error('Invalid email');
    }

    // Check if passwords match
    if (form.password.value !== form.confirmPassword.value) {
      formIsValid = false;
      console.error('Passwords don\'t match');
    }

    // Prevent the default sending behaviour
    e.preventDefault();

    // Check form validity
    if (formIsValid) {
      var req = ajax({
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://localhost:3000/api/signup',
        type: 'POST',
        data: 'username=' + form.email.value + '&password=' + form.password.value
      });
      req.then(function(data) {
        console.log(JSON.stringify(data) + ' succeeded.');
        formInfo.invalid.classList.add('hide');
        formInfo.success.classList.remove('hide');
      }, function(err) {
        console.log(JSON.stringify(err) + ' failed.');
      }); // if Promise is set

    } else {
      // Inform the user of the error
      formInfo.invalid.classList.remove('hide');
    }
  });



  /**
   * Same AJAX lib we use in Exsoskeleton
   */

  var ajax = (function() {
    var xmlRe = /^(?:application|text)\/xml/;
    var jsonRe = /^application\/json/;

    var getData = function(accepts, xhr) {
      if (accepts == null) accepts = xhr.getResponseHeader('content-type');
      if (xmlRe.test(accepts)) {
        return xhr.responseXML;
      } else if (jsonRe.test(accepts) && xhr.responseText !== '') {
        return JSON.parse(xhr.responseText);
      } else {
        return xhr.responseText;
      }
    };

    var isValid = function(xhr) {
      return (xhr.status >= 200 && xhr.status < 300) ||
        (xhr.status === 304) ||
        (xhr.status === 0 && window.location.protocol === 'file:')
    };

    var end = function(xhr, options, resolve, reject) {
      return function() {
        if (xhr.readyState !== 4) return;

        var status = xhr.status;
        var data = getData(options.headers && options.headers.Accept, xhr);

        // Check for validity.
        if (isValid(xhr)) {
          if (options.success) options.success(data);
          if (resolve) resolve(data);
        } else {
          var error = new Error('Server responded with a status of ' + status);
          if (options.error) options.error(xhr, status, error);
          if (reject) reject(xhr);
        }
      };
    };

    return function(options) {
      if (options == null) throw new Error('You must provide options');
      if (options.type == null) options.type = 'GET';

      var resolve, reject, xhr = new XMLHttpRequest();
      var PromiseFn = ajax.Promise || (typeof Promise !== 'undefined' && Promise);
      var promise = PromiseFn && new PromiseFn(function(res, rej) {
        resolve = res;
        reject = rej;
      });

      if (options.contentType) {
        if (options.headers == null) options.headers = {};
        options.headers['Content-Type'] = options.contentType;
      }

      if (options.type === 'GET' && typeof options.data === 'object') {
        var query = '';
        var stringifyKeyValuePair = function(key, value) {
          return value == null ? '' :
            '&' + encodeURIComponent(key) +
            '=' + encodeURIComponent(value);
        };
        for (var key in options.data) {
          query += stringifyKeyValuePair(key, options.data[key]);
        }

        if (query) {
          var sep = (options.url.indexOf('?') === -1) ? '?' : '&';
          options.url += sep + query.substring(1);
        }
      }

      xhr.addEventListener('readystatechange', end(xhr, options, resolve, reject));
      xhr.open(options.type, options.url, true);

      var allTypes = '*/'.concat('*');
      var xhrAccepts = {
        '*': allTypes,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      };
      xhr.setRequestHeader(
        'Accept',
        options.dataType && xhrAccepts[options.dataType] ?
          xhrAccepts[options.dataType] + (options.dataType !== '*' ? ', ' + allTypes + '; q=0.01' : '' ) :
          xhrAccepts['*']
      );

      if (options.headers) {
        for (var key in options.headers) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }
      if (options.beforeSend) {
        options.beforeSend(xhr);
      }
      xhr.send(options.data);

      return promise;
    };
  })();
  return ajax;

})();