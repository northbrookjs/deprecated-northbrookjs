import jsonbeautify from 'json-beautify'

import { reduce, map, isArrayLike, each, contains, concat } from './array'
import { is } from './function'

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * beautify :: object ➞ string
 *
 * Object
 *
 * Takes a JavaScript Object and returns a beautified string representation.
 *
 * #### Example
 * ```js
 * import { beautify } from '@northbrook/util'
 *
 * beautify({ a: 1}) // '{ "a": "1"}'
 * ```
 * @name beautify
 */
export const beautify = obj => jsonbeautify(obj, null, 2, 80)

/**
 * * pluck :: string ➞ object ➞ ⭑
 * * pluck :: [string] ➞ object ➞ ⭑
 *
 * Object
 *
 * Find a property in an object
 *
 * #### Example
 *```js
 * import { pluck } from '@nortbrook/util'
 *
 * pluck('foo', { foo: 'bar' }) // 'bar'
 * pluck(['foo', 'bar'], { foo: { bar: 1 } }) // 1
 *```
 * @name pluck
 */
export function pluck (props, obj) {
  if (!obj) return null

  if (typeof props === 'string') {
    return obj[props]
  } else if (props.length === 0) {
    return obj[props[0]]
  }

  const l = props.length
  let r = obj

  for (let i = 0; i < l; ++i) {
    r = r[props[i]] || null
  }

  return r
}

/**
 * * propEq :: string ➞ a ➞ object ➞ boolean
 * * propEq :: [string] ➞ a ➞ object ➞ boolean
 *
 *  Object
 *
 * Checks equality of a object property and x
 *
 * #### Example
 * ```js
 * import { propEq } from '@northbrook/util'
 *
 * propEq('foo', 'bar', { foo: 'bar' }) // true
 * ```
 * @name propEq
 */
export function propEq (props, x, obj) {
  return is(x, pluck(props, obj))
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * propOr :: string ➞ ⭑ ➞ ⭑
 * * propOr :: [string] ➞ ⭑ ➞ ⭑
 *
 * Object
 *
 * Finds a property on an object or returns a defined value.
 *
 * #### Example
 * ```js
 * import { propOr } from '@northbrook/util'
 *
 * propOr('foo', 3, { foo: 'bar'})  // 'bar'
 * propOr('foo', 3, {}) // 3
 * ```
 * @name propOr
 */
export function propOr (props, or, obj) {
  if (!obj) return or

  if (typeof props === 'string') {
    return obj[props] || or
  } else if (props.length === 0) {
    return obj[props[0]] || or
  }

  const l = props.length
  let r = obj

  for (let i = 0; i < l; ++i) {
    r = r[props[i]] || or
  }

  return r
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * set :: string ➞ ⭑ ➞ object ➞ object
 * * set :: [string] ➞ ⭑ ➞ object ➞ object
 *
 * Object
 *
 * Sets a property on an object
 *
 * #### Example
 * ```js
 * import { set } from '@northbrook/util'
 *
 * set('foo', 'bar', {})  // { foo: 'bar' }
 * ```
 * @name set
 */
export function set (props, value, obj) {
  const x = {}

  if (typeof props === 'string') {
    x[props] = value
    return merge(obj, x)
  } else if (props.length === 0) {
    x[props[0]] = value
    return merge(obj, x)
  }

  const l = props.length

  let r = x

  for (let i = 0; i < l - 1; ++i) {
    const elem = props[i]
    if (!r[elem]) r[elem] = {}
    r = r[elem]
  }

  r[props[l - 1]] = value

  return merge(obj, x)
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * merge :: object ➞ object ➞ object
 *
 * Object
 *
 * Performs a deep merge of 2 objects
 *
 * #### Example
 * ```js
 * import { merge } from '@northbrook/util'
 *
 * merge({ x: 1 }, { y: 2 })  // { x: 1, y: 2 }
 * ```
 * @name merge
 */
export function merge (target, src) {
  const array = isArrayLike(src)
  let destination = array && [] || {}

  if (array) {
    target = target || []

    destination = concat(destination, target)

    each((e, i) => {
      if (is('undefined', destination[i])) {
        destination[i] = e
      } else if (is('object', e)) {
        destination[i] = merge(target[i], e)
      } else {
        if (!contains(e, target)) {
          destination.push(e)
        }
      }
    }, src)
  } else {
    if (is('object', target)) {
      each(key => {
        destination[key] = target[key]
      }, keys(target))
    }

    each(key => {
      if (!is('object', src[key])) {
        destination[key] = src[key]
      } else {
        if (!target[key]) {
          destination[key] = src[key]
        } else {
          destination[key] = merge(target[key], src[key])
        }
      }
    }, keys(src))
  }

  return destination
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * mergeMany :: [...object] ➞ object
 *
 * Object
 *
 * Performs a deep merge of `n` number of objects
 *
 * #### Example
 * ```js
 * import { merge } from '@northbrook/util'
 *
 * merge({ x: 1 }, { y: 2 })  // { x: 1, y: 2 }
 * ```
 * @name mergeMany
 */
export function mergeMany (...objects) {
  return reduce((destination, obj) => merge(destination, obj), {}, objects)
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * keys :: object ➞ [string]
 *
 * Object
 *
 * Returns an array of keys from a given object
 *
 * #### Example
 * ```js
 * import { keys } from '@northbrook/util'
 *
 * keys({ x: 1, y: 2 })  // ['x', 'y']
 * ```
 * @name keys
 */
export function keys (object) {
  return Object.keys(object)
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * values :: object ➞ [string]
 *
 * Object
 *
 * Returns an array of values from a given object
 *
 * #### Example
 * ```js
 * import { values } from '@northbrook/util'
 *
 * values({ x: 1, y: 2 })  // [1, 2]
 * ```
 * @name values
 */
export function values (object) {
  return map((key) => object[key], Object.keys(object))
}
