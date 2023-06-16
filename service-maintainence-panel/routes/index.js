/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('../ks');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);
const Agendash = require('agendash');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
const routes = {
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {

	
	// Views
	app.get('/', routes.views.index);

	// agenda dash 
	app.use('/jobs/admin', middleware.requireUserWithTargetUrl('/jobs/admin'), Agendash(_agenda));

	// mail test util
	app.use('/util/templates', middleware.requireUserWithTargetUrl('/util/templates'), routes.views.mailTemplateUtil);

};
