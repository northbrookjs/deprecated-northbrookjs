import { join, dirname } from 'path';
import { writeFile, statSync, Stats } from 'fs';
import { EOL } from 'os';
import { union } from 'ramda';
import { cyan, bold } from 'typed-colors';
import { pointer } from 'typed-figures';
import * as mkdirp from 'mkdirp';

import { Plugin, command, Command, each, alias } from '../../northbrook';

// array of fields that represent relative paths and should be altered
const pathFields: Array<string> =
  [
    'main',
    'jsnext:main',
    'module',
    'typings',
  ];

export const plugin: Command = command(alias('link'));

each(plugin, function ({ config: nbConfig, pkg }, io) {
  const { path, config, name } = pkg;

  const packages = new Map<string, any>();

  nbConfig.packages.forEach(getName(packages));

  const packageNames = Array.from(packages.keys());

  const devDeps: Array<string> = getDependencies(config.devDependencies, packageNames);
  const peerDeps: Array<string> = getDependencies(config.peerDependencies, packageNames);
  const deps: Array<string> = getDependencies(config.dependencies, packageNames);

  const allDeps: Array<string> = union(union(devDeps, peerDeps), deps);

  const depCount = allDeps.length;

  if (depCount === 0) return Promise.resolve();

  return new Promise((resolve, reject) => {
    mkdirp(join(path, 'node_modules'), (err => {
      if (err) reject(err);

      io.stdout.write(EOL + pointer + ` ${name} ` + EOL);

      for (let i = 0; i < depCount; ++i) {
        const depName = allDeps[i];
        const destination = join(path, 'node_modules', depName);

        mkdirp(destination, (e) => {
          if (e) reject(e);

          const dep: { pkg: any, path: string } = packages.get(depName);

          io.stdout.write(`  linking ${dep.pkg.name}... `);
          const depPackage = JSON.stringify(modifyPackage(dep.pkg, dep.path));

          writeFile(join(destination, 'package.json'), depPackage + EOL, (er) => {
            if (er) reject(er);

            io.stdout.write(`Finished!` + EOL);

            resolve();
          });
        });
      }
    }));
  });
});

function modifyPackage(pkg: any, path: string) {
  for (let i = 0; i < pathFields.length; ++i) {
    const fieldName = pathFields[i];

    if (pkg[fieldName])
      pkg[fieldName] = join(path, pkg[fieldName]);
  }

  return pkg;
}

function getName(packageMap: Map<string, any>) {
  return function (name: string) {
    const pkg = require(join(name, 'package.json'));
    packageMap.set(pkg.name, { pkg, path: name });
  };
}

function getDependencies(deps: any, packageNames: Array<String>): Array<string> {
  if (!deps) return [];
  return Object.keys(deps).filter(name => packageNames.indexOf(name) > -1);
};

function exists (pathname: string): Stats | false {
  try {
    return statSync(pathname);
  } catch (e) {
    return false;
  }
}

function isDirectory (pathname: string): boolean {
  const stats = exists(pathname);
  return stats ? stats.isDirectory() : false;
}

function isFile(pathname: string): boolean {
  const stats = exists(pathname);
  return stats ? stats.isFile() : false;
}