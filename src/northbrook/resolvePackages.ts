import { EOL } from 'os';
import { join, relative } from 'path';
import { statSync, readdirSync, Stats } from 'fs';
import { map, filter, flatten, reduce, concat } from 'ramda';
import { cyan, yellow } from 'typed-colors';
import { Stdio } from './types';

// finds all require()-able packages
export function resolvePackages(
  packages: Array<string>,
  cwd: string = process.cwd(),
  stdio: Stdio,
  debug = false,
): Array<string>
{
  return filter(Boolean, flatten(map(resolvePackage(cwd, stdio, debug), packages)));
}

function resolvePackage(cwd: string, stdio: Stdio, debug: boolean) {
  return function (packagePath: string) {
    // allow shorthand for directories with lots of packages
    if (packagePath.endsWith('*') || packagePath.endsWith('**')) {
      const packagesPath = join(cwd, packagePath.replace(/(\*)+$/, ''));
      const packages = getAllInDirectory(packagesPath);
      return map(name => resolve(join(packagesPath, name), stdio, debug), packages);
    }

    return resolve(join(cwd, packagePath), stdio, debug);
  };
}

// if a directory contains a package.json
function resolve(name: string, stdio: Stdio, debug: boolean) {
  if (hasPkg(name)) {
    if (debug)
      stdio.stdout.write(`${cyan('DEBUG')}: Resolved package: ${name}` + EOL);

    return name;
  };

  stdio.stdout.write(yellow(`WARNING`) + `: Could not resolve package: ${name}` + EOL);

  return null;
}

function hasPkg(path: string): boolean {
  return isFile(join(path, 'package.json'));
}

function getAllInDirectory(rootDirectory: string): Array<string> {
  return reduce((directories: Array<string>, directory: string) => {
    const absolutePath = join(rootDirectory, directory);

    const toRelative = (path: string) =>
      join((relative(rootDirectory, absolutePath), path));

    if (isDirectory(absolutePath))
      return concat(
        concat(directories, [directory]),
        map(toRelative, getAllInDirectory(absolutePath)));

    return directories;
  }, [], readdirSync(rootDirectory));
}

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