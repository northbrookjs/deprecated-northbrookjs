import { EOL } from 'os';
import { Command, Alias, CommandFlags } from 'reginn';
import { green, white, underline, bold } from 'typed-colors';

export function display (command: Command) {
  return `${command.aliases.map(displayAlias)}` +
    `${command.description ? '  -  ' + bold(command.description) : ''}` +
    `${EOL} ${displayFlags(command.flags)}` + EOL + EOL;
}

function displayAlias (alias: Alias) {
  return green(alias.name === alias.abbreviation
    ? `${underline(alias.name)}`
    : `${underline(alias.name)} ${white('-' + alias.abbreviation)}`);
}

function displayFlags(flags: CommandFlags) {
  const aliases = flags.alias || {};

  const _strings = flags.string && Array.isArray(flags.string)
    ? flags.string
    : [flags.string as any as string];

  /* tslint:disable max-line-length */
  const strings = _strings.filter(Boolean)
    .map(x => `--${x}${aliases && aliases[x] ? ', -' + aliases[x] : ''}` +
    `${(flags as any).description && (flags as any).description[x] ? '  :  ' + (flags as any).description[x] : ''}`);

  const booleanFlags = flags.boolean
    ? typeof flags.boolean === 'string' ? [flags.boolean] : flags.boolean
    : [``];

  const booleans = booleanFlags.filter(Boolean).map(x => `--${x}${aliases && aliases[x] ? ', -' + aliases[x] : ''}` +
    `${(flags as any).description && (flags as any).description[x] ? '  :  ' + (flags as any).description[x] : ''}`);
  /* tslint:enable max-line-length */

  return strings.join(EOL) + booleans.join(EOL);
}
