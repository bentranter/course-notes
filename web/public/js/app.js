'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/new', {
      templateUrl: 'partials/new',
      controller: 'NewCtrl'
    }).
    otherwise({
      redirectTo: '/new'
    });

  $locationProvider.html5Mode(true);
});

/**
 * WHOA -- Battery API. Chrome only.
 */
navigator.getBattery().then(function(result) {
  console.log(result);
});
