import { join } from 'path'
import create from '@most/create'

import { filter, map, replace } from '../array'
import { split } from '../string'
import { isFile } from './fs'

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * filterScopes :: string ➞ string - Node Packages
 *
 * Removes a scope name from package name
 *
 * #### Example
 * ```js
 * import { filterScopes } from '@northbrook/util'
 *
 * filterScopes('@northbrook/util')  // 'util'
 * ```
 * @name filterScopes
 */
export const filterScopes = name => replace(/@[a-z]+\//g, '', name)

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * hasPkg :: string ➞ Stream<string> - Node Packages
 *
 * Returns a stream of the location to the package.json if it exists, or an errored stream if not.
 *
 * #### Example
 * ```js
 * import { hasPkg } from '@northbrook/util'
 *
 * hasPkg('/home/user/somePackage').map(pathToPackage ⇒ {...})
 * ```
 * @name hasPkg
 */
export const hasPkg = dir => isFile(join(dir, 'package.json'))

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * getPkg :: string ➞ Object - Node Packages
 *
 * Requires a package.json from a given directory.
 *
 * #### Example
 * ```js
 * import { getPkg } from '@northbrook/util'
 *
 * getPkg('/path/to/directory containing package.json')  // { name: 'package', ...}
 * ```
 * @name getPkg
 */
export const getPkg = dir => require(join(dir, 'package.json'))

/**
 * splitVersion ➞ string ➞ [number] - Node Packages
 *
 * Splits a semvar number in an array of 3 parts
 *
 * #### Example
 * ```js
 * import { splitVersion } from '@northbrook/util'
 *
 * splitVersion('1.2.3') // [1, 2, 3]
 * ```
 * @name splitVersion
 */
export function splitVersion (_version) {
  const version = filter(isNum, map(toNum, filter(notEmpty, split('.', _version))))

  if (version.length !== 3) {
    throw new Error(`${_version} passed is not a proper semantic version number`)
  }

  return version
}
const notEmpty = x => x !== ''
const isX = x => x === 'x'
const toNum = x => isX(x) && x || parseInt(x)
const isNum = x => isX(x) || !Number.isNaN(x)

/**
 * tryRequire :: string ➞ Stream<Object> - Node Packages
 * tryRequire :: string ➞ (object ➞ boolean) ➞ Stream<Object>
 *
 * Trys to require a package returning a stream of the required package. Optionally taking a predicate function to check if a property matches what you need to require.
 *
 * #### Example
 * ```js
 * import { tryRequire } from '@northbrook/util'
 *
 * tryRequire('northbrook').map(pkg ⇒ {...})
 * ```
 * @name tryRequire
 */
export function tryRequire (packageName, predicate) {
  return create((add, end, error) => {
    try {
      const pkg = require(packageName)
      if (typeof predicate === 'function' && !predicate(pkg)) {
        error()
      } else {
        add(pkg)
        end(pkg)
      }
    } catch (err) {
      error(err)
    }
  })
}
