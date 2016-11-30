export interface Commit {
  hash: string;
  abbreviatedHash: string;
  authorEmail: string;
  authorName: string;
  time: number;
  message: CommitMessage;
}

export interface CommitMessage {
  type: string;
  scope: string | null;
  subject: string;
  body: string;
  affects: Array<string> | null;
  breakingChanges: string | null;
  issuesClosed: Array<string> | null;
  raw: string;
}