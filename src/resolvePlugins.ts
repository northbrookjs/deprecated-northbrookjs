import { EOL } from 'os';
import { join, relative } from 'path';
import { readdirSync, statSync, Stats } from 'fs';
import { filter, flatten, map, reduce, concat } from 'ramda';
import { Plugin } from './types';
import { tryRequire } from './tryRequire';

// finds all require()-able plugins
export function resolvePlugins(
  plugins: Array<string>,
  cwd: string = process.cwd(),
  stderr: NodeJS.WritableStream = process.stdout): Array<Plugin>
{
  require('ts-node/register'); // allow writing local plugins in TypeScript
  return filter(Boolean, flatten(map(resolvePlugin(cwd, stderr), plugins)));
}

const NORTHBROOK_PREFIXES = ['', '@northbrook/', 'northbrook-'];

function resolvePlugin(cwd: string, stderr: NodeJS.WritableStream) {
  return function (pluginName: string) {
    let plugin = tryRequire(join(cwd, pluginName));

    if (isPlugin(plugin)) return plugin;

    for (let i = 0; i < NORTHBROOK_PREFIXES.length; ++i) {
      plugin = tryRequire(NORTHBROOK_PREFIXES[i] + pluginName);

      if (isPlugin(plugin))
        return plugin;
    }

    stderr.write(`Could not resolve plugin: ${pluginName}` + EOL);

    return null;
  };
}

function isPlugin(plugin: any): boolean {
  if (!plugin || !plugin.plugin) return false;

  const { type } = plugin.plugin;

  if (type === 'command' || type === 'app') return true;

  return false;
}