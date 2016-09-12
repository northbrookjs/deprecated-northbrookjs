// Non-mutating array an arrayLike operations

/**
 * * cons :: a ➞ [a] ➞ [a]
 *
 * Array
 *
 * Creates an array prepended by a value
 *
 * #### Example
 * ```js
 * import { cons } from '@northbrook/util'
 *
 * cons(1, [2, 3]) // [1, 2, 3]
 * ```
 * @name cons
 */
export function cons (x, a) {
  const l = a.length
  const b = new Array(l + 1)
  b[0] = x
  for (let i = 0; i < l; ++i) {
    b[i + 1] = a[i]
  }
  return b
}

/**
 * * append :: a ➞ [a] ➞ [a]
 *
 * Array
 *
 * Creates an array appended by a value
 *
 * #### Example:
 * ```js
 * import { append } from '@northbrook/util'
 *
 * append(3, [1, 2]) // [1, 2, 3]
 * ```
 * @name append
 */
export function append (x, a) {
  const l = a.length
  const b = new Array(l + 1)
  for (let i = 0; i < l; ++i) {
    b[i] = a[i]
  }

  b[l] = x
  return b
}

/**
 * * drop :: number ➞ [a] ➞ [a]
 *
 * Array
 *
 * Drops the first `n` number of values from an array
 *
 * #### Example
 * ```js
 * import { drop } from '@northbrook/util'
 *
 * drop(2, [1, 1, 2, 3]) // [2, 3]
 * ```
 * @name drop
 */
export function drop (n, a) { // eslint-disable-line complexity
  if (n < 0) {
    throw new TypeError('n must be >= 0')
  }

  const l = a.length
  if (n === 0 || l === 0) {
    return a
  }

  if (n >= l) {
    return []
  }

  return unsafeDrop(n, a, l - n)
}

// unsafeDrop :: Int ➞ [a] ➞ Int ➞ [a]
// Internal helper for drop
function unsafeDrop (n, a, l) {
  const b = new Array(l)
  for (let i = 0; i < l; ++i) {
    b[i] = a[n + i]
  }
  return b
}

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * tail :: [a] ➞ [a]
 *
 * Array
 *
 * Retuns an array without it's first item
 *
 * #### Example
 * ```js
 * import { tail } from '@northbrook/util'
 *
 * tail([1, 2, 3])  // [2, 3]
 * ```
 * @name tail
 */
export function tail (a) {
  return drop(1, a)
}

/**
 * copy :: [a] ➞ [a]
 *
 * Array
 *
 * Creates an identical copy of an array without mutating the original
 *
 * #### Example
 * ```js
 * import { copy } from '@northbrook/util'
 *
 * copy([2, 3]) // [2, 3]
 * ```
 * @name copy
 */
export function copy (a) {
  const l = a.length
  const b = new Array(l)
  for (let i = 0; i < l; ++i) {
    b[i] = a[i]
  }
  return b
}

/**
 * * map :: (a ➞ b) ➞ [a] ➞ [b]
 *
 * Array
 *
 * Creates a new array based on a previous
 *
 * #### Example
 * ```js
 * import { map } from '@northbrook/util'
 *
 * map((x) ⇒ x + 1, [1, 2, 3]) // [2, 3, 4]
 * ```
 * @name map
 */
export function map (f, a) {
  const l = a.length
  const b = new Array(l)
  for (let i = 0; i < l; ++i) {
    b[i] = f(a[i])
  }
  return b
}

/**
 * * reduce :: (b ➞ a ➞ b) ➞ b ➞ [a]
 *
 * Array
 *
 * Creates a value by iterating over the values of an array
 *
 * #### Example
 * ```js
 * import { reduce } from '@northbrook/util'
 *
 * const sum = (x, y) ⇒ x + y
 * const sumReduce = reduce(sum, 0)
 *
 * sumReduce([1, 2, 3, 4]) // 10
 * ```
 * @name reduce
 */
export function reduce (f, z, a) {
  let r = z
  for (let i = 0, l = a.length; i < l; ++i) {
    r = f(r, a[i], i)
  }
  return r
}

/**
 * * replace :: a ➞ number ➞ [a]
 *
 * Array / String
 *
 * Replace an element at a given index
 *
 * #### Example
 * ```js
 * import { replace } from '@northbrook/util'
 *
 * replace(100, 3, [1, 2, 3]) // [1, 2, 100]
 * reaplce('*', '', '*hello*') // hello
 * ```
 * @name replace
 */
