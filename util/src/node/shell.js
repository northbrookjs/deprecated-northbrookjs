import { concat } from 'most'
import create from '@most/create'

import execa from 'execa'
import Listr from 'listr'

import { apply, always } from '../function'
import { tail, map } from '../array'

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * exec :: string ➞ Stream<string>
 * exec :: string ➞ Object ➞ Stream<string>
 *
 * Shell
 *
 * Executes a command returning a stream of the result.
 *
 * #### Example
 * ```js
 * import { exec } from '@northbrook/util'
 *
 * exec('echo hello').map(result ⇒ {...})
 * ```
 * @name exec
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

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 * exec.many :: [string] ➞ Stream<string>
 *
 * Shell
 *
 * Executes many commands in succession to each other returning a Stream of the last commands output.
 *
 * #### Example
 * ```js
 * import { exec } from '@northbrook/util'
 *
 * exec.many(cmd1, cmd2).map(cmd2Result ⇒ {...})
 * ```
 * @name exec.many
 */
exec.many = function execMany (...commands) {
  return apply(concat, map(exec, commands)).multicast()
}

export { exec }

/** <!--
 * small arrow ➞ fat arrow ⇒ star ⭑
 * -->
 *
 * list :: [Object] ➞ TaskList
 * list :: [Object] ➞ object -> TaskList
 *
 * Shell
 *
 * Creates a task list used for showing progress of tasks for the user.
 *
 * #### Example
 * ```js
 * import { list, exec } from '@northbrook/util'
 *
 * const tasks = list([{
 *   title: 'Foo',
 *   task: () => exec('echo "foo"')
 * }])
 *
 * tasks.run()
 * ```
 * @name list
 */
export function list (items, options) {
  return new Listr(items, options)
}

/**
 * * listItem :: string ➞ (() ➞ Stream<⭑> | Promise<⭑>) ➞ object
 * * listItem :: string ➞ (() ➞ Stream<⭑> | Promise<⭑>) ➞ (() ➞ boolean) ➞ object
 *
 * Shell
 *
 * Creates a listItem to be used inside of a list.
 *
 * #### Example
 * ```js
 * import { listItem } from '@northbrook/util'
 *
 * listItem('Foo', () => exec('echo "foo"')) // { title: 'Foo', task: () => exec('echo "foo"'), skip: () => false }
 * ```
 * @name listItem
 */
export function listItem (title, task, skip = always(false)) {
  return { title, task, skip }
}
