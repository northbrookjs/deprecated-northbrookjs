/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * split :: string ➞ string ➞ [string]
 *
 * String
 *
 * Splits a string at a given point
 *
 * #### Example
 * ```js
 * import { split } from '@northbrook/util'
 *
 * split('x', 'helxlo')  // ['hel', 'lo']
 * ```
 * @name split
 */
export function split (where, str) {
  return str.split(where)
}

/**
 * trim :: string ➞ string
 *
 * String
 *
 * Trims any trailing whitespaces of a string
 *
 * #### Example
 * ```js
 * import { trim } from '@northbrook/util'
 *
 * trim('  hello  ') // 'hello'
 * ```
 * @name trim
 */
export function trim (str) {
  return str.trim()
}
