'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

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

  });