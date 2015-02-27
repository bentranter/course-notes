'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http, $window) {

    /**
     * This our main controller, it controls pretty
     * much everything right now.
     */

      }).
  controller('NewCtrl', function($scope) {
    // write new logic here
  }).
  controller('ApiTest', function ($scope, $http) {

    // GET from /api/people
    $http({
      method: 'GET',
      url: 'http://localhost:3000/api/people'
    }).
    success(function(data, status, headers, config) {
      $scope.people = data;
    }).
    error(function(data, status, headers, config) {
      $scope.name = 'Error!';
    });
  }).
  controller('SidebarCtrl', function($scope, $http) {

    /**
     * @TODO: Setup sidebar
     */

  }).
  controller('LoginCtrl', function($scope, $http, $window) {

    $scope.username = '';
    $scope.password = '';

    $scope.test = function() {
      //
    };

    $scope.login = function() {

      $http.post('http://localhost:3000/api/login', {

        username: $scope.username,
        password: $scope.password

      }).success(function(data, status, headers, config) {

        // Save the token into Angular's session storage,
        // and send a success message to the UI
        $window.localStorage.setItem('token', data.token);
        $window.localStorage.setItem('username', $scope.username);
        $scope.message = 'Welcome, ' + $scope.username;
        console.log($window.localStorage.getItem('token'));

      }).error(function(data, status, headers, config) {

        console.log('Error :' + status);
        $scope.message = 'Sorry, we couldn\'t find anyone with the username ' + $scope.username +'. Would you like to sign up?';
      });
    };

  }).
  controller('NewNoteCtrl', function($scope, $http, $window) {

    $scope.test = function() {
      console.log($scope.title);
      console.log($scope.subtitle);
      console.log($scope.content);
      console.log($scope.folder);
    };

    $scope.save = function() {

      var config = {headers: {
          'x-access-token': $window.localStorage.getItem('token')
        }
      };

      $http.post('http://localhost:3000/api/notes', {
        
        title: $scope.title,
        subtitle: $scope.subtitle,
        content: $scope.content,
        author: $window.localStorage.getItem('username'),
        folder: $scope.folder

      }, config).success(function(data, status, headers, config) {

        console.log(data, status, headers, config);

      }).error(function(data, status, headers, config) {

        console.log('FUCK');
      });
    };

  });
