'use strict'
const { join } = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
const markdox = require('markdox')
const ejs = require('ejs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

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
      const p = new Promise((resolve) => {
        let listeners = packages.length

        function finished () {
          if (--listeners === 0) {
            resolve(null)
          }
        }

        packages.forEach(name => {
          const dir = join(directory, name)

          const outDir = join(directory, '.tmp')

          mkdirp(outDir, function (err) {
            if (err) throw err

            const output = join(directory, '.tmp/' + name + '.md')
            const template = join(dir, '.template/docs.md.ejs')

            if (!isFile(template)) {
              return finished()
            }

            if (!isFile(output)) {
              execSync('touch ' + output)
            }

            console.log('Generating documentation for ' + name + '...')

            const srcFiles = getAllInDirectory(join(dir, 'src'))

            markdox.process(srcFiles, { output, template }, function () {
              console.log('Finished generating documentation for ' + name + '!')
              finished()
            })
          })
        })
      })

      p.then(() => {
        mkdirp(join(directory, '.tmp'), (err) => {
          if (err) throw err
          packages.forEach(name => {
            const input = join(directory, '.tmp/' + name + '.md')

            if (!isFile(input)) return

            return execSync(join(directory, './node_modules/.bin/markdown-it') + ' ' + input + ' > ' + join('docs', name + '.html'))
          })
        })
      }).then(() => {
        return rimraf(join(directory, '.tmp'), (err) => {
          if (err) throw err

          const template = ejs.compile(fs.readFileSync(join(__dirname, 'index.html.ejs'), 'utf8'))

          const packagesWithDocs = packages.filter(name => isFile(join(directory, name, '.template/docs.md.ejs')))

          fs.writeFileSync(join(directory, 'docs/index.html'), template({ packages: packagesWithDocs }), 'utf8')
        })
      })
    })
}
