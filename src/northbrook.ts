import { app, command, Command, App, description, flag, alias } from 'reginn';
import { NorthbrookConfig, STDIO, Plugin } from './types';
import { resolvePlugins } from './resolvePlugins';
import { resolvePackages } from './resolvePackages';
import { northrookRun } from './run';
import { prop, clone } from 'ramda';

const defaultStdio: STDIO =
  {
    stdin: process.stdin,
    stderr: process.stderr,
    stdout: process.stdout,
  };

export function northbrook(
  config: NorthbrookConfig,
  additionalPlugins: Array<Plugin> = [],
  cwd: string = process.cwd(),
  stdio?: STDIO,
) {
  process.chdir(cwd);
  stdio = { ...defaultStdio, ...stdio || {} };

  const plugins: Array<Plugin> =
    resolvePlugins(config.plugins || [], cwd, stdio.stderr)
      .concat(additionalPlugins);

  let packages: Array<string> =
    resolvePackages(config.packages || [], cwd, stdio.stderr);

  if (packages.length === 0)
    packages = ['.'];

  config.packages = packages;

  const run = northrookRun(clone(config), stdio);

  const only =
    flag('string',
      alias('only', 'o'),
      description('Execute plugins in only specific packages'),
    );

  const configPath =
    flag('string',
      alias('config', 'c'),
      description('Relative path to your northbrook config'),
    );

  // for display in help menu
  const nb = command(only, configPath);

  return {
    plugins,
    packages,
    start (argv?: Array<string>) {
      argv = argv || process.argv.slice(2);
      run(argv, app(nb, ...plugins.map<Command | App>(prop('plugin'))));
    },
  };
}