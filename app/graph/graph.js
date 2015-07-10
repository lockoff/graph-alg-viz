'use strict';

angular.module('graphAlgViz.graph', ['ngRoute', 'nvd3', 'graphAlgViz.graph-generation'])

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

    function getExpectedNumEdges() {
      return (1/2) * $scope.n * ($scope.n - 1) * $scope.p;
    }
    $scope.chartOptions = {
      chart: {
        type: 'lineChart',
        height: 240,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        transitionDuration: 1,
        x: function(d){ return d.trial; },
        y: function(d){ return d.average; },
        useInteractiveGuideline: false,
        yAxis: {
          tickFormat: function(d){
            return d3.format('.01f')(d);
          }
        },
        yDomain: [getExpectedNumEdges() - 10, getExpectedNumEdges() + 10]
      }
    };
    var frameDuration = 10;
    var finalFrameDuration = 1000;

    $scope.averageHistory = [{values: [], key: 'Average Number of Edges Over Trials'}];

    function runTrials() {
      $scope.runningNumEdgesAvg = 0;
      var runningNumEdgesSum = 0;
      function updateNumEdgesAvg(numTrials) {
        runningNumEdgesSum += $scope.links.length;
        $scope.runningNumEdgesAvg = runningNumEdgesSum / numTrials;
        if ($scope.averageHistory[0].values.length > 10) $scope.averageHistory[0].values.shift();
        $scope.averageHistory[0].values.push({
          trial: numTrials,
          average: $scope.runningNumEdgesAvg
        });
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