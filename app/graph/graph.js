'use strict';

angular.module('graphAlgViz.graph', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/graph', {
    templateUrl: 'graph/graph.html',
    controller: 'GraphCtrl'
  });
}])

.controller('GraphCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.nodes = [];
    $scope.links = [];
    $scope.numEdges = 0;

    var n = 100;
    var p = 0.05;
    var speedMillis = 100;
    $scope.generateGraph = function() {
      $scope.nodes.length = 0;
      $scope.links.length = 0;
      $scope.numEdges = 0;

      console.log("Generating graph...");
      // Add unlinked nodes to graph.
      for (var i = 0; i < n; i++) {
        $scope.nodes.push({});
      }
      console.log("Finished generating nodes...");
      console.log("Generating links...");
      function generateLink(i, j, numEdgesUpdate) {
        return function() {
          $scope.links.push({source: $scope.nodes[i], target: $scope.nodes[j]});
          $scope.numEdges = numEdgesUpdate;
        }
      }
      var localNumEdges = 0;
      for (var i = 0; i < n; i++) {
        for (var j = i+1; j < n; j++) {
          if (Math.random() < p) {
            localNumEdges += 1;
            $timeout(generateLink(i,j, localNumEdges), speedMillis * localNumEdges);
          }
        }
      }
      console.log("Done generating links.");
    }
}]);