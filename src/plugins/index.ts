import { app } from 'reginn';
import { Plugin } from '../northbrook';

import { plugin as commit } from './commit';
import { plugin as exec } from './exec';
import { plugin as link } from './link';
import { plugin as release } from './release';

const plugin: Plugin = {
  plugin: app(commit, exec, link, release),
};

export = plugin;