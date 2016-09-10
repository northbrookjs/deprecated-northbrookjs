import { EOL } from 'os'
import chalk from 'chalk'

/* export these as they're useful */
import figures from 'figures'
export { figures }
export { chalk as colors }

/**
 * console.log but prepend new lines with 4 spaces
 */
export function log (...args) {
  if (args.length > 0) {
    process.stdout.write(args.map(modOutput).join(' ') + EOL, { encoding: 'UTF-8' })
  } else {
    process.stdout.write(EOL, { encoding: 'UTF-8' })
  }
}

/**
 *  add 4 spaces to all new lines
 */
export function modOutput (output) {
  return output && output.replace && output.replace(EOL, EOL + '    ') || output
}

/**
 * returns 80 character wide string used to log a separation between
 * outputs
 */
export function separator (packageName) {
  let length = typeof packageName === 'string'
    ? Math.round((76 - packageName.length) / 2)
    : 76 / 2

  if (packageName && packageName.length % 2 !== 0) {
    length = length - 1
  }

  const arr = Array(length)
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = '-'
  }
  const dashes = arr.join('')

  let output = packageName && packageName.length % 2 === 0 && packageName ||
               packageName && packageName + '-' || ''

  return (`${EOL}##` + chalk.white(`${dashes}`) + `${output}` + chalk.white(`${dashes}`) + `##${EOL}`)
}

/**
 * clears the console
 */
export function clear () {
  console.log('\x1Bc')
}
