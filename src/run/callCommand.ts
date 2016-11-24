import { Command, CommandFlags, App, HandlerApp, HandlerOptions, Alias } from 'reginn';
import { getCommandFlags } from 'reginn/lib/commonjs/run/getCommandFlags';
import { tail, union } from 'ramda';
import { deepMerge } from './deepMerge';
import { NorthbrookConfig } from '../types';

// extend types
declare module 'reginn' {
  export interface HandlerApp extends App, HandlerOptions { }

  export interface HandlerOptions {
    args: Array<string>;
    options: any;
    config: NorthbrookConfig;
  }

  export interface Handler {
    (input: HandlerOptions | HandlerApp): any;
  }

  export interface Command {
    type: 'command';
    flags: CommandFlags;
    aliases: Array<Alias>;
    commands: Array<Command>;
    description?: string;
    handler?: Handler;
  }
}

export function callCommand(
  argv: string[],
  parsedArgs: string[],
  flags: CommandFlags,
  filter: (command: Command) => CommandFlags,
  config: NorthbrookConfig,
) {
  return function (command: Command) {
    if (!command.handler) return;

    if (command.commands.length > 0) {
      const commandFlags = deepMerge(flags, getCommandFlags(command.commands));
      command.handler(
        createSubApplication(argv, parsedArgs, commandFlags, command, filter, config));
    } else if (command.aliases && command.aliases.length > 0) {
      command.handler({
        config,
        args: tail(parsedArgs),
        options: optionsToCamelCase(filter(command)),
      });
    } else {
      command.handler({
        config,
        args: parsedArgs,
        options: optionsToCamelCase(filter(command)),
      });
    }
  };
}

function optionsToCamelCase(options: any) {
  return Object.keys(options).reduce((acc: any, key: string) => {
    const value = options[key];

    acc[toCamelCase(key)] = value;

    return acc;
  }, {});
}

function toCamelCase(str: string): string {
  return str.replace(/-\w/, (x) => x[1].toUpperCase());
}

function createSubApplication(
  argv: string[],
  parsedArgs: string[],
  commandFlags: CommandFlags, command: Command,
  filter: (command: Command) => CommandFlags,
  config: NorthbrookConfig): HandlerApp
{
  const flags = argv.filter(arg => parsedArgs.indexOf(arg) === -1);
  const args = tail(parsedArgs).concat(flags);

  return {
    type: 'app',
    args,
    options: optionsToCamelCase(filter(command)),
    commands: command.commands,
    flags: commandFlags,
    config,
  };
}
