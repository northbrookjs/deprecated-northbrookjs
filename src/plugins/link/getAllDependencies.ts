import { join } from 'path';
import { union, forEach } from 'ramda';
import { NorthbrookConfig } from '../../northbrook';

export function getAllDependencies(nbConfig: NorthbrookConfig, packageJson: any) {
  const packages = new Map<string, any>();

  forEach(getPackageName(packages), nbConfig.packages);

  const packageNames: Array<string> =
    Array.from(packages.keys());

  const devDependencies: Array<string> =
    findDependencies(packageJson.devDependencies, packageNames);

  const peerDependencies: Array<string> =
    findDependencies(packageJson.peerDependencies, packageNames);

  const dependencies: Array <string> =
    findDependencies(packageJson.dependencies, packageNames);

  const allDependencies: Array<string> =
    union(union(devDependencies, peerDependencies), dependencies);

  return { packages, allDependencies };
}

function getPackageName(packageMap: Map<string, any>) {
  return function (name: string) {
    const pkg = require(join(name, 'package.json'));
    packageMap.set(pkg.name, { pkg, path: name });
  };
}

function findDependencies(dependencies: any, packageNames: Array<String>): Array<string> {
  if (!dependencies) return [];

  return Object.keys(dependencies)
    .filter(name => packageNames.indexOf(name) > -1);
};
