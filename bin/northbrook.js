#!/usr/bin/env node

var EOL = require('os').EOL;

(function (northbrook) {
  var config = northbrook.findNorthbrookConfig();

  var path = config.path;
  var nbConfig = config.config;

  if (!path || !nbConfig)
    return;

  var start = northbrook.northbrook(nbConfig, [], path).start;

  start(process.argv.slice(2));
})(require('../lib'));