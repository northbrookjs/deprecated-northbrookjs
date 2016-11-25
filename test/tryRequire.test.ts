import * as assert from 'assert';
import { tryRequire } from '../src/northbrook/tryRequire';
import * as mocha from 'mocha';

describe('tryRequire', () => {
  it('should return a required package', () => {
    const Mocha = tryRequire('mocha');

    assert.notStrictEqual(Mocha, null);

    const mocha = new Mocha();

    assert.strictEqual(typeof mocha, 'object');
    assert.strictEqual(typeof mocha.addFile, 'function');
  });

  it('should return null if a package cannot be found', () => {
    const pkg = tryRequire<null>('asddfasdfasdfasdfasdfadf');
    assert.strictEqual(pkg, null);
  });
});