import { describe, it } from 'mocha'
import assert from 'power-assert'

import { split, replace, trim } from '../src'

describe('string', () => {
  describe('split', () => {
    it('should split a string at a given intersection', () => {
      const x = 'foo.bar.baz'
      const y = split('.', x)
      assert.deepEqual(y, ['foo', 'bar', 'baz'])
    })
  })

  describe('replace', () => {
    it('should replace a given section of a string', () => {
      const x = 'foo.bar.baz'
      const y = replace('baz', 'bar', x)
      assert(y === 'foo.baz.baz')
    })
  })

  describe('trim', () => {
    it('should remove trailing whitespace', () => {
      const x = '   foo    '
      const y = trim(x)
      assert(y, 'foo')
    })
  })
})
