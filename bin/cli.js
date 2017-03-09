#! /usr/bin/env node

// Ext Modules
const Conf = require('conf');
const inquirer = require('inquirer');
const normalizeURL = require('normalize-url');
const urlRegex = require('url-regex');
const meow = require('meow');
const clear = require('clear');
const open = require('open');

// Personal Modules
const getApps = require('./apps.js');

// General Variables
const prompt = inquirer.prompt;
const config = new Conf();
const cli = meow(`
  Usage
    $ home

  Help
    -u --url
    -a --app
`);

// Check the url
function checkURL(str) {
	let url = normalizeURL(str);

	if (urlRegex().test(url)) {
		return true;
	}

	return false;
}

// Core Function
function home(actions, flags) {
	if (flags.app) {
		prompt([
			{
				name: 'app',
				message: 'Wich browser do you want use?',
				type: 'list',
				choices: getApps(),
				validate: val => {
					switch (val.toLowerCase()) {
						case 'google chrome':
						case 'opera':
						case 'firefox':
						case 'safari':
						case 'brave':
							return true;

						case 'internet explorer':
						case 'edge':
						default:
							return 'Hey! This is not a browser!';
					}
				}
			}
		]).then(answ => {
			if (answ.app) {
				clear();
				console.log('I\'ll open it with', answ.app);
				console.log();
				config.set('browser', answ.app);
			}
		});
	} else if (flags.url) {
		prompt([
			{
				name: 'url',
				message: 'Set new Home Page:',
				default: 'https://google.com',
				validate: value => {
					if (checkURL(value)) {
						return true;
					}

					return 'Your url is not valid!';
				}
			}
		]).then(answ => {
			if (answ.url) {
				config.set('home', normalizeURL(answ.url));
				clear();
				console.log(`New homepage!:  ${normalizeURL(answ.url)}`);
				console.log();
			}
		});
	} else if (config.get('home') && config.get('home') !== '' && config.get('home') !== ' ') {
		clear();
		if (process.platform === 'darwin') {
			console.log('Opening', config.get('home'));
			if (config.get('browser')) {
				open(config.get('home'), config.get('browser'));
			} else {
				open(config.get('home'));
			}
		} else {
			console.log('I\'m sorry! You are not on macOS!');
			console.log();
		}
		console.log();
	} else {
		clear();
		console.log('Home not assigned!');
		console.log();
	}
}

home(cli.input[0], cli.flags);
