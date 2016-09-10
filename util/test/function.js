import { describe, it } from 'mocha'
import assert from 'power-assert'

import {
  id,
  bind,
  apply,
  curry,
  __,
  partial,
  flip,
  pipe,
  compose,
  always,
  negate,
  cond,
  ifElse,
  is,
  and,
  or
} from '../src'

describe('function', () => {
  describe('id', () => {
    it('should return whatever it is called with', () => {
      assert(id(1) === 1)
    })
  })

  describe('bind', () => {
    it('should bind a function to a this argument', (done) => {
      const thing = {}
      function foo () {
        assert(this === thing)
        done()
      }

      bind(thing, foo)()
    })

    it('should partially apply with previous arguments', (done) => {
      const thing = {}
      function foo (a, b, c) {
        assert(a === 1)
        assert(b === 2)
        assert(c === 3)
        assert(this === thing)
        done()
      }

      bind(thing, foo, [1, 2])(3)
    })
  })

  describe('apply', () => {
    it('should call a function with arguments', (done) => {
      function foo (x, y) {
        assert(x + y === 3)
        done()
      }

      apply(foo, [1, 2])
    })
  })

  describe('curry', () => {
    it('should curry multi-arg functions', (done) => {
      function foo (x, y) {
        assert(x + y === 3)
        done()
      }

      curry(foo)(1)(2)
    })

    it('should respect arity argument', (done) => {
      function foo (x, y, z) {
        assert(x === 1)
        assert(y === 2)
        assert(z === void 0)
        done()
      }

      curry(foo, 2)(1)(2)
    })

    it('should pass extra parameters past arity number', (done) => {
      function foo (x, y, z) {
        assert(x === 1)
        assert(y === 2)
        assert(z === 3)
        done()
      }

      curry(foo, 2)(1)(2, 3)
    })
  })

  describe('partial', () => {
    it('should allow partially applying parameters', () => {
      const x = (a, b, c, d) => {
        assert(a === 1)
        assert(b === 2)
        assert(c === 1)
        assert(d === 2)
        return a + b + c + d
      }
      const y = partial(x, [1, 2])
      const z = y(1, 2)

      assert(z === 6)
    })

    it('should allow adding placeholders', () => {
      const x = (a, b, c, d) => {
        assert(a === 1)
        assert(b === 2)
        assert(c === 3)
        assert(d === 4)
        return a + b + c + d
      }
      const y = partial(x, [1, 2, __, 4])
      const z = y(3)

      assert(z === 10)
    })

    it('should return curried', () => {
      const x = (a, b, c, d) => {
        assert(a === 1)
        assert(b === 2)
        assert(c === 3)
        assert(d === 4)
        return a + b + c + d
      }

      const y = partial(x, [__, 2])

      const z = y(1)(3)(4)
      assert(z === 10)
    })
  })

  describe('flip', () => {
    it('should reverse the arguments of a function', (done) => {
      function foo (x, y, z) {
        assert(x === 1)
        assert(y === 2)
        assert(z === 3)
        done()
      }

      const bar = flip(foo)

      bar(3, 2, 1)
    })
  })

  describe('pipe', () => {
    it('should apply left to right composition', (done) => {
      function foo (x) {
        assert(x === 1)
        return x + 1
      }

      function bar (x) {
        assert(x === 2)
        done()
      }

      pipe(foo, bar)(1)
    })
  })

  describe('compose', () => {
    it('should apply right to left composition', (done) => {
      function foo (x) {
        assert(x === 1)
        return x + 1
      }

      function bar (x) {
        assert(x === 2)
        done()
      }

      compose(bar, foo)(1)
    })
  })

  describe('always', () => {
    it('should return a function that always returns a value', () => {
      const x = {}
      const foo = always(x)

      assert(foo('bar') === x)
      assert(foo({}) === x)
    })
  })

  describe('negate', () => {
    it('should return the opposite of a functions value', () => {
      const foo = negate(always(false))

      assert(foo())
    })
  })

  describe('cond', () => {
    it('should allow for declarative pattern matching', () => {
      assert(typeof cond === 'function')

      const condition = cond([
        [x => x === 1, 'One'],
        [x => x === 2, (x) => 'Two'],
        ['Bar', 'Foo'],
        [always(true), 'Foo']
      ])

      assert(typeof condition === 'function')

      assert(condition(1) === 'One')
      assert(condition(2) === 'Two')
      assert(condition('Bar'), 'Foo')
      assert(condition('Foo', 'Foo'))
    })
  })

  describe('ifElse', () => {
    it('should allow for declarative if else statements', () => {
      const foo = ifElse(
        x => x === 1,
        always('One'),
        always('Foo')
      )

      assert(foo(1) === 'One')
      assert(foo('Bar') === 'Foo')
    })
  })

  describe('is', () => {
    it('should check typeof value when given a string', () => {
      assert(is('string', 'Foo'))
      assert(is('number', 4))
    })

    it('should check instanceof when given a function', () => {
      class Foo {
        constructor () {
          this.x = 1
        }
      }

      assert(is(Array.isArray, []))
      assert(is(Foo, new Foo()))
      assert(Number.isNaN, NaN)
    })

    it('should check equality otherwise', () => {
      assert(is(1, 1))
      assert(is(true, always(true)()))
    })
  })

  describe('and', () => {
    it('should return true if all predicates are true', () => {
      assert(and(always(true), always(true))(1))
    })

    it('should return false if any predicate is false', () => {
      assert(and(always(true), always(false))(1) === false)
    })
  })

  describe('or', () => {
    it('should return true if a predicate is truthy', () => {
      assert(or(always(true), always(false))())
      assert(or(always(false), always(false))() === false)
      assert(or(always(false), always(true)))
    })
  })
})
