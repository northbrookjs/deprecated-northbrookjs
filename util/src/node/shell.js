import { concat } from 'most'
import create from '@most/create'

import execa from 'execa'
import Listr from 'listr'

import { apply, always } from '../function'
import { tail, map } from '../array'

/**
 * returns most.js stream of executed commmand
 */
function exec (cmd, options) {
  const args = cmd.split(' ')

  return create((next, complete, error) => {
    const cp = execa(args[0], tail(args), options)

    next(cmd)

    cp.then((result) => {
      next(result.stdout)
      complete(result)
    }).catch(({ stdout, stderr }) => {
      next(stdout)
      error(stderr || stdout)
    })
  }).multicast()
}

exec.many = function execMany (...commands) {
  return apply(concat, map(exec, commands)).multicast()
}

export { exec }

export function list (items, options) {
  return new Listr(items, options)
}

export function listItem (title, task, skip = always(false)) {
  return { title, task, skip }
}
