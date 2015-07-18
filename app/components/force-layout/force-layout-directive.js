'use strict';

angular.module('graphAlgViz.force-layout.force-layout-directive', [])

  .directive('forceLayoutGraph', [function() {
    /*
     * Validates that an attributes object has properties specifying for width, height, nodes,
     * and links required for a force layout.
     */
    function validateAttributes(attrs) {
      if (!attrs.width || !attrs.height) {
        throw "You must specify a width and a height for the graph."
      }
      if (!attrs.nodes || !attrs.links) {
        throw "You must specify the scope attributes containing nodes and links data."
      }
    }
    /*
     * Gets a new force layout initialized to use a collection of nodes and links, whose options
     * are configured with the specified attributes.
     */
    function getForceLayout(attrs, nodesData, linksData, tickFn) {
      var forceLayout = d3.layout.force()
        .on("tick", tickFn)
        .size([attrs.width, attrs.height])
        .nodes(nodesData)
        .links(linksData);
      function setAttribute(attributeName) {
        if (attrs[attributeName]) forceLayout[attributeName](attrs[attributeName]);
      }

      setAttribute("linkDistance");
      setAttribute("charge");
      setAttribute("theta");
      setAttribute("friction");
      return forceLayout;
    }

    var link = function($scope, $el, $attrs) {
      validateAttributes($attrs);
      var nodesData = $scope[$attrs.nodes];
      var linksData = $scope[$attrs.links];
      var forceLayout = getForceLayout($attrs, nodesData, linksData, tick);

      angular.element($el[0]).attr("style",
        "width: " + $attrs.width + "px; height: " + $attrs.height + "px;");
      var svgSelection = d3.select($el[0])
        .append("svg")
        .attr({width: $attrs.width, height: $attrs.height})
        .attr("viewBox", "0 0 " + $attrs.width + " " + $attrs.height)
        .attr("style", "margin: 0px auto;");

      var nodeSelection = svgSelection.selectAll(".node");
      var linkSelection = svgSelection.selectAll(".link");

      /**
       * Update any nodes or links in the SVG with coordinates matching those assigned by the
       * force layout. Called on each tick of the force layout simulation.
       */
      function tick() {
        linkSelection.attr("x1", function (d) { return d.source.x; });
        linkSelection.attr("y1", function (d) { return d.source.y; });
        linkSelection.attr("x2", function (d) { return d.target.x; });
        linkSelection.attr("y2", function (d) { return d.target.y; });

        nodeSelection.attr("cx", function(d) { return d.x; });
        nodeSelection.attr("cy", function(d) { return d.y; })
      }

      /*
       * Updates the SVG containing the graph with any new nodes or links that have joined the
       * graph.
       */
      function updateLinks() {
        linkSelection = linkSelection.data(linksData);
        linkSelection
          .enter()
          .insert("line", ".node")
          .attr("class", "link");
        linkSelection
          .exit()
          .remove();
        forceLayout.start();
      }

      function updateNodes() {
        nodeSelection = nodeSelection.data(nodesData);
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

      $scope.$watchCollection('nodes', updateNodes);
      $scope.$watchCollection('links', updateLinks);
    };

    return {
      template: '<div></div>',
      replace: true,
      link: link,
      restrict: 'E'
    };
  }]);
