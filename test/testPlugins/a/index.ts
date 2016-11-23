import { Plugin } from '../../../src/types';
import { each } from '../../../src/each';

import { command, Command, flag, alias, description } from 'reginn';

const plugin: Command =
  command(
    alias('awesome', 'a'),
    flag('string', alias('opt', 'o'), description('The most awesome command')));

each(plugin, function () {
  console.log(arguments);
});

export = { plugin } as Plugin;