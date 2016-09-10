import { describe, it } from 'mocha'
import assert from 'power-assert'

import { exists, isDirectory, isFile, isLink, readFile, findConfig } from '../src'

describe('node.fs', () => {
  describe('exists', () => {
    it('should return a stream of fs.stats if true', () => {
      return exists('.babelrc').map(stats => {
        assert(stats.isFile())
      }).drain()
    })

    it('should return an errored stream if not', (done) => {
      exists('notfound.py').drain().then(() => done('Should be an errored stream'))
        .catch(() => done())
    })
  })

  describe('isDirectory', () => {
    it('should return a stream of true if found', () => {
      return isDirectory('test').drain()
    })

    it('should return an errored stream if false', (done) => {
      isDirectory('someDir').drain().then(() => done('Should be an errored stream'))
        .catch(() => done())
    })
  })

  describe('isFile', () => {
    it('should return a stream of true if found', () => {
      return isFile('package.json').drain()
    })

    it('should return an errored stream if false', (done) => {
      isFile('someDir').drain().then(() => done('Should be an errored stream'))
        .catch(() => done())
    })
  })

  describe('isLink', () => {
    it('should return an errored stream if false', (done) => {
      isLink('test').drain().then(() => done('Should be an errored stream'))
        .catch(() => done())
    })
  })

  describe('readFile', () => {
    it('should return the contents of a file', () => {
      return readFile('package.json').map(contents => {
        assert(contents.length > 0)
      }).drain()
    })
  })

  describe('findConfig', () => {
    it('should return information of a config file', () => {
      return findConfig('package.json').map(({ path, directory, config }) => {
        assert(typeof path === 'string')
        assert(typeof directory === 'string')
        assert(typeof config === 'object')
        assert(config !== null)
      })
      .drain()
    })
  })
})
