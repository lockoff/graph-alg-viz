'use strict';

// Declare app level module which depends on views, and components
angular.module('graphAlgViz', [
  'ngRoute',
  'graphAlgViz.graph',
  'graphAlgViz.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/graph'});
}]);
