// helpful functions
import * as f from './function'

export const id = f.id
export const bind = f.curry(f.bind, 2)
export const apply = f.curry(f.apply, 2)
export const curry = f.curry
export const __ = f.__
export const partial = f.curry(f.partial, 2)
export const flip = f.flip
export const pipe = f.pipe
export const compose = f.compose
export const always = f.always
export const negate = f.negate
export const cond = f.cond
export const ifElse = f.curry(f.ifElse, 4)
export const is = f.curry(f.is, 2)
export const and = f.and
export const or = f.or

// non mutative array functions
import * as array from './array'

/* methods from @most/prelude */
export const cons = f.curry(array.cons, 2)
export const append = f.curry(array.append, 2)
export const drop = f.curry(array.drop, 2)
export const tail = array.tail
export const copy = array.copy
export const map = f.curry(array.map, 2)
export const reduce = f.curry(array.reduce, 3)
export const replace = f.curry(array.replace, 3)
export const remove = f.curry(array.remove, 2)
export const removeAll = f.curry(array.removeAll, 2)
export const findIndex = f.curry(array.findIndex, 2)
export const isArrayLike = array.isArrayLike
/* methods defined locally */
export const each = f.curry(array.each, 2)
export const filter = f.curry(array.filter, 2)
export const reverse = array.reverse
export const concat = f.curry(array.concat, 2)
export const flatten = array.flatten
export const some = f.curry(array.some, 2)
export const all = f.curry(array.all, 2)
export const contains = f.curry(array.contains, 2)
export const uniq = array.uniq
export const uniqWith = f.curry(array.uniqWith, 2)

import * as obj from './object'

export const pluck = f.curry(obj.pluck, 2)
export const propEq = f.curry(obj.propEq, 3)
export const propOr = f.curry(obj.propOr, 3)
export const set = f.curry(obj.set, 3)
export const merge = obj.merge

import * as str from './string'

export const split = f.curry(str.split, 2)
export const trim = str.trim

/* functions to help with node stuff */

export * from './node'

/* functions to help with northbrook specific things */

export * from './northbrook'
