'use strict';

angular.module('graphAlgViz.graph-generation', [])
  .factory('generator', ['$timeout', '$q', function ($timeout, $q) {
    return {
      generate: generate
    };

    function generate(nodes, links, n, p, frameDuration) {
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
      var animationPromises = [];
      for (var i = 0; i < n; i++) {
        for (var j = i + 1; j < n; j++) {
          if (Math.random() < p) {
            numEdges += 1;
            animationPromises.push($timeout(generateLink(i, j), frameDuration * numEdges));
          }
        }
      }
      animationPromises.push($timeout(function() {}, frameDuration * numEdges + (frameDuration * 20)));
      return $q.all(animationPromises);
    }
  }]);

