#!/usr/bin/env node

var EOL = require('os').EOL;
var join = require('path').join;
var dirname = require('path').dirname;

(function (northbrook) {
  var config;
  var index = process.argv.indexOf('--config');

  if (index === -1)
    index = process.argv.indexOf('-c');

  if (index > 0) {
    var configPath = join(process.cwd(), process.argv[index + 1]);

    if (configPath.endsWith('.ts'))
      require('ts-node/register');

    config = { path: process.cwd(), config: require(configPath) };
  } else {
    config = northbrook.findNorthbrookConfig();
  }

  var path = config.path;
  var nbConfig = config.config;

  if (!path || !nbConfig)
    return;

  var start = northbrook.northbrook(nbConfig, [], path).start;

  start(process.argv.slice(2));
})(require('../northbrook'));