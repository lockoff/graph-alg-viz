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
    $scope.trialSetSize = 10;
    $scope.cumulativeAvg = 0;
    $scope.runTrials = runTrials;
    $scope.frameDuration = 100;
    $scope.animationSpeeds = [
      {label: "Normal", value: 100},
      {label: "2X Speed", value: 50},
      {label: "4X Speed", value: 25}
    ];
    var averageHistory = [];
    var finalFrameDuration = 1000;

    function getExpectedNumEdges() {
      return (1 / 2) * $scope.n * ($scope.n - 1) * $scope.p;
    }

    function getStdDevNumEdges() {
      return Math.sqrt((1 / 2) * $scope.n * ($scope.n - 1) * $scope.p * (1 - $scope.p))
    }

    $scope.chartOptions = {
      useHighStocks: false,
      options: {
        chart: {
          type: 'spline',
          zoomType: 'x',
          width: 500,
          height: 500,
          marginRight: 65
        },
        legend: {
          enabled: false
        }
      },
      series: [
        {
          data: averageHistory
        }
      ],
      title: {
        text: 'Average Number of Edges Over Generated Graphs'
      },
      yAxis: {
        title: {
          text: "Average Number of Edges"
        },
        plotLines: [{
          color: 'red',
          width: 3,
          label: {
            align: "right",
            textAlign: "left"
          }
        }]
      },
      xAxis: {
        title: {
          text: "Number of Trials"
        },
        allowDecimals: false
      },
      loading: false
    };

    function onGenerationParamChange() {
      $scope.chartOptions.yAxis.min = getExpectedNumEdges() - 2 * getStdDevNumEdges();
      $scope.chartOptions.yAxis.max = getExpectedNumEdges() + 2 * getStdDevNumEdges();
      $scope.chartOptions.yAxis.plotLines[0].value = getExpectedNumEdges();
      $scope.chartOptions.yAxis.plotLines[0].label.text = "Expected<br>Value=<br>"
        + getExpectedNumEdges().toFixed(4);
      averageHistory.length = 0;
      $scope.cumulativeAvg = 0;
      $scope.nodes.length = 0;
      $scope.links.length = 0;
      setXAxisBounds();
    }

    function setXAxisBounds() {
      $scope.chartOptions.xAxis.min = 1;
      $scope.chartOptions.xAxis.max = averageHistory.length + $scope.trialSetSize;
    }

    function updateCumulativeAvg() {
      $scope.cumulativeAvg = ($scope.links.length + averageHistory.length * $scope.cumulativeAvg)
        / (averageHistory.length + 1);
      averageHistory.push({x: averageHistory.length + 1, y: $scope.cumulativeAvg});
    }

    onGenerationParamChange();
    $scope.$watch('n', onGenerationParamChange);
    $scope.$watch('p', onGenerationParamChange);
    $scope.$watch('trialSetSize', function () {
      if (averageHistory.length == 0) setXAxisBounds();
    });

    function runTrials() {
      setXAxisBounds();
      var deferred = $q.defer();
      var currentPromise = deferred.promise;
      for (var i = 0; i < $scope.trialSetSize; i++) {
        currentPromise = currentPromise.then(function () {
          return generator.generate($scope.nodes, $scope.links, $scope.n, $scope.p, $scope.frameDuration);
        }).then(function () {
          return updateCumulativeAvg();
        });
      }
      deferred.resolve();
    }
  }]);