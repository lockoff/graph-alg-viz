'use strict';

angular.module('graphAlgViz.graph', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/graph', {
    templateUrl: 'graph/graph.html',
    controller: 'GraphCtrl'
  });
}])

.controller('GraphCtrl', [function() {

}]);