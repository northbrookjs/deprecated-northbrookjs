import { reverse, concat, reduce, tail, filter } from './array'

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * id :: a ➞ a - Function
 *
 * Returns the value it is given
 *
 * #### Example
 * ```js
 * import { id } from '@northbrook/util'
 *
 * id(1)  // 1
 * ```
 *
 * @name id
 */
export const id = x => x

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * * bind :: ⭑ ➞ ([...⭑] ➞ ⭑) ➞ ⭑ - Function
 * * bind :: ⭑ ➞ ([...⭑] ➞ ⭑) ➞ [⭑] ➞ ⭑
 *
 * Binds a function to `this` value. Optionally binding arguments to the function for partial application
 *
 * #### Example
 * ```js
 * import { bind } from '@northbrook/util'
 *
 * const z = {}
 * const f = (x, y) ⇒ {
 *   if(this === z) { // true
 *     return x + y
 *   }
 * }
 *
 * const x = bind(z, f, [1])
 * x(2) // 3
 * ```
 * @name bind
 */
export function bind (that, f, prevArgs = []) {
  return function () {
    return f.apply(that, concat(prevArgs, arguments))
  }
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * apply :: ([...⭑] ➞ ⭑) ➞ [⭑] ➞ ⭑ - Function
 *
 * Applys an array of arguments to a function
 *
 * #### Example
 * ```js
 * import { apply } from '@northbrook/util'
 *
 * apply(add, [1, 2])  // 3
 * ```
 * @name apply
 */
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
 * curry :: (a ➞ b ➞ c) ➞ a ➞ b ➞ c - Function
 * curry :: (a ➞ b ➞ c) ➞ int ➞ a ➞ b ➞ c
 *
 * Curries your functions - optionally taking a arity parameter
 *
 * #### Example
 * ```js
 * import { curry } from '@northbrook/util'
 *
 * const add = (x, y) => x + y
 * const addc = curry(add)
 *
 * const add1 = addc(1)
 *
 * add1(2) // 3
 * ```
 *
 * @name curry
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

// Placeholder is a unique object to be used as a placeholder for partial()
const PLACEHOLDER = {}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * __ :: Object - Function
 *
 * A placeholder to be used inside of `partial()`
 *
 * #### Example
 * ```js
 * import { __, partial }from '@northbrook/util'
 *
 * const f = partial(sumOf3, [_, 2, _])
 * f(1, 3) // 6
 * ```
 * @name __
 */
export const __ = PLACEHOLDER

// internal function to determine if a value is a placeholder
const isPlaceholder = x => x === PLACEHOLDER

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * partial :: (a, b ➞ c) ➞ [a] ➞ (b ➞ c) - Function
 * partial :: (a, b ➞ c) ➞ [ __, b] ➞ (a ➞ c)
 * partial :: ([...⭑] ➞ ⭑) ➞ [⭑] ➞ ([...⭑] ➞ ⭑)
 *
 * Partially applies a function, currying it in the process.
 *
 * #### Example
 * ```js
 * import { partial } from '@northbrook/util'
 *
 * const f = partial(add, [1])
 * f(2) // 3
 * ```
 * @name partial
 */
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
 * flip :: (a ➞ b ➞ c) ➞ (b ➞ a ➞ c) - Function
 * flip :: (a ➞ b ➞ c ➞ d) ➞ (c ➞ b ➞ a ➞ d)
 *
 * Flips your argument order
 *
 * @name flip
 */
export function flip (fn) {
  return function () {
    return apply(fn, reverse(arguments))
  }
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * pipe :: [...(⭑ ➞ ⭑)] ➞ (⭑ ➞ ⭑) - Function
 *
 * Pipes many functions together into a single pipeline
 *
 * #### Example
 * ```js
 * import { pipe } from '@northbrook/util'
 *
 * pipe(f, g)  // x => g(f(x))
 * ```
 * @name pipe
 */
export function pipe (...fns) {
  return function () {
    const l = fns.length
    const r = apply(fns[0], arguments)
    if (l === 1) return r

    return reduce((x, f) => f(x), r, tail(fns))
  }
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * compose :: [...(⭑ ➞ ⭑)] ➞ (⭑ ➞ ⭑) - Function
 *
 * Composes many functions togther to form a pipeline
 *
 * #### Example
 * ```js
 * import { compose } from '@northbrook/util'
 *
 * compose(f, g)  // x => f(g(x))
 * ```
 * @name compose
 */
export const compose = (...fns) => apply(pipe, reverse(fns))

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * always :: a ➞ () ➞ a - Function
 *
 * Returns a function that will always return a given value
 *
 * #### Example
 * ```js
 * import { always } from '@northbrook/util'
 *
 * const always3 = always(3)
 *
 * always3(999) // 3
 * ```
 * @name always
 */
export const always = x => () => x

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * negate :: (a ➞ b) ➞ (a ➞ !b) - Function
 *
 * Returns the oppostive value of a give function
 *
 * #### Example
 * ```js
 * import { negate, alwayas } from '@northbrook/util'
 *
 * negate(always(true))(9) // false
 * ```
 * @name negate
 */
export function negate (f) {
  return function () {
    return !apply(f, arguments)
  }
}

/**
 * cond :: [ [ (...a ➞ boolean), b ] ] ➞ (...a ➞ b) - Function
 *
 * Given a sequence of conditions it returns a match
 *
 * #### Example
 * ```js
 * import { cond, always } from '@northbrook/util'
 *
 * const num = cond([
 *  [(x) => x === 0, 'Value is zero'],
 *  [(x) => x === 1, 'Value is one'],
 *  [always(true), 'Value is nothing interesting']
 * ])
 *
 * num(0) // 'Value is zero'
 * num(1) // 'Value is one'
 * num(99) // 'Value is nothing interesting'
 * ```
 *
 * @name cond
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

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * ifElse :: (a ➞ boolean) ➞ (a ➞ b) ➞ (a ➞ b) ➞ a ➞ b - Function
 *
 * Declaratively define if else statements
 *
 * #### Example
 * ```js
 * import { ifElse, id, map } from '@northbrook/util'
 *
 * const sub1 = x => x - 1
 * const makeEvens = ifElse(isEven, id, sub1)
 *
 * map(makeEvens, [1, 2, 3, 4]) // [0, 2, 2, 4]
 * ```
 * @name ifElse
 */
export function ifElse (_if, _then, _else, value) {
  if (_if(value)) {
    return _then(value)
  }
  return _else(value)
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * * is :: string ➞ ⭑ ➞ boolean  - Function
 * * is :: (⭑ ➞ ⭑) ➞ ⭑ ➞ boolean
 * * is :: ⭑ ➞ ⭑ ➞ boolean
 *
 * Checks the equality of a value to different types.
 * When given a string as the first argument it will do a `typeof` check then equality if that fails.
 * If given a function it will first do an `instanceof` check then it will call the function.
 * Lastly it will attempt to do an equality check.
 *
 * #### Example
 * ```js
 * import { is } from '@northbrook/util'
 *
 * is('string', 'hello')  // true
 * is(Class, new Class()) // true
 * is(3, 3) // true
 * is(x => x === 2, 2) // true
 * ```
 * @name is
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
 * and :: [...(a ➞ boolean)] ➞ a ➞ boolean - Function
 *
 * Checks values against many predicates returning true if *all* predicates return a truthy value
 *
 * #### Example
 * ```js
 * import { and } from '@northbrook/util'
 *
 * isOdd = x => x % 2 !== 0
 * isDivsibleBy5 = x => x % 5 === 0
 *
 * const isOddBy5 = add(isOdd, isDivsible)
 *
 * isOddBy5(10) // true
 * isOddBy5(13) // false
 * ```
 *
 * @name and
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

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * or :: ([...(⭑ ➞ boolean)]) ➞ ⭑ ➞ boolean - Function
 *
 * Takes `n` number of predicates and returns true if any of the predicate return true.
 *
 * #### Example
 * ```js
 * import { or } from '@northbrook/util'
 *
 * or(isOdd, isEven)(2)  // true
 * or(isOdd, isEven)(3) // true
 * or(isOdd, isEven)(NaN) // false
 * ```
 * @name or
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
