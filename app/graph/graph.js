'use strict';

angular.module('graphAlgViz.graph', ['ngRoute', 'highcharts-ng', 'graphAlgViz.graph-generation'])

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

    var averageHistory = [61];
    function getExpectedNumEdges() {
      return (1/2) * $scope.n * ($scope.n - 1) * $scope.p;
    }
    $scope.chartOptions = {
      useHighStocks: false,
      options: {
        chart: {
          type: 'spline',
          zoomType: 'x'
        }
      },
      series: [{data: averageHistory}],
      title: {
        text: 'Average Number of Edges Over Trials'
      },
      yAxis: {
        min: 50,
        max: 70
      },
      loading: false
    };
    var frameDuration = 10;
    var finalFrameDuration = 1000;


    function runTrials() {
      $scope.runningNumEdgesAvg = 0;
      var runningNumEdgesSum = 0;
      function updateNumEdgesAvg(numTrials) {
        runningNumEdgesSum += $scope.links.length;
        $scope.runningNumEdgesAvg = runningNumEdgesSum / numTrials;
        averageHistory.push($scope.runningNumEdgesAvg);
        //if (averageHistory.length > 10) averageHistory.shift();
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