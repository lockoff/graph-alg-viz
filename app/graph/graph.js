'use strict';

angular.module('graphAlgViz.graph', ['ngRoute', 'graphAlgViz.graph-generation'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/graph', {
      templateUrl: 'graph/graph.html',
      controller: 'GraphCtrl'
    });
  }])

  .controller('GraphCtrl', ['$scope', 'generator', function ($scope, generator) {
    $scope.nodes = [];
    $scope.links = [];
    $scope.n = 50;
    $scope.p = 0.03;

    var animationInterval = 10;
    console.log("n is: " + $scope.n);
    console.log("p is: " + $scope.p);
    function generate() {
      generator.generate($scope.nodes, $scope.links, $scope.n, $scope.p, animationInterval);
    }

    $scope.generateGraph = generate;
  }]);