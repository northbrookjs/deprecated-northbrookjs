import { join } from 'path'
import create from '@most/create'

import { filter, map, replace } from '../array'
import { split } from '../string'
import { isFile } from './fs'

/**
 * Removes any scopes from a node.js package name
 */
export const filterScopes = name => replace(/@[a-z]+\//g, '', name)

/**
 * Returns true if a directory contains a package.json file
 */
export const hasPkg = dir => isFile(join(dir, 'package.json'))

export const getPkg = dir => require(join(dir, 'package.json'))

/**
 * Splits a semvar number in an array of 3 parts
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
 * Trys to require a package
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
