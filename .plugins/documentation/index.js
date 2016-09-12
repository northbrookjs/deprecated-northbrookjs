'use strict'
const { join } = require('path')
const fs = require('fs')
const markdox = require('markdox')
const { execSync } = require('child_process')

String.prototype.toCamelCase = function () { // eslint-disable-line no-extend-native
  return this.replace(/[a-z]/g, function (letter, index) {
    return index === 0 ? letter.toUpperCase() : letter.toLowerCase()
  })
}

Array.prototype.sortAlpha = function () { // eslint-disable-line no-extend-native
  return this.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })
}

/**
 * Gets all files in a directory and subdirectories
 */
function getAllInDirectory (directory) {
  return fs.readdirSync(directory).reduce((files, file) => {
    const abspath = join(directory, file)

    if (isFile(abspath)) {
      return files.concat([abspath])
    }

    if (isDirectory(abspath)) {
      return files.concat(getAllInDirectory(abspath))
    }

    return files
  }, [])
}

function isFile (file) {
  try {
    return fs.lstatSync(file).isFile()
  } catch (e) {
    return false
  }
}

function isDirectory (file) {
  try {
    return fs.lstatSync(file).isDirectory()
  } catch (e) {
    return false
  }
}

exports.plugin = function (program, config, directory) {
  program.command('documentation')
    .description('Generate a README for your packages')
    .action(() => {
      const packages = config && config.packages

      packages.forEach(name => {
        const dir = join(directory, name)

        const output = join(dir, 'README.md')
        const template = join(dir, '.template/README.md.ejs')

        if (!isFile(template)) return

        if (!isFile(output)) {
          execSync('touch ' + output)
        }

        console.log('Generating documentation for ' + name + '...')

        const srcFiles = getAllInDirectory(join(dir, 'src'))

        markdox.process(srcFiles, { output, template }, function () {
          console.log('Finished generating documentation for ' + name + '!')
        })
      })
    })
}
