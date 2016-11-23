import { EOL } from 'os';
import { App, Command, HandlerApp, Handler, Alias, CommandFlags } from 'reginn';
// avoid reimplementing everything
import { parseArguments, splitArguments } from 'reginn/lib/commonjs/run/parseArguments';
import { matchCommands } from 'reginn/lib/commonjs/run/matchCommands';
import { getCommandFlags } from 'reginn/lib/commonjs/run/getCommandFlags';
import { filterOptions } from 'reginn/lib/commonjs/run/filterOptions';
import { forEach, ifElse, mergeWith, is, concat } from 'ramda';
import { red, white, yellow, green, bold } from 'typed-colors';
import { cross } from 'typed-figures';
import { deepMerge } from './deepMerge';
import { display } from './display';
import { callCommand } from './callCommand';
import { NorthbrookConfig, STDIO } from '../types';

export function northrookRun(config: NorthbrookConfig, stdio: STDIO) {
  return function run(
    argv: Array<string>, app: App): Promise<HandlerApp>
  {
    const { stdout = process.stdout } = stdio;

    // show help if no arguments are passed in
    if (argv.length === 0) {
      stdout.write(bold(`No commands were expressed...` + EOL + EOL));
      argv = ['--help'];
    }

    const parsedArguments = parseArguments(argv, app.flags);
    const matchedCommands = matchCommands(app, parsedArguments);

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
  stdio: STDIO,
  matchedCommands: Array<Command>,
  parsedArguments: any,
): Promise<HandlerApp>
{
  const { stdout = process.stdout } = stdio;

  const commandFlags = deepMerge(app.flags, getCommandFlags(matchedCommands));
  const [args, options] = splitArguments(parseArguments(argv, commandFlags));

  const filterCommandOptions = filterOptions(options, app.flags, argv);
  const commandCall = callCommand(argv, args, commandFlags, filterCommandOptions, config);

  if ((parsedArguments as any).help === true) {
    stdout.write(green(bold(`Northbrook`)) + EOL +
      `${EOL}${app.commands.map(display)}`.replace(`${EOL},`, `${EOL}`) + EOL);
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