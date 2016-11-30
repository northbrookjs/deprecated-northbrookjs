import { EOL } from 'os';
import { Question, input } from 'typed-prompts';

export function scope(): Question {
  return input('scope', 'Select the scope this commit covers:' + EOL, {
    validate: value => !!value,
  });
}