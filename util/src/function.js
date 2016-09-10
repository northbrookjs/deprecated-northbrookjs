import { reverse, concat, reduce, tail, filter } from './array'

// id :: a -> a
export const id = x => x

export function bind (that, f, prevArgs = []) {
  return function () {
    return f.apply(that, concat(prevArgs, arguments))
  }
}

// apply: (a -> b) -> [a] -> b
export function apply (f, args) {
  switch (args.length) {
    case 0: return f()
    case 1: return f(args[0])
    case 2: return f(args[0], args[1])
    case 3: return f(args[0], args[1], args[2])
    case 4: return f(args[0], args[1], args[2], args[3])
    case 5: return f(args[0], args[1], args[2], args[3], args[4])
    case 6: return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6])
    case 7: return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7])
    case 8: return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8])
    case 9: return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9])
    default: return f.apply(null, args)
  }
}

/**
 * curry :: (a -> b -> c) -> int -> a -> b -> C
 * curry :: (a -> b -> c -> d) -> int -> a -> b -> c -> d
 * Curries your functions
 * @type {Function} fn
 * @type {Number} n
 */
export function curry (fn, n) {
  function wrapper (prevArgs) {
    return function (...args) {
      const argsConcat = concat(prevArgs, args)
      if (argsConcat.length >= (n || fn.length)) {
        return apply(fn, argsConcat)
      }
      return wrapper(argsConcat)
    }
  }

  return wrapper([])
}

/* meant to be used with partial to apply placeholders as needed */
const PLACEHOLDER = {}
/* export PLACEHOLDER as __ */
export const __ = PLACEHOLDER

// internal function to determine if a value is a placeholder
const isPlaceholder = x => x === PLACEHOLDER

export function partial (fn, partialArgs) {
  const fnLength = fn.length

  if (fnLength === 1) return x => fn(x)

  const numberRemaining = Math.max(0, fnLength - filter(negate(isPlaceholder), partialArgs).length)

  return curry(function () {
    const combined = []
    let aidx = 0
    let pidx = 0

    while (pidx < partialArgs.length) {
      const arg = partialArgs[pidx]
      if (isPlaceholder(arg)) {
        if (aidx < arguments.length) {
          combined.push(arguments[aidx])
          aidx += 1
        }
      } else {
        combined.push(arg)
      }
      pidx += 1
    }

    while (aidx < arguments.length) {
      combined.push(arguments[aidx])
      aidx += 1
    }

    return apply(fn, combined)
  }, numberRemaining)
}

/**
 * flip :: (a -> b -> c) -> (b -> a -> c)
 * flip :: (a -> b -> c -> d) -> (c -> b -> a -> d)
 * flip arguments order
 * @type {function} fn
 */
export function flip (fn) {
  return function () {
    return apply(fn, reverse(arguments))
  }
}

/**
 * Pipes many functions together
 */
export function pipe (...fns) {
  return function () {
    const l = fns.length
    const r = apply(fns[0], arguments)
    if (l === 1) return r

    return reduce((x, f) => f(x), r, tail(fns))
  }
}

export const compose = (...fns) => apply(pipe, reverse(fns))

/**
 * A function that always returns true
 */
export const always = x => () => x

/**
 * A function that taks a function and negates (!) the return value
 */
export function negate (f) {
  return function () {
    return !apply(f, arguments)
  }
}

/**
 * Given a sequence of conditions it returns a match
 * @example
 * cond([
 *  [(x) => x === 0, 'Value is zero'],
 *  [(x) => x === 1, 'Value is one'],
 *  [truthy, 'Value is northing interesting']
 * ])
 */
export function cond (conditions) {
  return function condition (...values) {
    for (let i = 0; i < conditions.length; ++i) {
      const [equality, result] = conditions[i]
      if (is('function', equality) && apply(equality, values) || equality === values[0]) {
        return is('function', result) ? apply(result, values) : result
      }
    }
  }
}

/**
 * Declaratively define if else statements
 */
export function ifElse (_if, _then, _else, value) {
  if (_if(value)) {
    return _then(value)
  }
  return _else(value)
}

/**
 * Check for equality between type and instance
 */
export function is (type, instance) {
  if (!instance) return null
  switch (typeof type) {
    case 'string': return typeof instance === type || type === instance
    case 'function': return !!isFunction(type, instance)
    default: return type === instance
  }
}

function isFunction (type, instance) {
  try {
    return instance instanceof type
  } catch (e) {
    return type(instance)
  }
}

/**
 * Checks values against many predicates returning true if *all*
 * predicates return a truthy value
 */
export function and (...predicates) {
  return function (...values) {
    let answer = true

    for (let i = 0; i < predicates.length; ++i) {
      answer = apply(predicates[i], values)
      if (!answer) break
    }

    return answer
  }
}

/**
 * returns true if any predicates return a truthy value
 */
export function or (...predicates) {
  return function (...args) {
    let answer = false

    for (let i = 0; i < predicates.length; ++i) {
      answer = apply(predicates[i], args)
      if (answer) break
    }

    return answer
  }
}
