import { join, dirname } from 'path'
import fs from 'fs'

import { sync as symlinkSync } from 'symlink-or-copy'
import findConfigSync from 'find-config'
import { just, multicast } from 'most'
import create from '@most/create'

import { reduce, concat, append } from '../array'

// Creates most.js streams from many useful node.js fs functions

/**
 * exists :: string ➞ Stream<Stats> - Node FS
 *
 * Creates a Stream containing the output of fs.stat(pathname)
 *
 * #### Example
 * ```js
 * // The path exists
 * exists('/home/user/file.js').observe((pathname) ⇒ {
 *   console.log(pathname, ' exists!')
 * })
 *
 * // the path does not exists
 * exists('/home/user/someNonExistentFile.js').observe(f)
 *   .catch(err ⇒ { console.error(err) })
 *
 * // recovering from an error
 * exists('/home/user/someNonExistentFile.js')
 *   .recoverWith(err ⇒ {
 *     // replace the error with a new stream
 *     return just({ err })
 *   })
 * ```
 * @name exists
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
 * isDirectory :: string ➞ Stream<string> - Node FS
 *
 * Tests if an absolute path is a directory, returning the given pathname if it exists, erroring if it does not.
 *
 * #### Example
 * ```js
 * import { isDirectory } from '@northbrook/util'
 *
 * isDirectory('/home/usr/dir').observe(pathname ⇒ {
 *   console.log(pathname + ' is a directory')
 * })
 *
 * isDirectory('/somewhere/nonexistent').observe(neverCalled)
 *  .catch(err => { ... }) // do something with the error
 * ```
 *
 * @name isDirectory
 */
export function isDirectory (pathname) {
  return multicast(exists(pathname).map(stats => {
    if (stats.isDirectory()) return pathname
    else throw new Error(pathname + ' is not a directory')
  }))
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * isFile :: string ➞ Stream<string> - Node FS
 *
 * Returns a stream of the pathname, or an errored stream if it is not a file.
 *
 * #### Example
 * ```js
 * import { isFile } from '@northbrook/util'
 *
 * isFile('/path/to/package.json').map(pathname ⇒ { ... }) // do something knowing it is a file
 *
 * isFile('/path/to/nowhere').recoverWith(err ⇒ { ... }) // do something with errror
 * ```
 * @name isFile
 */
export function isFile (pathname) {
  return multicast(exists(pathname).map(stats => {
    if (stats.isFile()) return pathname
    else throw new Error(pathname + ' is not a file')
  }))
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * isLink :: string ➞ Stream<string> - Node FS
 *
 * Returns a stream of the pathname provided if the path is to a symbolic link.
 *
 * #### Example
 * ```js
 * import { isLink } from '@northbrook/util'
 *
 * isLink('path/to/link').map(pathname ⇒ { ... }) // do something knowing it is a link
 * ```
 * @name isLink
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

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * readFile :: string ➞ Stream<string> - Node FS
 *
 * Reads a file if it exists and returns the contents inside of a Stream
 *
 * #### Example
 * ```js
 * import { readFile } from '@northbrook/util'
 *
 * readFile('package.json').map(contents => { ... })
 * ```
 * @name readFile
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

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * writeFile :: string ➞ string ➞ Stream<string> - Node FS
 *
 * Write contents to a file returning a stream of the written contents if successful.
 *
 * #### Example
 * ```js
 * import { writeFile } from '@northbrook/util'
 *
 * writeFile('path/to/file', data).map(contents ⇒ { ... }) // file has been written
 * ```
 * @name writeFile
 */
export function writeFile (file, contents) {
  return multicast(create((add, end, error) => {
    fs.writeFile(file, contents, { encoding: 'utf8' }, function (err) {
      if (err) error(err)
      else add(contents); end(contents)
    })
  }))
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * symlink :: string ➞ string ➞ Stream<Object> - Node FS
 *
 * Creates a symlink from a given source to a given destination
 *
 * #### Example
 * ```js
 * import { symlink } from '@northbrook/util'
 *
 * symlink(source, destination).map(({ src, dest }) ⇒ { ... })
 * ```
 * @name symlink
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

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * findConfig :: string ➞ Stream<Object> - Node FS
 * findConfig :: string ➞ Object ➞ Stream<Object>
 *
 * Finds a configuration file
 *
 * #### Example
 * ```js
 * import { findConfig } from '@northbrook/util'
 *
 * findConfig('package.json').map(({ path, directory, config }) ⇒ { ... })
 * ```
 * @name findConfig
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

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * getAllInDirectory :: string ➞ [string] - Node FS
 * * getAllInDirectory :: string ➞ boolean ➞ [string]
 *
 * Gets all of the files in a given directory recursively checking inside of the subdirectories.
 *
 * #### Example
 * ```js
 * import { getAllInDirectory } from '@northbrook/util'
 *
 * getAllInDirectory('/home/user', false)  // ['file1', 'file2']
 * ```
 * @name getAllInDirectory
 */
export function getAllInDirectory (directory, recursive = true) {
  return reduce((files, file) => {
    const abspath = join(directory, file)

    if (fs.statSync(abspath).isFile()) {
      return append(file, files)
    }

    if (recursive && fs.statSync(abspath).isDirectory()) {
      return concat(files, getAllInDirectory(abspath, recursive))
    }

    return files
  }, [], fs.readdirSync(directory))
}
