import { join, dirname } from 'path'
import fs from 'fs'

import { sync as symlinkSync } from 'symlink-or-copy'
import findConfigSync from 'find-config'
import { just, multicast } from 'most'
import create from '@most/create'

import { reduce, concat, append } from '../array'

// Creates most.js streams from many useful node.js fs functions

/**
 * tests if an absolute path exists
 */
export function exists (pathname) {
  return multicast(create((add, end, error) => {
    fs.stat(pathname, function (err, stats) {
      if (err) error(err); else {
        add(stats)
        end(stats)
      }
    })
  }))
}

/**
 * tests if an absolute path is a directory
 */
export function isDirectory (pathname) {
  return multicast(exists(pathname).map(stats => {
    if (stats.isDirectory()) return pathname
    else throw new Error(pathname + ' is not a directory')
  }))
}

/**
 * tests if an absolute path is a file
 */
export function isFile (pathname) {
  return multicast(exists(pathname).map(stats => {
    if (stats.isFile()) return pathname
    else throw new Error(pathname + ' is not a file')
  }))
}

/**
 * tests if an absolute path is a symbolic link
 */
export function isLink (pathname) {
  return multicast(create((add, end, error) => {
    fs.lstat(pathname, function (err, stats) {
      if (err) error(err)
      if (stats.isSymbolicLink()) {
        add(pathname)
        end(pathname)
      } else {
        error(pathname + ' is not a symbolic link')
      }
    })
  }))
}

/**
 * Reads a file
 */
export function readFile (file) {
  return multicast(create((add, end, error) => {
    fs.readFile(file, 'utf8', function (err, contents) {
      if (err) {
        throw err
      } else {
        add(contents)
        end(contents)
      }
    })
  }))
}

/**
 * Writes a file
 */
export function writeFile (file, contents) {
  return multicast(create((add, end, error) => {
    fs.writeFile(file, contents, { encoding: 'utf8' }, function (err) {
      if (err) error(err)
      else add(contents); end(contents)
    })
  }))
}

/**
 * Creates a symlink or falls back to copying if on Windows
 */
export function symlink (src, dest) {
  return multicast(create((add, end, error) => {
    try {
      symlinkSync(src, dest)
      add({ src, dest })
      end({ src, dest })
    } catch (err) {
      error({ src, dest, err })
    }
  }))
}

/**
 * Finds a configuration file
 */
export function findConfig (file, options) {
  const json = options && options.json || true
  const path = findConfigSync(file, options)

  return isFile(path).map(() => {
    const directory = dirname(path)

    return readFile(path)
      .map((contents) => json ? JSON.parse(contents) : contents)
      .map(config => ({ path, directory, config }))
  })
  .switch()
  .recoverWith(() => just(({ path: null, directory: null, config: null })))
  .thru(multicast)
}

// synchronous functions

/**
 * Gets all files in a directory and subdirectories
 */
export function getAllInDirectory (directory, recursive = true) {
  return reduce((files, file) => {
    const abspath = join(directory, file)

    if (fs.statSync(abspath).isFile()) {
      return append(file, files)
    }

    if (recursive && isDirectory(abspath)) {
      return concat(files, getAllInDirectory(abspath, recursive))
    }

    return files
  }, [], fs.readdirSync(directory))
}
