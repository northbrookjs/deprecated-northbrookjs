import { describe, it } from 'mocha'
import assert from 'power-assert'
import {
  pluck,
  propEq,
  propOr,
  set,
  merge,
  mergeMany,
  keys,
  values
} from '../src/object'

const obj = () => Object.assign({}, {
  'foo': {
    'bar': {
      'baz': true
    }
  }
})

describe('object', () => {
  describe('pluck', () => {
    it('should get a property from object', () => {
      const foo = pluck('foo', obj())

      assert(typeof foo === 'object')
    })

    it('should get deep nested properties', () => {
      const baz = pluck(['foo', 'bar', 'baz'], obj())
      assert(baz)
    })
  })

  describe('propEq', () => {
    it('shoud return true when property equals a value', () => {
      assert(propEq(['foo', 'bar', 'baz'], true, obj()))
    })

    it('should return false when a property does not match', () => {
      assert(propEq(['empty'], 3, obj()) === null)
    })
  })

  describe('propOr', () => {
    it('shoud return value of property', () => {
      assert(propOr(['foo', 'bar', 'baz'], null, obj()))
    })

    it('should return `or` when a property can not be found', () => {
      assert(propOr(['empty'], 3, obj()) === 3)
    })
  })

  describe('set', () => {
    it('should change a property value on an object', () => {
      const x = set('foo', 3, obj())
      assert(x.foo === 3)
    })

    it('should allow deeply nested object', () => {
      const x = set(['foo', 'bar'], 3, obj())

      assert(x.foo.bar === 3)
    })
  })

  describe('merge', () => {
    it('should merge together 2 objects', () => {
      const a = { a: 1, b: 3, c: { d: 5 } }
      const b = { b: 10, e: 7, c: { f: 9 } }

      const c = merge(a, b)

      assert(c.a === 1)
      assert(c.b === 10)
      assert.deepEqual(c.c, { d: 5, f: 9 })
      assert(c.e === 7)
    })

    it('should merge together 2 arrays', () => {
      const a = [1, 3, 5, 7]
      const b = [2, 4, 6, 8]
      const c = merge(a, b)

      assert.deepEqual(c, [1, 3, 5, 7, 2, 4, 6, 8])
    })

    describe('mergeMany', () => {
      it('should merge together `n` number of objects', () => {
        const a = { a: 1, b: 3, c: { d: 5 } }
        const b = { b: 10, e: 7, c: { f: 9 } }
        const c = { b: 11, c: { f: 12, g: 99 } }

        const d = mergeMany(a, b, c)

        assert(d.a === 1)
        assert(d.b === 11)
        assert.deepEqual(d.c, { d: 5, f: 12, g: 99 })
        assert(d.e === 7)
      })

      it('should merge together `n` of arrays', () => {
        const a = [1, 3, 5, 7]
        const b = [2, 4, 6, 8]
        const c = [2, 4, 6, 8]
        const d = merge(a, b, c)

        assert.deepEqual(d, [1, 3, 5, 7, 2, 4, 6, 8])
      })
    })
  })

  describe('keys', () => {
    it('should return an array of keys', () => {
      const x = keys(obj())

      assert.deepEqual(x, ['foo'])
    })
  })

  describe('values', () => {
    it('should return an array of object values', () => {
      const x = values({ x: 1, y: 2 })

      assert.deepEqual(x, [1, 2])
    })
  })
})
