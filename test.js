import test from 'ava';
import execa from 'execa';
import pkg from './package';

test('Main', () => {
	execa('./bin/cli.js', ['--version']).then(res => {
		let out = res.stdout;
		if (out === pkg) {
			return true;
		}
		return false;
	});
});
