'use strict';

angular.module('graphAlgViz.force-layout.force-layout-directive', [])

  .directive('forceLayoutGraph', [function() {
    var link = function($scope, $el, $attrs) {
      $el.text("Hello world!")
    };
    return {
      template: '<div></div>',
      replace: true,
      link: link,
      restrict: 'E'
    };
  }]);
