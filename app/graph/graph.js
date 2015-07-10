'use strict';

angular.module('graphAlgViz.graph', ['ngRoute', 'graphAlgViz.graph-generation'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/graph', {
      templateUrl: 'graph/graph.html',
      controller: 'GraphCtrl'
    });
  }])

  .controller('GraphCtrl', ['$scope', '$q', 'generator', function ($scope, $q, generator) {
    $scope.nodes = [];
    $scope.links = [];
    $scope.n = 50;
    $scope.p = 0.05;
    $scope.maxTrials = 1000;
    $scope.runningNumEdgesAvg = 0;
    $scope.runTrials = runTrials;

    var frameDuration = 50;
    var finalFrameDuration = 1000;
    console.log("n is: " + $scope.n);
    console.log("p is: " + $scope.p);

    function runTrials() {
      $scope.runningNumEdgesAvg = 0;
      var runningNumEdgesSum = 0;
      function updateNumEdgesAvg(numTrials) {
        runningNumEdgesSum += $scope.links.length;
        $scope.runningNumEdgesAvg = runningNumEdgesSum / numTrials;
      }
      function scheduleTrial(numTrials, lastTrialPromise) {
        return lastTrialPromise.then(function() {
          if (numTrials > 0) {
            updateNumEdgesAvg(numTrials);
          }
          return generator.generate($scope.nodes, $scope.links, $scope.n, $scope.p, frameDuration, finalFrameDuration);
        });
      }
      var deferred = $q.defer();
      var currentPromise = deferred.promise;
      for (var i = 0; i < $scope.maxTrials; i++) {
        currentPromise = scheduleTrial(i, currentPromise);
      }
      currentPromise.then(function() { updateNumEdgesAvg($scope.maxTrials); });
      deferred.resolve();
    }
  }]);