import { gitLatestTag } from './gitLatestTag';
import { gitRawCommits } from './gitRawCommits';
import { Commit } from './types';

export * from './types';

export function changedPackages(): Promise<any> {
  const rawCommits: Promise<Array<Commit>> =
    gitLatestTag().then(gitRawCommits);

  return rawCommits.then(getAffectedPackages);
}

function getAffectedPackages(commits: Array<Commit>) {
  const affectedCommits: { [key: string]: { name: string, commits: Array<Commit> } } = {};

  commits
    .forEach(function (commit: Commit) {
      const affects = commit.message.affects;


      if (!affects) return;

      affects.forEach(name => {
        if (!affectedCommits[name]) {
          affectedCommits[name] = {
            name,
            commits: [commit],
          };
        } else {
          affectedCommits[name].commits.push(commit);
        }
      });
    });

  return affectedCommits;
};