// Non-mutating array an arrayLike operations

// cons :: a -> [a] -> [a]
// a with x prepended
export function cons (x, a) {
  if (Array.isArray(a)) return concat([x], a)

  const l = a.length
  const b = new Array(l + 1)
  b[0] = x
  for (let i = 0; i < l; ++i) {
    b[i + 1] = a[i]
  }
  return b
}

// append :: a -> [a] -> [a]
// a with x appended
export function append (x, a) {
  if (Array.isArray(a)) return concat(a, [x])

  const l = a.length
  const b = new Array(l + 1)
  for (let i = 0; i < l; ++i) {
    b[i] = a[i]
  }

  b[l] = x
  return b
}

// drop :: Int -> [a] -> [a]
// drop first n elements
export function drop (n, a) { // eslint-disable-line complexity
  if (n < 0) {
    throw new TypeError('n must be >= 0')
  }

  const l = a.length
  if (n === 0 || l === 0) {
    return a
  }

  if (Array.isArray(a)) return a.slice(n)

  if (n >= l) {
    return []
  }

  return unsafeDrop(n, a, l - n)
}

// unsafeDrop :: Int -> [a] -> Int -> [a]
// Internal helper for drop
function unsafeDrop (n, a, l) {
  const b = new Array(l)
  for (let i = 0; i < l; ++i) {
    b[i] = a[n + i]
  }
  return b
}

// tail :: [a] -> [a]
// drop head element
export function tail (a) {
  return drop(1, a)
}

// copy :: [a] -> [a]
// duplicate a (shallow duplication)
export function copy (a) {
  if (Array.isArray(a)) return a.slice()

  const l = a.length
  const b = new Array(l)
  for (let i = 0; i < l; ++i) {
    b[i] = a[i]
  }
  return b
}

// map :: (a -> b) -> [a] -> [b]
// transform each element with f
export function map (f, a) {
  if (Array.isArray(a)) return a.map(f)

  const l = a.length
  const b = new Array(l)
  for (let i = 0; i < l; ++i) {
    b[i] = f(a[i])
  }
  return b
}

// reduce :: (a -> b -> a) -> a -> [b] -> a
// accumulate via left-fold
export function reduce (f, z, a) {
  let r = z
  for (let i = 0, l = a.length; i < l; ++i) {
    r = f(r, a[i], i)
  }
  return r
}

// replace :: a -> Int -> [a]
// replace element at index
export function replace (x, i, a) { // eslint-disable-line complexity
  if (i < 0) {
    throw new TypeError('i must be >= 0')
  }

  if (typeof a === 'string') return a.replace(i, x)

  const l = a.length
  const b = new Array(l)
  for (let j = 0; j < l; ++j) {
    b[j] = i === j ? x : a[j]
  }
  return b
}

// remove :: Int -> [a] -> [a]
// remove element at index
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

// unsafeRemove :: Int -> [a] -> Int -> [a]
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

// removeAll :: (a -> boolean) -> [a] -> [a]
// remove all elements matching a predicate
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

// findIndex :: a -> [a] -> Int
// find index of x in a, from the left
export function findIndex (x, a) {
  if (Array.isArray(a)) return a.findIndex(b => b === x)

  for (let i = 0, l = a.length; i < l; ++i) {
    if (x === a[i]) {
      return i
    }
  }
  return -1
}

// isArrayLike :: * -> boolean
// Return true iff x is array-like
export function isArrayLike (x) {
  return x != null && typeof x.length === 'number' && typeof x !== 'function'
}

// each :: (a -> *) -> [a] -> [a]
// call a function with each item
export function each (f, a) {
  let l = a.length

  for (let i = 0; i < l; ++i) {
    f(a[i], i)
  }

  return a
}

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

// reverse :: [a] -> [a]
// flip the items in an array
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

/**
 * concatenates 2 arrays
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

/**
 * Creates a single array from and array of arrays
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

/**
 * returns true if at least 1 argument matches a predicate
 */
export function some (f, array) {
  return Array.isArray(array)
    ? array.some(f)
    : copy(array).some(f)
}

/**
 * returns true if all values in an array match a predicate
 */
export function all (f, array) {
  return Array.isArray(array)
    ? array.every(f)
    : copy(array).every(f)
}

/**
 * returns true if an array contains a value x
 */
export function contains (x, arr) {
  return findIndex(x, arr) > -1
}

/**
 * Removes repeated values from an array
 * Using only simple equality check
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

export function length (a) {
  return a.length
}
