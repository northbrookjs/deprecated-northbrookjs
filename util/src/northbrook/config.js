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

/**
 * Base function for resolving different packages and plugins
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

/**
 * Resolves the extends field of a northbrook.json
 * And merges configurations together
 */
export function resolveExtends (directory, config) {
  const extension = pluck('extends', config)
  if (!extension) return just(config)

  const resolve = resolvePackage(directory)

  if (is('string', extension)) {
    return resolve(extension, isConfig)
      .tap(x => console.log(x))
      .map((pkg) => merge(config, pkg.config))
      .recoverWith(() => just(config))
  } else if (Array.isArray(extension)) {
    return combineArray(Array, map(resolve, extension))
      .map(extensions => filter(isConfig, extensions))
      .map(extensions => {
        reduce((config, ext) => {
          return merge(config, ext)
        }, config, extensions)
      })
  }

  return just(config)
}
const isConfig = x => x && x.config || false

/**
 * Finds and modifiess a configuration file
 */
export function modifyConfig (configFile, options = { home: false }, callback) {
  return findConfig(configFile, options).map(function ({ path, directory, config }) {
    const newConfig = callback(config)

    if (!newConfig || !is('object', newConfig)) {
      throw new Error('callback did not return a new JSON object')
    }

    return writeFile(path, beautify(newConfig))
  })
  .switch()
}

/**
 * Finds and adds a plugin to the plugins field in a northbrook.json
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

/**
 * Finds and adds a pacage to the packages field in a northbrook.json
 */
export function addPackage (pathToPackage, options) {
  return modifyConfig(NBCONFIG, options, function (config) {
    if (!config) {
      throw new Error('Cannot find a ' + NBCONFIG + ' to append to')
    }

    if (!pathToPackage) return config

    if (!Array.isArray(config.packages)) config.packages = []

    const packages = config.packages

    if (packages.indexOf(pathToPackage) > -1) return config

    return Object.assign({}, config, {
      packages: [...packages, pathToPackage]
    })
  })
}