export function replace (x, i, a) { // eslint-disable-line complexity
  if (i < 0) {
    throw new TypeError('i must be >= 0')
  }

  // support strings too since this fn name is taken :/
  if (typeof a === 'string') return a.replace(i, x)

  const l = a.length
  const b = new Array(l)
  for (let j = 0; j < l; ++j) {
    b[j] = i === j ? x : a[j]
  }
  return b
}

/**
 * * remove :: number ➞ [a] ➞ [a]
 *
 * Array
 *
 * Remove an element at a given index
 *
 * #### Example
 * ```js
 * import { remove } from '@northbrook/util'
 *
 * remove(1, [1, 2, 3]) // [1, 3]
 * ```
 * @name remove
 */
export function remove (i, a) {  // eslint-disable-line complexity
  if (i < 0) {
    throw new TypeError('i must be >= 0')
  }

  const l = a.length
  if (l === 0 || i >= l) { // exit early if index beyond end of array
    return a
  }

  if (l === 1) { // exit early if index in bounds and length === 1
    return []
  }

  return unsafeRemove(i, a, l - 1)
}

// unsafeRemove :: Int ➞ [a] ➞ Int ➞ [a]
// Internal helper to remove element at index
function unsafeRemove (i, a, l) {
  const b = new Array(l)
  let j
  for (j = 0; j < i; ++j) {
    b[j] = a[j]
  }
  for (j = i; j < l; ++j) {
    b[j] = a[j + 1]
  }

  return b
}

/**
 * * removeAll :: (a ➞ boolean) ➞ [a] ➞ [a]
 *
 * Array
 *
 * Removes all elements matching a predicate
 *
 * #### Example
 * ```js
 * import { removeAll } from '@northbrook/util'
 *
 * removeAll(x ⇒ x % 2 === 0, [1, 2, 3, 4]) // [1, 3]
 * ```
 * @name removeAll
 */
export function removeAll (f, a) {
  const l = a.length
  const b = new Array(l)
  let j = 0
  for (let x, i = 0; i < l; ++i) {
    x = a[i]
    if (!f(x)) {
      b[j] = x
      ++j
    }
  }

  b.length = j
  return b
}

/**
 * * findIndex :: a ➞ [a] ➞ number
 *
 * Array
 *
 * Finds the index of `x` inside of array
 *
 * #### Example
 * ```js
 * import { findIndex } from '@northbrook/util'
 *
 * findIndex(1, [1, 2, 3]) // 0
 * ```
 * @name findIndex
 */
export function findIndex (x, a) {
  if (Array.isArray(a)) return a.findIndex(b => b === x)

  for (let i = 0, l = a.length; i < l; ++i) {
    if (x === a[i]) {
      return i
    }
  }
  return -1
}

/**
 * isArrayLike :: ⭑ ➞ boolean
 *
 * any
 *
 * Returns true if an only if given value is array-like
 *
 * #### Example
 * ```js
 * import { isArrayLike } from '@northbrook/util'
 *
 * isArrayLike(document.querySelectorAll('div')) // true
 * ```
 *
 * @name isArrayLike
 */
