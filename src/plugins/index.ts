import { app } from 'reginn';
import { Plugin } from '../northbrook';

import commit = require('./commit');
import exec = require('./exec');
import link = require('./link');
import release = require('./release');

const plugin: Plugin = {
  plugin: app(
    commit.plugin,
    exec.plugin,
    link.plugin,
    release.plugin,
  ),
};

export = plugin;