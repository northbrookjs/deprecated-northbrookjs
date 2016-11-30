import { EOL } from 'os';

import { CommitMessage } from './types';

// Hackish super dependent upon the way that commit plugin works
export function parseCommitMessage(rawCommit: string): CommitMessage {
  if (rawCommit.trim().startsWith('Merge')) {
    return {
      type: 'merge',
      scope: null,
      subject: rawCommit.split(EOL)[0].trim(),
      body: rawCommit.split(EOL)[1].trim(),
      affects: null,
      breakingChanges: null,
      issuesClosed: null,
      raw: rawCommit,
    };
  }

  const type = rawCommit.split('(')[0];
  const scope = rawCommit.split('(')[1].split('):')[0];
  const subject = rawCommit.split('):')[1].split(EOL)[0];

  const messageBody = rawCommit.split(subject)[1];

  const body = messageBody
    .split('AFFECTS')[0] // ensure doesn't contain affects
    .split('BREAKING')[0] // ensure doesn't contain breaking changes
    .split('ISSUES')[0] // ensure doesn't contain the issues closed
    .replace(new RegExp(`${EOL}{2,}`, 'g'), EOL).trim();

  const affects = getAffects(messageBody);
  const breakingChanges = getBreakingChanges(messageBody);
  const issuesClosed = getIssuesClosed(messageBody);

  return {
    type: type.trim(),
    scope: scope.trim(),
    subject: subject.trim(),
    body,
    affects,
    breakingChanges,
    issuesClosed,
    raw: rawCommit,
  };
}

function getAffects(messageBody: string) {
  const affects = messageBody.split('AFFECTS:')[1];

  if (!affects) return null;

  return affects.split(EOL + EOL)[0].trim().split(',');
}

function getBreakingChanges(messageBody: string) {
  const breakingChanges = messageBody.split('BREAKING CHANGES:')[1];

  if (!breakingChanges) return null;

  return breakingChanges.split(EOL + EOL)[0].trim();
}

function getIssuesClosed(messageBody: string) {
  const issuesClosed = messageBody.split('ISSUES CLOSED:')[1];

  if (!issuesClosed) return null;

  return issuesClosed.trim().split(',');
}