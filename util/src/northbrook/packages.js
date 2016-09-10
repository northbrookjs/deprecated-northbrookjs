import { relative, join } from 'path'
import { just } from 'most'

import { merge } from '../object'
import { getAllInDirectory, hasPkg } from '../node/fs'
import { reduce, map, filter, concat, append } from '../array'

/**
 * Finds all of the packages
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

/**
 * filters for a single package
 */
export function onlyPackage (name, packages) {
  return filter(x => x === name, packages)
}
