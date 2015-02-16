 'use strict';

$.ajax({
  type: "POST",
  url: 'http://192.168.105.245:3000/api/login',
  data: 'username=Test1000&password=Test1000',
  success: function(res) {
    console.log('Success! Token is: ' + res.token);
    localStorage.setItem('token', res.token);
    }
});

setTimeout(function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/api/people',
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('X-Access-Token', localStorage.getItem('token'));
      },
      success: function(res) {
        console.log('Success! ' + res);
        }
    });
}, 3000);