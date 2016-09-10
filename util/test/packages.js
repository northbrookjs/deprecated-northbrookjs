import { describe, it } from 'mocha'
import assert from 'power-assert'

import {
  filterScopes,
  hasPkg,
  getPkg,
  splitVersion,
  tryRequire,
  resolvePackages } from '../src'

describe('node.packages', () => {
  describe('filterScopes', () => {
    it('should remove scopes from a package name', () => {
      const name = '@northbrook/util'
      assert(filterScopes(name), 'util')
    })
  })

  describe('hasPkg', () => {
    it('should return true if a directory has a package.json', () => {
      return hasPkg(process.cwd()).drain()
    })

    it('should return false if not', (done) => {
      hasPkg(__dirname).drain()
        .then(() => done('Should not be called'))
        .catch(() => done())
    })
  })

  describe('getPkg', () => {
    const pkg = getPkg(process.cwd())

    assert(typeof pkg === 'object')
  })

  describe('splitVersion', () => {
    it('should return array of major, minor, and patch', () => {
      const [major, minor, patch] = splitVersion('1.0.0')
      assert(major === 1)
      assert(minor === 0)
      assert(patch === 0)
    })
  })

  describe('tryRequire', () => {
    it('should return a stream of a package', () => {
      return tryRequire(process.cwd()).drain()
    })
  })
})

describe('northbrook.packages', () => {
  describe('resolvePackages', () => {
    it('should return empty object if no config is provided', () => {
      return resolvePackages(process.cwd(), null).map(config => {
        assert(typeof config === 'object')
        assert.deepEqual(config, {})
      }).drain()
    })

    it('should return config with packages', () => {
      return resolvePackages(process.cwd(), {}).map(config => {
        assert.deepEqual(config.packages, ['.'])
      }).drain()
    })
  })
})
