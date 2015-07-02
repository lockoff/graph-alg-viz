'use strict';

angular.module('graphAlgViz.force-layout.force-layout-directive', [])

  .directive('forceLayoutGraph', [function() {
    var link = function($scope, $el, $attrs) {
      var sideLength = 500; // Contain graph in a square.

      var forceLayout = d3.layout.force()
        .size([sideLength, sideLength])
        .nodes($scope.nodes)
        .links($scope.links)
        .linkDistance(100)
        .charge(-60)
        .on("tick", tick);

      var svgSelection = d3.select($el[0])
        .append("svg")
        .attr({width: sideLength, height: sideLength})
        .attr("viewBox", "0 0 " + sideLength + " " + sideLength);

      var nodeSelection = svgSelection.selectAll(".node");
      var linkSelection = svgSelection.selectAll(".link");

      function tick() {
        linkSelection.attr("x1", function (d) { return d.source.x; });
        linkSelection.attr("y1", function (d) { return d.source.y; });
        linkSelection.attr("x2", function (d) { return d.target.x; });
        linkSelection.attr("y2", function (d) { return d.target.y; });

        nodeSelection.attr("cx", function(d) { return d.x; });
        nodeSelection.attr("cy", function(d) { return d.y; })
      }

      function update() {
        console.log("Update has been called...");
        linkSelection = linkSelection.data($scope.links);
        linkSelection
          .enter()
          .insert("line", ".node")
          .attr("class", "link");
        linkSelection
          .exit()
          .remove();

        nodeSelection = nodeSelection.data($scope.nodes);
        nodeSelection
          .enter()
          .insert("circle")
          .attr("class", "node")
          .attr("r", 5)
          .call(forceLayout.drag);
        nodeSelection
          .exit()
          .remove();

        forceLayout.start();
      }

      $scope.$watchCollection('nodes', update);
      $scope.$watchCollection('links', update);
    };

    return {
      template: '<div></div>',
      replace: true,
      link: link,
      restrict: 'E'
    };
  }]);
