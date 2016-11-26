import * as assert from 'assert';
import { join } from 'path';
import { stdio } from 'stdio-mock';

import { northbrook } from '../src/northbrook';
import { plugin } from '../src/plugins/exec';

describe('Exec Plugin', () => {
  it('executes a command in each package', (done) => {
    const config = {
      plugins: [],
      packages: ['testPackages/**'],
    };

    const args = ['exec', '--', 'echo', 'hello'];

    const io = stdio();

    let called = 0;
    io.stdout.on('data', function () {
      // twice for each command
      if (++called === 4) {
        setTimeout(done, 100);
      }
    });

    northbrook(config, [{ plugin }], __dirname, io).start(args);
  });
});