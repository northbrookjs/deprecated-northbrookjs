import { exec } from 'child_process';
import { Commit } from './types';
import { parseCommitMessage } from './parseCommitMessage';

export function gitRawCommits(from: any): Promise<Array<Commit>> {
  const separator = '-----------';
  const format = '%H' + separator + // commit hash
    '%h' + separator + // abbreviated commit hash;
    '%an' + separator + // author name
    '%ae' + separator + // author email
    '%ct' + separator + // author data UNIX timestamp
    '%B' + separator; // raw body
  const cmd = `git log --format=${format} ${from}..HEAD`;

  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: Infinity }, function (err: Error, stdout: string, stderr: string) {
      if (err) {
        if (stderr) reject(stderr);
        reject(err);
      }

      const hashesAndMessages = stdout.split(separator);
      const commits = [];

      for (let i = 0; i < hashesAndMessages.length; i = i + 6) {
        // usually end up with an extra "empty" set
        if (!hashesAndMessages[i + 5]) break;

        const hash = hashesAndMessages[i].replace('\n', '');
        const abbreviatedHash = hashesAndMessages[i + 1];
        const authorName = hashesAndMessages[i + 2];
        const authorEmail = hashesAndMessages[i + 3];
        const time = parseInt(hashesAndMessages[i + 4]);
        const message = hashesAndMessages[i + 5];

        commits.push({
          hash,
          abbreviatedHash,
          authorEmail,
          authorName,
          time,
          message: parseCommitMessage(message),
        });
      }

      resolve(commits);
    });
  });
};