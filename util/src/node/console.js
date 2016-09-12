import { EOL } from 'os'
import chalk from 'chalk'

import figures from 'figures'

/**
 * * figures :: Object
 * Console
 *
 * An object containing unicode charaters for common symbols.
 * Visit [figures github page](https://github.com/sindresorhus/figures#figures) to see what figures are present
 *
 * @name figures
 */
export { figures }

/**
 * colors :: Object
 * Console
 *
 * An object containing many funtions to create colors inside of the console.
 * Visit [chalk's github for more info](https://github.com/chalk/chalk) on what is present.
 *
 * @name colors
 */
export { chalk as colors }

/**
 * Console
 * log :: [...string] ➞ void
 *
 * Prints to stdout with UTF-8 encoding and adds 4 space indentation to all newlines
 *
 * #### Example
 * ```js
 * log('Hello', 'world')
 * // console will output 'Hello world'
 * ```
 * @name log
 */
export function log (...args) {
  if (args.length > 0) {
    process.stdout.write(args.map(modOutput).join(' ') + EOL, { encoding: 'UTF-8' })
  } else {
    process.stdout.write(EOL, { encoding: 'UTF-8' })
  }
}

/**
 * modOutput :: string ➞ string
 * String / Console
 *
 * Adds an indent of 4 spaces to all new lines
 *
 * #### Example
 * ```js
 * const x = modOutput('\nhi')
 * // x = '\n    hi'
 * ```
 * @name modOutput
 * @type Node - Console
 */
export function modOutput (output) {
  return output && output.replace && output.replace(EOL, EOL + '    ') || output
}

/**
 * separator :: () ➞ string
 * String / Console
 * separator :: string ➞ string
 *
 * Returns 80 character wide string used to log a separation between outputs
 *
 * #### Example:
 * ```js
 * log(separator('hello'))
 * // '##----------------------------------hello------------------------------------##'
 *```
 * @name separator
 */
export function separator (packageName) {
  let length = typeof packageName === 'string'
    ? Math.round((76 - packageName.length) / 2)
    : 76 / 2

  if (packageName && packageName.length % 2 !== 0) {
    length = length - 1
  }

  const arr = Array(length)
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = '-'
  }
  const dashes = arr.join('')

  let output = packageName && packageName.length % 2 === 0 && packageName ||
               packageName && packageName + '-' || ''

  return (`${EOL}##` + chalk.white(`${dashes}`) + `${output}` + chalk.white(`${dashes}`) + `##${EOL}`)
}

/**
 * clear :: () ➞ void
 * Console
 *
 * Clears the console
 *
 * #### Example
 * ```js
 * import { clear } from '@northbrook/util'
 * clear()
 * ```
 * @name clear
 */
export function clear () {
  console.log('\x1Bc')
}
