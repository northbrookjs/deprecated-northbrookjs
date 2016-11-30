import { EOL } from 'os';
import { exec } from 'child_process';
import { valid } from 'semver';

export function gitLatestTag(): Promise<string> {
  const regex = /tag:\s*(.+?)[,\)]/gi;
  const cmd = 'git log --decorate --no-color';

  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: Infinity }, function (err, data) {
      if (err) reject(err);

      const lines = data.split(EOL);
      const tags = [];

      for (let i = 0; i < lines.length; ++i) {
        let match;

        while (match = regex.exec(lines[i])) {
          if (valid(match[1])) {
            tags.push(match[1]);
          }
        }
      }

      resolve(tags[0]);
    });
  });
}
