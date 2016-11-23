import * as assert from 'assert';
import { dirname, join } from 'path';
import { stdio } from 'stdio-mock';
import { findNorthbrookConfig } from '../src/findNorthbrookConfig';

describe('findNorthbrookConfig', () => {
  // @TODO: write a test for this that creates a file somewhere to look for it
  it('should return a required() version of a northbrook config', () => {
    const { path, config } =
      findNorthbrookConfig(stdio(), { cwd: join(__dirname, 'testConfigs'), case: false });

    assert.strictEqual(typeof path, 'string');
    assert.strictEqual(typeof config, 'object');

    if (config !== null)
      assert.strictEqual(Array.isArray(config.packages), true);
    else
      assert(config !== null);
  });

  it('returns null if it can not find a northbrook config', () => {
    const { path, config } = findNorthbrookConfig(stdio());
    assert.strictEqual(path, null);
    assert.strictEqual(config, null);
  });
});