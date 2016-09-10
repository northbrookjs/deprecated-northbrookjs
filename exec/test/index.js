import { describe, it } from 'mocha'
import assert from 'power-assert'

import {
  setEnv,
  joinc,
  getName,
  getPackages,
  getCommand,
  run,
  action
} from '../src'

describe('@northbrook/exec', () => {
  describe('setEnv', () => {
    it('should set the env var and return input', () => {
      const x = '/hi'
      const y = setEnv(x)
      assert(process.env.NORTHBROOK_EXEC_DIR === x)
      assert(x === y)
    })
  })

  describe('joinc', () => {
    it('should join together 2 paths', () => {
      const path = joinc('/hi')('/there')
      assert(path === '/hi/there')
    })
  })

  describe('getName', () => {
    const name = getName(joinc(__dirname)('../'))
    assert(name === '@northbrook/exec')
  })

  describe('getPackages', () => {
    it('should return packages from config', () => {
      const config = { packages: ['hi'] }
      const packages = getPackages(config, {})

      assert.deepEqual(packages, ['hi'])
    })

    it('should filter package when only option is provided', () => {
      const packages = ['hi', 'there']
      const config = { packages }
      const only = 'there'
      const options = { only }

      assert.deepEqual(getPackages(config, options), [only])
    })
  })

  describe('getCommand', () => {
    it('should return an object containing command and arguments', () => {
      const { command, args } = getCommand(['npm', 'install'])

      assert(command === 'npm')
      assert.deepEqual(args, ['install'])
    })
  })

  describe('run', () => {
    it('should run a command', () => {
      return run('echo hello', joinc(__dirname)('../'))
    })
  })

  describe('action', () => {
    it('should put everything together', () => {
      const config = {
        packages: [ '.' ]
      }
      const directory = joinc(__dirname)('../')

      const args = ['echo', 'hello']
      const options = {}

      return action(config, directory, args, options)
    })
  })
})
