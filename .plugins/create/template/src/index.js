import northbrook from 'northbrook'

export const plugin = {{ name }}

function {{ name }} (program, config, directory) {
  program
    .command('{{ name }}')
    .description('{{ description }}')
    .action(() => action(config, directory))
}

function action (config, directory) {

}
