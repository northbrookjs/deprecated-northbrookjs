import { join } from 'path'
import { just, combineArray } from 'most'

import { findConfig, writeFile } from '../node/fs'
import { tryRequire } from '../node/packages'
import { beautify, pluck, merge } from '../object'
import { map, filter, reduce } from '../array'
import { is } from '../function'

const NBCONFIG = 'northbrook.json'
const NBPREFIX = 'northbrook-'
const NBSCOPEPREFIX = '@northbrook/'

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * resolvePackage :: string ➞ Stream<Object>
 * resolvePackage :: string ➞ (object ➞ boolean) ➞ Stream<Object>
 *
 * Northbrook
 *
 * Trys to require a package that is related to northbrook. First trying to require the package prefixed by `@nortbrook`, secondly by requiring the package prefixed by `northbrook-` and, lastly by requiring the package name directory. This will return a stream of the required package if it is found.
 *
 * #### Example
 * ```js
 * import { resolvePackage } from '@northbrook/util'
 *
 * resolvePackage('util')  // Stream<@northbrook/util>
 * ```
 * @name resolvePackage
 */
export function resolvePackage (directory, predicate) {
  function get (name) {
    return tryRequire(name, predicate)
      .recoverWith(() => tryRequire(join(directory, name), predicate))
      .recoverWith(() => tryRequire(join(directory, 'node_modules', name), predicate))
  }

  return function resolve (name) {
    return get(name)
      .recoverWith(() => get(NBSCOPEPREFIX + name))
      .recoverWith(() => get(NBPREFIX))
      .recoverWith(() => ({}))
  }
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * resolveExtends :: string ➞ object ➞ Stream<object>
 *
 * Northbrook
 *
 * Taking the directory in which to look from, and an existing northbrook.json object, it will find any packages from the `extends` field, if it exists.
 * If it exists, it then return a Stream of the merged configurations, with the user defined configuration overriding an overlapping declarations.
 *
 * #### Example
 * ```js
 * import { resolveExtends } from '@northbrook/util'
 *
 * resolveExtends('/path/to/dir', northbrookConfig).map(({ packages }) => {...})
 * ```
 * @name resolveExtends
 */
export function resolveExtends (directory, config) {
  const extension = pluck('extends', config)
  if (!extension) return just(config)

  const resolve = resolvePackage(directory)

  if (is('string', extension)) {
    return resolve(extension, isConfig)
      .map((pkg) => merge(pkg.config, config))
      .recoverWith(() => just(config))
  } else if (Array.isArray(extension)) {
    return combineArray(Array, map(resolve, extension))
      .map(extensions => filter(isConfig, extensions))
      .map(extensions => {
        reduce((config, ext) => {
          return merge(config, ext)
        }, config, extensions)
      })
      .map(extendedConfig => merge(extendedConfig, config))
  }

  return just(config)
}
const isConfig = x => x && x.config || false

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * modifyConfig :: string ➞ object ➞ (object ➞ object) ➞ Stream<string>
 *
 * Northbrook
 *
 * Finds and modifies a configuration file.
 *
 * #### Example
 * ```js
 * import { modifyConfig } from '@northbrook/util'
 *
 * modifyConfig('northbrook.json', {}, (config => {
 *   ...
 *   return newConfig
 * })).map(newConfigContent => { ... })
 * ```
 * @name modifyConfig
 */
export function modifyConfig (configFile, options, callback) {
  return findConfig(configFile, options).map(function ({ path, directory, config }) {
    const newConfig = callback(config)

    if (!newConfig || !is('object', newConfig)) {
      throw new Error('callback did not return a new JSON object')
    }

    return writeFile(path, beautify(newConfig))
  })
  .switch()
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * addPlugin :: string ➞ object ➞ Stream<object>
 *
 * Northbrook
 *
 * Adds a plugin to a northbrook.json.
 *
 * #### Example
 * ```js
 * import { addPlugin } from '@northbrook/util'
 *
 * addPlugin('pluginName', {}).map(newConfigContents => {...})
 * ```
 * @name addPlugin
 */
export function addPlugin (pluginName, options) {
  return modifyConfig(NBCONFIG, options, function (config) {
    if (!config) {
      throw new Error('Cannot find a ' + NBCONFIG + ' to append to')
    }

    if (!pluginName) {
      return config
    }

    if (!Array.isArray(config.plugins)) config.plugins = []

    const plugins = config.plugins

    if (plugins.indexOf(pluginName) > -1) return config

    return Object.assign({}, config, {
      plugins: [...plugins, pluginName]
    })
  })
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * addPackage :: string ➞ object ➞ Stream<object>
 *
 * Northbrook
 *
 * Adds a package to a northbrook.json.
 *
 * #### Example
 * ```js
 * import { addPackage } from '@northbrook/util'
 *
 * addPackage('packageName', {}).map(newConfigContents => {...})
 * ```
 * @name addPackage
 */
export function addPackage (pathToPackage, options) {
  return modifyConfig(NBCONFIG, options, function (config) {
    if (!config) {
      throw new Error('Cannot find a ' + NBCONFIG + ' to append to')
    }

    if (!pathToPackage) { return config }

    if (!Array.isArray(config.packages)) { config.packages = [] }

    const packages = config.packages

    if (packages.indexOf(pathToPackage) > -1) return config

    return Object.assign({}, config, {
      packages: packages.concat([pathToPackage])
    })
  })
}
