const async = require('async');
const keystone = require('../../../../');
const Followup = keystone.list('Followup');
const Lead = keystone.list('Lead');
const User = keystone.list('User');
const Customer = keystone.list('Customer');
const Refer = keystone.list('Refer');
const Share = keystone.list('Share');
const FeedBack = keystone.list('Feedback');
const CustomerChangeHistory = keystone.list('CustomerChangeHistory');

exports = module.exports = function (req, res) {
	let tasks = [],
		data = [],
		followUp = [],
		lead = [],
		feedBack = [],
		refer = [],
		share = [],
		changes = [],
		userId = req.params.id,
		memId = req.params.memid,
		remoteUserId = null;

	let userQuery = userId;

	tasks.push(callback => {
		// Find by the membership Id
		User.model.findOne({userName: memId}, function (err, _user) {
			if (err) callback(err);
			else if (_user) callback(null, remoteUserId = _user._id);
			else callback();
		})
	});

	// build query
	tasks.push(callback => {
		if (remoteUserId) {
			userQuery = {$in: [userId, remoteUserId]};
		} else {
			userQuery = userId;
		}
		callback();
	});

	// add in aliases
	tasks.push(callback => {
		Customer.model.find({alias: userId}, function (err, users) {
			if (err) {
				console.log(err);
			}
			if (users && users.length) {
				if (!(userQuery.$in)) {
					userQuery = {$in: [userId]};
				}
				users.forEach(u => userQuery.$in.push(u._id));
			}
			callback();
		});
	});

	tasks.push(function (cb) {
		FeedBack.model.find({user: userQuery}).populate('user category').lean().exec(function (err, _feedBack) {
			if (err) cb(err);
			else {
				feedBack = _feedBack.map(function (el) {
					el.type = 'feedback';
					return el;
				});
				cb();
			}
		})
	});

	tasks.push(function (cb) {
		Followup.model.find({customer: userQuery}).populate('customer createdBy').lean().exec(function (err, _followUp) {
			if (err) cb(err);
			else {
				followUp = _followUp.map(function (el) {
					el.type = 'followup';
					return el;
				});
				cb();
			}
		})
	});

	tasks.push(function (cb) {
		Lead.model.find({user: userQuery}).populate('user offer').lean().exec(function (err, _lead) {
			if (err) cb(err);
			else {
				lead = _lead.map(function (el) {
					el.type = 'lead';
					return el;
				});
				cb(null);
			}
		})
	});

	tasks.push(function (cb) {
		Refer.model.find({referredBy: userQuery}).populate('referredBy interestedCarModel').lean().exec(function (err, _refer) {
			if (err) cb(err);
			else {
				refer = _refer.map(function (el) {
					el.type = 'refer';
					return el;
				});
				cb(null);
			}
		})
	});

	tasks.push(function (cb) {
		Share.model.find({shareBy: userQuery}).populate('shareBy offer').lean().exec(function (err, _share) {
			if (err) cb(err);
			else {
				share = _share.map(function (el) {
					el.type = 'share';
					return el;
				});
				cb(null);
			}
		})
	});

	tasks.push(function (cb) {
		CustomerChangeHistory.model.find({customer: userQuery}).populate('updatedBy').lean().exec(function (err, _changes) {
			if (err) cb(err);
			else {
				const groupper = {};
				changes = _changes.map(function (el) {
					el.type = 'change';
					groupper[el.group] = groupper[el.group] || [];
					groupper[el.group].push(el);
					return el;
				});
				const groupedChanges = [];
				Object.keys(groupper).forEach(group => {
					let first = groupper[group][0];
					let final = {
						type: first.type,
						createdBy: first.createdBy,
						createdAt: first.createdAt,
						updatedBy: first.updatedBy,
						updatedAt: first.updatedAt,
						changes: [],
						group: first.group
					};
					groupper[group].forEach(change => final.changes.push({
						oldVal: change.oldVal,
						newVal: change.newVal,
						field: change.changedField
					}));
					groupedChanges.push(final);
				});
				changes = groupedChanges;
				cb();
			}
		})
	});

	async.series(tasks, function (err) {
		if (err) {
			return res.status(500).json({
				err: 'database error',
				detail: err
			});
		}
		data = [].concat(followUp, lead, feedBack, refer, share, changes);
		res.json(sortByKey(data));
	});
};

function getKey(obj) {
	switch (obj.type) {
		case 'share':
			return 'createdAt';
		case 'refer':
			return 'createdAt';
		case 'lead':
			return 'createdAt';
		case 'followup':
			return 'createdAt';
		case 'feedback':
			return 'createdAt';
		default:
			return 'createdAt';
	}
}

function sortByKey(array) {
	return array.sort(function (a, b) {
		let aKey = getKey(a);
		let bKey = getKey(b);
		let x = a[aKey];
		let y = b[bKey];
		x = +x;
		y = +y;
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}
