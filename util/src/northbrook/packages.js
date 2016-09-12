import { relative, join } from 'path'
import { just } from 'most'

import { merge } from '../object'
import { getAllInDirectory, hasPkg } from '../node/fs'
import { reduce, map, filter, concat, append } from '../array'

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * resolvePackages :: string ➞ object ➞ Stream<Object>
 *
 * Northbrook
 *
 * Taking a directory to work from and a northbrook config object returns a new config file with `packages: ["."]` if no packages are present in the config, or finds all packages that are in the config object if there is a `/**` wildcard folder present. Retuns a stream of the new config object.
 *
 * #### Example
 * ```js
 * import { resolvePackages } from '@northbrook/util'
 *
 * resolvePackages('/path/to/dir', northbrookConfig).map(config => {...})
 * ```
 * @name resolvePackages ::
 */
export function resolvePackages (directory, config) {
  const toRelative = name => relative(directory, name)

  if (!config) return just({})
  if (!Array.isArray(config.packages)) {
    return just(merge(config, { packages: ['.'] }))
  }

  const packages = reduce((packages, name) => {
    if (name.endsWith('**')) {
      const packageDir = join(directory, name.replace('**', ''))
      const files = map(toRelative, filter(hasPkg, getAllInDirectory(packageDir)))
      return concat(packages, files)
    }
    return append(name, packages)
  }, [], config.packages)

  return just(merge(config, { packages }))
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * onlyPackage :: string ➞ [string] ➞ [string]
 *
 * Northbrook
 *
 * Filters out a package for when only 1 package should be matched.
 * Very useful with command that have an `--only <packageName>` option.
 *
 * #### Example
 * ```js
 * import { onlyPackage } from '@northbrook/util'
 *
 * onlyPackage('packageToMatchName', config.packages)
 * ```
 * @name onlyPackage
 */
export function onlyPackage (name, packages) {
  return filter(x => x === name, packages)
}
