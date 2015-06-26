'use strict';

angular.module('graphAlgViz.version', [
  'graphAlgViz.version.interpolate-filter',
  'graphAlgViz.version.version-directive'
])

.value('version', '0.1');
