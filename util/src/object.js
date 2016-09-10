import jsonbeautify from 'json-beautify'

import { reduce, map, isArrayLike, each, contains, concat } from './array'
import { is } from './function'

/**
 * Takes a JS Object and returns a beautified string
 */
export const beautify = obj => jsonbeautify(obj, null, 2, 80)

/**
 * pluck :: string -> {} -> a
 * pluck :: [string] -> {} -> a
 * Find a property in an object
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
 * propEq :: string -> a -> {} -> boolean
 * propEq :: [string] -> a -> {} -> boolean
 * Checks equality of a object property and x
 */
export function propEq (props, x, obj) {
  return is(x, pluck(props, obj))
}

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

/**
 * performes a depp copy of all object properties
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

export function mergeMany (...objects) {
  return reduce((destination, obj) => merge(destination, obj), {}, objects)
}

export function keys (object) {
  return Object.keys(object)
}

export function values (object) {
  return map((key) => object[key], Object.keys(object))
}
