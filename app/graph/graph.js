'use strict';

angular.module('graphAlgViz.graph', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/graph', {
    templateUrl: 'graph/graph.html',
    controller: 'GraphCtrl'
  });
}])

.controller('GraphCtrl', ['$scope', function($scope) {
    $scope.nodes = [{}, {}, {}, {}, {}];
    $scope.links = [
      {source: $scope.nodes[0], target: $scope.nodes[1]},
      {source: $scope.nodes[1], target: $scope.nodes[2]},
      {source: $scope.nodes[2], target: $scope.nodes[3]},
      {source: $scope.nodes[3], target: $scope.nodes[4]},
      {source: $scope.nodes[4], target: $scope.nodes[0]}
    ]
}]);