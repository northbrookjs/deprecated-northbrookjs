import { EOL } from 'os';
import { join } from 'path';
import * as assert from 'assert';
import { stdio } from 'stdio-mock';
import { resolvePlugins } from '../src/northbrook/resolvePlugins';

const pluginPath = join(__dirname, 'testPlugins');

describe('resolvePlugins', () => {
  it('returns an array of require()d plugins', () => {
    const plugins = resolvePlugins(['a', 'b', 'c'], pluginPath, stdio());
    assert.strictEqual(plugins.length, 2);
  });

  it('should write to stderr which plugins failed to load', (done) => {
    const io = stdio();

    io.stderr.on('data', (data: string) => {
      assert.equal(data.toString(), 'Could not resolve plugin: c' + EOL);
      done();
    });

    resolvePlugins(['c'], pluginPath, io);
  });
});