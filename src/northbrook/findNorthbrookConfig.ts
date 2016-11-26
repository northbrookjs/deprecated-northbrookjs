import { EOL } from 'os';
import { dirname } from 'path';
import { cross } from 'typed-figures';
import { red, bold } from 'typed-colors';
import findup = require('findup-sync');

import { STDIO, NorthbrookConfig } from './types';

const NORTHBROOK_CONFIG =
  ['northbrook.ts', 'northbrook.js'];

export type PathConfig =
  { path: null, config: null } |
  { path: string, config: NorthbrookConfig };

/**
 * Find the path of a northbrook.js file and require it.
 *
 * @export
 * @param {STDIO} [stdio]
 * @returns {({ path: string, config: NorthbrookConfig } | null)}
 */
export function findNorthbrookConfig(
  stdio: STDIO = {}, options?: { cwd?: string, case?: boolean }): PathConfig
{
  // require ts-node to be able to load `northbrook.ts`
  require('ts-node/register');

  const { stderr = process.stderr } = stdio;

  const northbrookFilePath: string = findup(NORTHBROOK_CONFIG, options);

  if (!northbrookFilePath) {
    stderr.write(EOL + bold(`${red(cross)} `
      + bold(`Failed to find your Northbrook configuration file`)
      + EOL + EOL,
    ));

    return { path: null, config: null };
  }

  const config: NorthbrookConfig = require(northbrookFilePath);

  const path: string = dirname(northbrookFilePath);

  return { path, config };
}