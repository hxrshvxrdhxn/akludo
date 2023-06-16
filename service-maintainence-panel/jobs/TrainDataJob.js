const keystone = require('../ks');

/**
 * Defines a sample Job descriptor
 * Runs on cluster and are controlled mutually exclusive.
 * */

module.exports = class TrainDataJob {

	static get trigger() {
		// return "0/5 * * * *"; // every 5 secs, human time or cron both accepted
		return '30 second'; // every 5 secs, human time or cron both accepted
	}

	static get concurrency() {
		return 1;
	}

	static get priority() {
		return 'normal'; //(lowest|low|normal|high|highest|number)
	}

	static async task(_, done) {
		console.log('Test JOB-------------');
		done();
	}
};
