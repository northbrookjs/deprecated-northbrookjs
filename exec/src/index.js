import { join } from 'path'
import { EOL } from 'os'
import {
  exec as execp,
  onlyPackage,
  log,
  map,
  concat,
  list,
  listItem,
  figures,
  colors,
  separator
} from '@northbrook/util'

import { empty } from 'most'

export const plugin = function exec (program, config, directory, _action = action) {
  program
    .command('exec [command...]')
    .description('Execute commands in all Northbrook managed packages')
    .option('-o, --only <packageName>', 'Only execute in a single package directory')
    .option('--verbose', 'Prints more information')
    .action((cmd, options) => action(config, directory, cmd, options))
}

export function action (config, directory, cmd, options) {
  if (!config || !directory) {
    throw new Error('exec cannot be run unless ')
  }

  const packages = map(joinc(directory), getPackages(config, options))

  if (packages.length === 0) {
    if (options.only) {
      return log('Cannot find package ' + options.only)
    }
    return log('Cannot find any packages to execute your command :(')
  }

  const command = cmd.join(' ')

  const executables = map(execute(command, options.verbose), packages)

  process.stdout.write(EOL)
  log(figures.pointer + ' ' + command + EOL)

  return list(executables).run()
}

const execute = (command, verbose) => pkg =>
  listItem(getName(pkg), () => run(command, pkg, verbose))

export function setEnv (dir) {
  process.env.NORTHBROOK_EXEC_DIR = dir
  return dir
}

const beforeExit = []
const exit = []

export const run = (command, cwd, verbose) => execp(command, { cwd })
  .tap(() => setEnv(cwd))
  .recoverWith((result) => {
    if (verbose) {
      exit.push({ cwd, command, result })
    }
  })
  .continueWith(result => {
    if (verbose) {
      beforeExit.push({ cwd, command, result })
    }
    return empty()
  })

process.on('beforeExit', () => {
  const calls = concat(map(callBeforeExit, beforeExit), map(callOnExit, exit))

  setTimeout(() => {
    process.exit(0)
  }, (calls.length - 1) * 1100)

  for (let i = 0; i < calls.length; ++i) {
    setTimeout(() => {
      calls[i]()
    }, i * 1000)
  }
})

function callBeforeExit ({ cwd, command, result }) {
  return function () {
    console.log(separator(getName(cwd)))
    console.log(result.stdout)
    console.log(separator())
  }
}

function callOnExit ({ cwd, command, result }) {
  return function () {
    process.stdout.write(separator(getName(cwd)))
    console.log(colorizeNpmFailures(result))
    console.log(separator())
  }
}

// special case for when output is NPM Error output
function colorizeNpmFailures (err) {
  return err && err.replace && err.replace(/npm ERR!/g, colors.white.bgBlack('npm') + ' ' + colors.red.bgBlack('ERR!')) || err
}

export const joinc = parent => child => join(parent, child)
export const getName = dir => require(join(dir, 'package.json')).name

// export functions for testing
export const getPackages = (config, options) =>
  options.only ? onlyPackage(options.only, config.packages) : config.packages

export const getCommand = args => ({ command: args.shift(), args })
