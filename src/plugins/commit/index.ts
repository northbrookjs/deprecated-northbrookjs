import { EOL } from 'os';
import { join } from 'path';
import { exec } from 'child_process';
import { command, Command, alias, description, withCallback } from '../../northbrook';

import { CommitAnswers, generateCommit, askQuestions } from './questions';

export const plugin: Command =
  command(alias('commit'), description('Powerful git commit messages'));

withCallback(plugin, ({ config }, io) => {
  const packageNames = config.packages.map(toPkgName);

  checkForStagedChanges()
    .then(() => askQuestions(packageNames))
    .then(createCommit)
    .catch((err: Error) => {
      io.stderr.write(err + EOL);
    });
});

function createCommit(answers: CommitAnswers): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const commitMessage = generateCommit(
      answers.type,
      answers.scope,
      answers.subject,
      answers.body,
      answers.affects,
      answers.breakingChange,
      answers.issues,
    );
    exec(`git commit -m "${commitMessage}"`, err => {
      if (err) reject(err);
      resolve();
    });
  });
}

function checkForStagedChanges(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec('git commit --dry-run', (err: Error, out: string, stderr: string) => {
      if (err) {
        if (
          out.indexOf('nothing added to commit') > -1 ||
          out.indexOf('Changes not staged for commit') > -1)
        {
          reject(out);
        } else if (stderr) {
          reject(stderr);
        }

        reject(err);
      }
      resolve();
    });
  });
}

function toPkgName(path: string) {
  console.log(path);
  return require(join(path, 'package.json')).name;
}