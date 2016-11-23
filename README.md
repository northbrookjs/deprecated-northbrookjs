# Northbrook ![](https://img.shields.io/badge/license-MIT-blue.svg)

> Reproducible tooling & configuration

Northbrook helps you start new projects with blazing speed. Northbrook is the
missing `extends` field in your project's package.json.

Northbrook allows you to define how your project is built, maintained, tested,
and virtually anything else your applicatio needs to do. By allowing
the user to define the requirements of your application in a central location,
you are able to reuse or extend existing configurations allowing you to create
new projects with ease, blazing speed, and most importantly, **consistency**.

The design of Northbrook is agnostic to the number of packages that you need to
manage. This means, that you can just as easily use it to manage a single
package or a monorepo with 100+ packages and share the same benefits.

This project encourages smart defaults that cover the most common use cases, but
should allow configuration where needed for advanced needs.

Northbrook does not attempt to replace the package.json for things it does well,
and the same goes for other tools it builds on, and plugins should strive
to do the same.

## This is for me!
```sh
# with npm
npm install --save-dev northbrook
# with yarn
yarn add --dev northbrook
```

[Yarn](https://yarnpkg.com/) is a next-generation package manager designed to be
used with the NPM registry, it is absolutely not required, but I highly recommend
it if your project needs consistent builds, or more control over dependencies.

## Project Goals

- Manage projects with ease, including multi-package repositories (monorepos)
- Useful out of box with no configuration
- Automated [compatible versioning](https://github.com/staltz/comver)
- Extensible and configurable via plugins
- Highly reusable, and versionable, configurations
- Well Documented
- Well-Typed with TypeScript

## Documentation and Community

This is a passion project, and as such it's too easy to write
documentation that assumes knowledge that perhaps only core contributors have.
A real goal of the project is to make as many user's lives as easy as possible
and documentation is paramount to that goal. Please, if you see something that isn't
documented, isn't clear, or just plain sucks, open an issue! Let us know! Better
yet, your contribution as a pull request would be graciously welcomed!

Building Community around a project is so important for the longevity of a project.
We want to personally state that everyone is welcome here, and any misconduct will
not be tolerated. Your contributions in the form of bug reports, pull requests,
and feature requests are vital and I want to hear them all, don't be shy. :smile:

Please be mindful that this is an open-source project developed only on the free
time of it's contributors. We want to help, but time is a precious thing, so please
be understanding and sensitive to these types of circumstances.

## Plugins

Northbrook uses the concept of plugins. Plugins are used to introduce new
functionality to your applications. These can be tools to transpile your source
code, tools to help you get started with testing, build documentation, or
anything that can be done with node.js and JavaScript. Some examples may be

- Building with TypeScript / Babel / Buble
- Testing with Mocha / Karma
- Bundling with Rollup / Browserify / Webpack
- Building documentation
- Scaffolding new packages

Plugins should **not** introduce configuration into a `northbrook.js` that
is already covered by other mechanisms. For instance, a plugin for Babel has no
need to introduce a way to configure Babel plugins since there already exists a
`.babelrc` to do just that. The same goes for a plugin for TypeScript as
`tsconfig.json` already exists to configure how to build your projects. This is
especially important when it come to editor integration as your TypeScript
plugins are already looking for your `tsconfig.json`.

```js
// northbrook.js
// or
// northbrook.ts
{
  "plugins": [
    "typescript",
    "tslint"
  ]
}
```

More information on the Plugin API can be found [here](#pluginapi)

## Prior Art

Developing in monorepos, where you have many packages in a single repository,
like the Babel or Cycle.js projects, can have numerous benefits for developing
many closely-related packages. However many problems can quickly arise.

Babel uses a project called [Lerna](https://github.com/lerna/lerna). It's a
wonderful tool with many many features that Northbrook does not have
(without plugins). My frustrations with Lerna was it's lack of support for
TypeScript based on the way that it does interdependency linking.

Cycle.js uses a set of bash scripts to manage the project and are entirely custom
to the project and work incredibly well. The largest issue in which I have found
is that it requires installing many of the dependencies locally to each package that
are common to many of the others and leads to slower install times. Secondly by using
bash scripts, it forces Windows users to either install a Linux VM or use Ubuntu On Windows.

## Additional Features for Monorepos

### Alternative languages

Northbrook will use symbolic links to create your interdependencies allowing the
support of alternative languages such as TypeScript. Northbrook's linking features
will honor the declarations inside of your package.json `files` and
also any ignored files from a `.npmignore` if either of those are present.

### Single installation of dependencies

Northbrook has been designed to allow plugins to move your devDependencies to
the top-level. Allowing for a dependency like TypeScript to be installed 1 time
and used for all managed packages. This could help cut the build time for
projects like Cycle.js to focus on the important stuff, tests!

Benefits:

- All packages use the same version of a given dependency
- Dependency installation time is reduced
- Less storage is needed

### Single configuration

Just like dependencies, configurations are now allowed to exist at the top-level
to only be configured once. Configurations such as a `tsconfig.json` can be
declared once at the root level, and reused across all of your packages. This
leads to less inconsistency.

## <a href="clioptions">Command Line Options</a>

More to come in the future. This is still being designed!

## <a href="#pluginapi">Plugin API</a>

More to come in the future. This is still being designed!
