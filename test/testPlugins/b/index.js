const reginn = require('reginn');

const plugin = reginn.command(
  reginn.description('Make some bubbles :D'),
  reginn.alias('bubbles', 'b'),
  reginn.flag('boolean',
    reginn.alias('pop', 'p'),
    reginn.description('Bubble popping')
  )
);

reginn.withPromise(plugin).then(({ args, options }) => {
  console.log(args, options);
});

module.exports = { plugin }