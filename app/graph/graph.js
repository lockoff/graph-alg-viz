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

    var n = 100;
    var p = 0.05;
    var animationInterval = 10;

    function generate() {
      generator.generate($scope.nodes, $scope.links, n, p, animationInterval);
    }

    $scope.generateGraph = generate;
  }]);