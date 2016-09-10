import { just, combineArray } from 'most'

import { resolvePackage } from './config'
import { filter, contains, map } from '../array'
import { pluck, merge } from '../object'

/**
 * returns if something is a plugin
 */
export function isPlugin (x) {
  return x && typeof x === 'object' && typeof x.plugin === 'function'
}

/**
 * filters out plugins that are to be ignored
 */
export function filterDefaultPlugins (defaults, config) {
  return config && config.ignoreDefaults && Array.isArray(config.ignoreDefaults)
    ? filter(plugin => !contains(plugin.name, config.ignoreDefaults), config.plugins)
    : defaults
}

export function resolvePlugins (directory, config) {
  const plugins = pluck('plugins', config)
  if (!plugins) return just(merge(config, { plugins: [] }))

  const resolve = resolvePackage(directory)

  const packages = map(resolve, plugins)

  return combineArray(Array, packages)
    .map(pkgs => map(toPlugin, filter(isPlugin, pkgs)))
    .map(plugins => merge(config, { plugins }))
}

const toPlugin = pkg => pkg.plugin
