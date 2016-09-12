import { just, combineArray } from 'most'

import { resolvePackage } from './config'
import { filter, contains, map } from '../array'
import { pluck, merge } from '../object'

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * isPlugin :: ⭑ ➞ boolean
 *
 * Northbrook
 *
 * Given an object it tells you whether or not it is a northbrook plugin object.
 *
 * #### Example
 * ```js
 * import { isPlugin } from '@northbrook/util'
 *
 * isPlugin({ plugin: (program, config, dir) => {...} })  // true
 * ```
 * @name isPlugin
 */
export function isPlugin (x) {
  return x && typeof x === 'object' && typeof x.plugin === 'function'
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * filterDefaultPlugins :: [string] ➞ object ➞ object
 *
 * Northbrook
 *
 * Given an array of defaults and a configuration object it
 * will filter any default object that should be ignored returning
 * a new configuration object without those defaults.
 *
 * #### Example
 * ```js
 * import { filterDefaultPlugins } from '@northbrook/util'
 *
 * filterDefaultPlugins(defaults, config)  // newConfig
 * ```
 * @name filterDefaultPlugins
 */
export function filterDefaultPlugins (defaults, config) {
  return config && config.ignoreDefaults && Array.isArray(config.ignoreDefaults)
    ? filter(plugin => !contains(plugin.name, config.ignoreDefaults), config.plugins)
    : defaults
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * resolvePlugins :: string ➞ object ➞ Stream<Object>
 *
 * Northbrook
 *
 * Taking a directory to work from and a northbrook config object returning a new config file with all the plugins it could find.
 *
 * #### Example
 * ```js
 * import { resolvePlugins } from '@northbrook/util'
 *
 * resolvePlugins('/path/to/dir', northbrookConfig).map(config => {...})
 * ```
 * @name resolvePlugins ::
 */
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
