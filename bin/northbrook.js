#!/usr/bin/env node

var EOL = require('os').EOL;
var join = require('path').join;
var dirname = require('path').dirname;

(function (northbrook, argv) {
  var config;
  var index = argv.indexOf('--config');

  if (index === -1)
    index = argv.indexOf('-c');

  if (index >= 0) {
    var configPath = join(process.cwd(), argv[index + 1]);

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

  const debug = argv.indexOf('--debug') > -1 || argv.indexOf('-d') > -1;

  var start = northbrook.northbrook(nbConfig, [], path, {}, debug).start;

  start(argv);
})(require('../northbrook'), process.argv.slice(2));