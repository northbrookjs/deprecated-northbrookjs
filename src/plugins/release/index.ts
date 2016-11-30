import { command, Command, alias, description } from '../../northbrook';

export const plugin: Command =
  command(alias('release'), description('Automate package release'));