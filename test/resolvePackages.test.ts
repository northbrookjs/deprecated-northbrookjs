import * as assert from 'assert';
import { resolvePackages } from '../src/resolvePackages';
import { stdio } from 'stdio-mock';

describe('resolvePackages', () => {
  it('returns an empty array if no packages are found', () => {
    assert.strictEqual(resolvePackages(['./'], __dirname, stdio().stderr).length, 0);
  });

  it('returns an array of absolute paths for packages found', () => {
    const packages = resolvePackages(['./testPackages/**'], __dirname, stdio().stderr);

    assert.strictEqual(packages.length, 2);
  });

  it('writes to stderr if for packages not found', (done) => {
    const stderr = stdio().stderr;

    stderr.on('data', (data: Buffer | string) => {
      assert.ok(data.toString().indexOf('Could not resolve package:') === 0)
      done();
    });

    resolvePackages(['./testPackages/**'], __dirname, stderr);
  });
});