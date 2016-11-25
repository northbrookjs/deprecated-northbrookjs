import { join } from 'path';
import { Command, withCallback, HandlerApp, HandlerOptions } from 'reginn';
import { NorthbrookConfig } from './types';
import { tryRequire } from './tryRequire';

export function each(command: Command, callback: EachCallback) {
  command.handler = function (input: any) {
    const { config, options } = input;

    const packages = config.packages.map((path: string) => {
      const pkg = require(join(path, 'package.json'));

      return {
        path,
        config: pkg,
        name: pkg.name,
      };
    });

    const onlyPackages: Array<any> = options.only
      ? options.only.split(',')
      : packages.map((p: any) => p.name);

    packages.filter((p: any) => onlyPackages.indexOf(p.name) > -1).forEach(
      function (pkg: { path: string, name: string, config: any }) {
        callback(Object.assign({}, input, { pkg }));
      },
    );
  };
}

export type EachPkg =
  { pkg: { path: string, name: string, config: any } };

export type EachHandlerOptions =
  HandlerApp & EachPkg |
  HandlerOptions & EachPkg;

export interface EachCallback {
  (input: EachHandlerOptions): any;
}