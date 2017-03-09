import test from 'ava';
import execa from 'execa';
import pkg from './package.json';

test('Main', () => {
  const {stdout} = await execa('./bin/cli.js', ['--version']);
	t.true(stdout.length > 0);
});
