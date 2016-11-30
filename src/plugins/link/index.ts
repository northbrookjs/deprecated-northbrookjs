import { command, Command, each, alias, description } from '../../northbrook';

import { getAllDependencies } from './getAllDependencies';
import { createPackages } from './createPackages';

export const plugin: Command =
  command(alias('link'), description('Link together dependent packages'));

each(plugin, function ({ config, pkg }, io) {
  const { packages, allDependencies } = getAllDependencies(config, pkg.config);

  if (allDependencies.length === 0) return Promise.resolve();

  const buildPackages: (resolve: Function, reject: Function) => void =
    createPackages(allDependencies, pkg.path, pkg.name, packages, io);

  return new Promise(buildPackages);
});