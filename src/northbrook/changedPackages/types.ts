export interface Commit {
  hash: string;
  abbreviatedHash: string;
  authorEmail: string;
  authorName: string;
  time: number;
  message: CommitMessage;
}

export type NoUpdate = 0;
export type PatchUpdate = 1;
export type MinorUpdate = 2;
export type MajorUpdate = 3;

export type SuggestedUpdate =
  NoUpdate | PatchUpdate | MinorUpdate | MajorUpdate;

export interface CommitMessage {
  type: string;
  scope: string | null;
  subject: string;
  body: string;
  affects: Array<string> | null;
  breakingChanges: string | null;
  issuesClosed: Array<string> | null;
  suggestedUpdate: SuggestedUpdate;
  raw: string;
}