export function isArrayLike (x) {
  return x != null && typeof x.length === 'number' && typeof x !== 'function'
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * * each :: (a, number ➞ ⭑) ➞ [a] ➞ [a]
 *
 * Array
 *
 * Calls a function with each item in an array and returns the array it started with.
 *
 * #### Example
 * ```js
 * import { each } from '@northbrook/util'
 *
 * each((x, i) => console.log(x, i), [1, 2, 3])
 * //  logs (1, 0), (2, 1), (3, 2)
 * ```
 * @name each
 */
export function each (f, a) {
  let l = a.length

  for (let i = 0; i < l; ++i) {
    f(a[i], i)
  }

  return a
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * * filter :: (a ➞ boolean) ➞ [a] ➞ [a]
 *
 * Array
 *
 * Filters the array based on a given predicate
 *
 * #### Example
 * ```js
 * import { filter } from '@northbrook/util'
 *
 * filter(isEven, [1, 2, 3, 4])  // [2, 4]
 * ```
 * @name filter
 */
export function filter (f, a) {
  if (Array.isArray(a)) return a.filter(f)

  let l = a.length
  let b = []

  for (let i = 0; i < l; ++i) {
    if (f(a[i], i)) {
      b.push(a[i])
    }
  }

  return b
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * reverse :: [a] ➞ [a]
 *
 * Array
 *
 * Returns an array in the opposite order of which it was given
 *
 * #### Example
 * ```js
 * import { reverse } from '@northbrook/util'
 *
 * reverse([1, 2, 3])  // [3, 2, 1]
 * ```
 * @name reverse
 */
export function reverse (a) {
  if (Array.isArray(a)) return a.slice().reverse()

  const l = a.length
  const b = Array(l)

  const x = l - 1
  for (let i = 0; i < l; ++i) {
    b[i] = a[x - i]
  }

  return b
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * * concat :: [a] ➞ [b] ➞ [a | b]
 *
 * Array
 *
 * Concatenates together 2 arrays
 *
 * #### Example
 * ```js
 * import { concat } from '@northbrook/util'
 *
 * concat([1, 2], [3, 4])  // [1, 2, 3, 4]
 * ```
 * @name concat
 */
export function concat (a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b)
  }

  const al = a.length
  const bl = b.length

  if (al === 0) return b
  if (bl === 0) return a

  const c = Array(al + bl)

  for (let i = 0; i < al; ++i) {
    c[i] = a[i]
  }

  for (let i = 0; i < bl; ++i) {
    c[i + al] = b[i]
  }

  return c
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * flatten :: [[a] | a] ➞ [a]
 *
 * Array
 *
 * Creates a 1 dimensional array from a multi-dimensional array
 *
 * #### Example
 * ```js
 * import { flatten } from '@northbrook/util'
 *
 * flatten([[1], [[2]], 3])  // [1, 2, 3]
 * ```
 * @name flatten
 */
export function flatten (array) {
  const l = array.length

  let x = []

  for (let i = 0; i < l; ++i) {
    const y = array[i]
    x = isArrayLike(y)
      ? concat(x, flatten(y))
      : append(y, x)
  }

  return x
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * * some :: (a ➞ boolean) ➞ [a] ➞ boolean
 *
 * Array
 *
 * Checks the values of an array and returns true if at least 1 item matches the given predicate
 *
 * #### Example
 * ```js
 * import { some } from '@northbrook/util'
 *
 * some(isEven, [1, 3, 5, 6])  // true
 * ```
 * @name some
 */
export function some (f, array) {
  return Array.isArray(array)
    ? array.some(f)
    : copy(array).some(f)
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * * all :: (a ➞ boolean) ➞ [a] ➞ boolean
 *
 * Array
 *
 * Checks the values of an array returning true if all items match a predicate
 *
 * #### Example
 * ```js
 * import { all } from '@northbrook/util'
 *
 * all(isEven, [2, 4, 6, 8])  // true
 * all(isEven, [2, 4, 6, 9]) // false
 * ```
 * @name all
 */
export function all (f, array) {
  return Array.isArray(array)
    ? array.every(f)
    : copy(array).every(f)
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * * contains :: a ➞ [a] ➞ boolean
 *
 * Array
 *
 * Returns true if an array contains a value `x`
 *
 * #### Example
 * ```js
 * import { contains } from '@northbrook/util'
 *
 * contains(3, [1, 2, 3])  // true
 * contains(4, [1, 2, 3]) // false
 * ```
 * @name contains
 */
export function contains (x, arr) {
  return findIndex(x, arr) > -1
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * uniq :: [a] ➞ [a]
 *
 * Array
 *
 * Removes repeated values from an array using a basic `===` equality check.
 *
 * #### Example
 * ```js
 * import { uniq } from '@northbrook/util'
 *
 * uniq([1, 1, 2, 2, 3, 4])  // [1, 2, 3, 4]
 * ```
 * @name uniq
 */
export function uniq (a) {
  const l = a.length
  const b = []

  for (let i = 0; i < l; ++i) {
    const x = a[i]
    if (!contains(x, b)) {
      b.push(x)
    }
  }

  return b
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * * uniqWith :: (a ➞ ⭑) ➞ [a] ➞ [a]
 *
 * Array
 *
 * Removes a repeated value using a user-defined equality check
 *
 * #### Example
 * ```js
 * import { uniqWith } from '@northbrook/util'
 *
 * uniqWith(JSON.stringify, [{a : 1}, {a : 1}])  // [{a : 1}]
 * ```
 * @name uniqWith
 */
export function uniqWith (f, a) {
  const l = a.length
  const b = []

  function findEqual (x) {
    let answer = false

    for (let i = 0; i < b.length; ++i) {
      const y = b[i]
      if (f(x) === f(y)) {
        answer = true
        break
      }
    }

    return answer
  }

  for (let i = 0; i < l; ++i) {
    const x = a[i]
    if (!findEqual(x)) {
      b.push(x)
    }
  }

  return b
}

/** <!--
 * small arrow ➞ fat arrow ⇒
 * -->
 * length :: [a] ➞ number
 *
 * Array / String
 *
 * Returns the length of an array
 *
 * #### Example
 * ```js
 * import { length } from '@northbrook/util'
 *
 * length([1, 2, 3])  // 3
 * ```
 * @name length
 */
export function length (a) {
  return a.length
}
