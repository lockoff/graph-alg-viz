'use strict';

// Declare app level module which depends on views, and components
angular.module('graphAlgViz', [
  'ngRoute',
  'graphAlgViz.er-graph-gen',
  'graphAlgViz.version',
  'graphAlgViz.force-layout'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/er-graph-gen'});
}]);
