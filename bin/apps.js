const fs = require('fs');
const path = require('path');
const os = require('os');

const join = path.join;
const home = os.homedir();

function getApps(dir = 'Applications') {
	let path = join(home, dir);
	let path2 = join('/', dir);

	let apps = [];
	const list = [
		'Google Chrome',
		'Safari',
		'Opera',
		'Firefox',
		'Brave'
	];
	list.forEach(item => {
		let browser = `${item}.app`;
		if (fs.existsSync(join(path, browser))) {
			apps.push(item);
		}

		if (fs.existsSync(join(path2, browser))) {
			apps.push(item);
		}
	});

	return apps;
}

module.exports = getApps;
