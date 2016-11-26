import { EOL } from 'os';
import { App, Command, HandlerApp } from 'reginn';
// avoid reimplementing everything
import { parseArguments, splitArguments } from 'reginn/lib/commonjs/run/parseArguments';
import { matchCommands } from 'reginn/lib/commonjs/run/matchCommands';
import { getCommandFlags } from 'reginn/lib/commonjs/run/getCommandFlags';
import { filterOptions } from 'reginn/lib/commonjs/run/filterOptions';
import { forEach, ifElse } from 'ramda';
import { red, white, yellow, green, bold } from 'typed-colors';
import { cross } from 'typed-figures';
import { deepMerge } from './deepMerge';
import { display } from './display';
import { callCommand } from './callCommand';
import { NorthbrookConfig, Stdio } from '../types';

export function northrookRun(config: NorthbrookConfig, stdio: Stdio) {
  return function run(
    argv: Array<string>, app: App): Promise<HandlerApp>
  {
    const { stdout } = stdio;

    const parsedArguments: any = parseArguments(argv, app.flags);

    // show help if no arguments are passed in
    if (argv.length === 0) {
      stdout.write(bold(`No commands were expressed...` + EOL + EOL));
      parsedArguments.help = true;
    }

    const matchedCommands = matchCommands(app as any, parsedArguments);

    // fail early if no commands have been matched
    if (matchedCommands.length === 0 && !(parsedArguments as any).help) {
      throw new Error(red(bold(cross)) + ' ' +
        white('Can not find command ') +
        (parsedArguments._[0] ? red(bold(`${parsedArguments._[0]}`)) : ''));
    }

    return execute(argv, app, config, stdio, matchedCommands, parsedArguments);
  };
}

function execute(
  argv: string[],
  app: App,
  config: NorthbrookConfig,
  stdio: Stdio,
  matchedCommands: Array<Command>,
  parsedArguments: any,
): Promise<HandlerApp>
{
  const { stdout = process.stdout } = stdio;

  const commandFlags = deepMerge(app.flags, getCommandFlags(matchedCommands as any));
  const [args, options] = splitArguments(parseArguments(argv, commandFlags));

  const filterCommandOptions = filterOptions(options, app.flags, argv);
  const commandCall = callCommand(argv, args, commandFlags, filterCommandOptions, config, stdio);

  if ((parsedArguments as any).help === true) {
    stdout.write(green(bold(`Northbrook`)) + EOL + EOL +
      `${app.commands.map(display)}`
        .replace(new RegExp(`${EOL},`, 'g'), EOL)
        .replace(new RegExp(`${EOL}{2,}`, 'g'), EOL)
        .trim() + EOL + EOL);
  } else {
    // call all matched commands
    forEach(ifElse(hasHandlerFn, commandCall, logWarning(stdout)), matchedCommands);
  }

  return Promise.resolve<HandlerApp>({
    config,
    type: 'app',
    flags: commandFlags,
    commands: matchedCommands,
    args,
    options,
  });
}

function hasHandlerFn (command: Command) {
  return isFunction(command.handler);
}

function isFunction (x: any): boolean {
  return !!(x && x.constructor && x.call && x.apply);
}

function logWarning (stdout: NodeJS.WritableStream) {
  return function (command: Command) {
    const aliases = command.aliases;
    if (aliases.length > 0) {
      const name = aliases[0].name;
      stdout.write(yellow(`${name}`) + white(` does not have an associated handler!` + EOL));
    }
  };
}