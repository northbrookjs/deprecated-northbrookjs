import { EOL } from 'os';
import { spawn } from 'child_process';
import { pointer } from 'typed-figures';
import { bold, cyan, italic, red } from 'typed-colors';
import { Plugin, command, Command, alias, each, description } from '../../northbrook';

const m: any = require('mississippi');

export const plugin: Command =
  command(alias('exec'), description('Execute commands in all managed packgaes'));

each(plugin, function ({ pkg, args }, { stdout, stderr }) {
  const { name, path } = pkg;

  const cmd = args.shift() as string;
  const stdio = ['inherit', 'pipe', 'pipe'];

  return new Promise(execute(name, path, stdout, stderr, cmd, args, stdio))
    .catch(logError(stderr));
});

const logError = (stderr: NodeJS.WritableStream) => (e: Error) =>
  stderr.write(EOL + red(`ERROR`) + `: ${e.message}` + EOL + EOL);

function execute(
  name: string,
  path: string,
  stdout: NodeJS.WritableStream,
  stderr: NodeJS.WritableStream,
  cmd: string,
  args: Array<string>,
  stdio: Array<string>)
{
  return function (resolve: Function, reject: Function) {
    stdout.write(bold(pointer +
      ` ${cyan(name)} - ` + italic(`${cmd as string} ${args.join(' ')}`)
      + EOL + EOL,
    ));

    const cp = spawn(cmd as string, args.map(String), { cwd: path, stdio });

    cp.stdout.on('data', d =>
      stdout.write(`  ` + d.toString().replace(new RegExp(EOL, 'g'), '  ' + EOL)));

    cp.stderr.on('error', e => stderr.write(red(e.name + ' ' + e.message)));

    const printAndClose = (x: any) =>
      stdout.write(EOL) && resolve(x);

    cp.on('close', printAndClose);
    cp.on('end', printAndClose);
    cp.on('error', stderr.write && reject);
  };
}