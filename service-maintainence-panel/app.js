// Load config
require('dotenv').config();

// Modules
const app = require('./ks');
const handlebars = require('express-handlebars');
const async = require('async');
const process = require('process');
const fs = require('fs');
const path = require('path');
const Agenda = require('agenda');
// DB config
const mongoUrl = process.env.OVERRIDE_MONGO_URL || process.env.MONGO_URL;

// Load
const agenda = new Agenda({
	db: { address: mongoUrl },
	defaultConcurrency: 1,
	defaultLockLifetime: 10000,
});
addSafeReadOnlyGlobal('_agenda', agenda);

// Init app
app.init({
	'name': process.env.APP_NAME,
	'brand': `The ${process.env.APP_NAME}`,
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',
	'admin path': 'super-admin',
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'emails': 'templates/emails',

	'cloudinary config': {
		cloud_name: 'drj4dg734',
		api_key: '499668317317476',
		api_secret: 'w4LeUlrSyY_UqVsh7uyQ7ITq118',
	},

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'khwsgfierwgf3rglierfoy3ro8gferogferssrfg',
	'signin logo': { src: '/images/logo.png', width: '100%' },
});

app.import('models');

app.set('locals', {
	_: require('lodash'),
	env: app.get('env'),
	utils: app.utils,
	editable: app.content.editable,
});

app.set('routes', require('./routes'));

app.set('cors allow origin', true);

app.set('nav', {
	'Users': ['User']// 'Role', 'Organization', 'Resource'],
	// 'Masters': ['Tag',  'Country', 'Language'],
	// 'Content': ['Video'],
	// 'Vernacular': ['Translation', 'VernacularString'],
	// 'System': ['UpdateHistory', 'Config'],
});

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
		+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
		+ '\n----------------------------------------'
		+ '\nYou have opted into email sending but have not provided'
		+ '\nmailgun credentials. Attempts to send will fail.'
		+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
		+ '\nset up your mailgun integration');
}

let list = fs.readdirSync(path.join('./', 'jobs'));

agenda.on('ready', () => {
	async.mapSeries(list, (item, callback) => {
		if (item.search(/.js$/) !== -1) {
			let name = item.toString().replace(/\.js$/, '');
			const job = require('./' + path.join('./', 'jobs', item.toString()));
			agenda.define(name, job.task.bind(job));
			agenda.every(job.trigger, name);
		}
		callback();
	}, err => {
		if (err) {
			console.log(err);
		} else {
			agenda.start();
		}
	});
});


function addSafeReadOnlyGlobal (prop, val) {
	Object.defineProperty(global, prop, {
		get: function () {
			return val;
		},
		set: function () {
			console.log('You are trying to set the READONLY GLOBAL variable `', prop, '`. This is not permitted. Ignored!');
		},
	});
}

agenda.on('error', err => console.log(err));

app.start();
