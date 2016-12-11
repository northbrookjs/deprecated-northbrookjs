import { EOL } from 'os';
import { join } from 'path';
import { spawn } from 'child_process';
import { pointer } from 'typed-figures';
import { bold, cyan, italic, red } from 'typed-colors';
import { command, Command, alias, each, description, Stdio } from '../../northbrook';

const m: {
  addPath: (dir: string) => void,
  removePath: (dir: string) => void,
} = require('app-module-path');

export const plugin: Command =
  command(alias('exec'), description('Execute commands in all managed packages'));

each(plugin, function ({ pkg, args }, io) {
  const { name, path } = pkg;

  const cmd = args.shift() as string;

  const stdio = [
    io.stdin === process.stdin ? 'inherit' : 'pipe',
    io.stdout === process.stdout ? 'inherit' : 'pipe',
    io.stderr === process.stderr ? 'inherit' : 'pipe',
  ];

  m.addPath(path);
  m.addPath(join(path, 'node_modules'));

  return new Promise(execute(name, path, io, cmd, args, stdio))
    .catch(logError(io.stderr))
    .then(() => {
      m.removePath(path);
      m.removePath(join(path, 'node_modules'));
    });
});

const logError = (stderr: NodeJS.WritableStream) => (e: Error) =>
  stderr.write(EOL + red(`ERROR`) + `: ${e.message}` + EOL + EOL);

function execute(
  name: string,
  path: string,
  io: Stdio,
  cmd: string,
  args: Array<string>,
  stdio: any)
{
  return function (resolve: Function, reject: Function) {
    io.stdout.write(bold(pointer +
      ` ${cyan(name)} - ` + italic(`${cmd as string} ${args.join(' ')}`)
      + EOL + EOL,
    ));

    const cp = spawn(cmd, args, { cwd: path, stdio });

    if (stdio[0] === 'pipe')
      io.stdin.pipe(cp.stdin);

    if (stdio[1] === 'pipe')
      cp.stdout.on('data', d => io.stdout.write(d));

    if (stdio[2] === 'pipe')
      cp.stderr.on('data', d => io.stderr.write(d));

    cp.on('close', writeAndEnd(io.stdout, resolve));
    cp.on('end', writeAndEnd(io.stdout, resolve));
    cp.on('error', writeAndEnd(io.stderr, reject));
  };
}

function writeAndEnd(writable: NodeJS.WritableStream, end: Function) {
  return function (x: any) {
    writable.write(EOL);
    end(x);
  };
}