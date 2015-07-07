'use strict';

angular.module('graphAlgViz.graph-generation', [])

  .factory('generator', ['$timeout', function ($timeout) {
    return {
      generate: generate
    };

    function generate(nodes, links, n, p, animationInterval) {
      nodes.length = 0;
      links.length = 0;

      // Add unlinked nodes to graph.
      for (var i = 0; i < n; i++) {
        nodes.push({});
      }
      function generateLink(i, j) {
        return function () {
          links.push({source: nodes[i], target: nodes[j]});
        }
      }

      var numEdges = 0;
      for (var i = 0; i < n; i++) {
        for (var j = i + 1; j < n; j++) {
          if (Math.random() < p) {
            numEdges += 1;
            $timeout(generateLink(i, j), animationInterval * numEdges);
          }
        }
      }
      console.log("Done generating links.");
    }
  }]);
