import { Command, App } from './';

export interface NorthbrookConfig extends Object<any> {
  plugins: Array<string | App | Command>;
  packages: Array<string>;
}

export interface Plugin {
  plugin: App | Command;
}

export interface Object<T> {
  [key: string]: T;
}

export interface STDIO {
  stdout?: NodeJS.WritableStream;
  stderr?: NodeJS.WritableStream;
  stdin?: NodeJS.ReadableStream;
}

export interface Stdio {
  stdout: NodeJS.WritableStream;
  stderr: NodeJS.WritableStream;
  stdin: NodeJS.ReadableStream;
}