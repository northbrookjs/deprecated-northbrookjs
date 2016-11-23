import * as assert from 'assert';
import { northbrook, NorthbrookConfig, command, alias, withPromise } from '../src';
import { stdio } from 'stdio-mock';

const config: NorthbrookConfig =
  {
    packages: ['testPackages/*'],
    plugins: ['testPlugins/a', 'testPlugins/b'],
  };

const cwd = __dirname;

describe('northbrook', () => {
  it('should match and run plugins', (done) => {
    const plugin = command(alias('hello'));

    withPromise(plugin).then(() => {
      done();
    });

    const { stdout, stderr } = stdio();

    const additionalPlugins = [ { plugin } ];

    const { start, plugins, packages } =
      northbrook(config, additionalPlugins, cwd, { stdout, stderr });

    assert.strictEqual(plugins.length, 3);
    assert.strictEqual(packages.length, 2);

    start(['hello']);
  });
});