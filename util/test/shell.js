import { describe, it } from 'mocha'
import assert from 'power-assert'

import Listr from 'listr'
import { exec, list, listItem } from '../src'

describe('node.shell', () => {
  describe('exec', () => {
    it('should execute a command', () => {
      exec('echo hello').map(out => {
        assert(out === 'hello')
      }).drain()
    })
  })

  describe('list', () => {
    it('should create a new listr object', () => {
      const x = list([])

      assert(typeof x === 'object')
      assert(x instanceof Listr)
    })
  })

  describe('listItem', () => {
    it('should create a listr item object', () => {
      const x = listItem('hi', () => exec('echo hi'))

      assert(x.title === 'hi')
      assert(typeof x.task === 'function')
      assert(typeof x.skip === 'function')
    })
  })
})
