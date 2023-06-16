const async = require('async');
const keystone = require('../../../../');
const Lead = keystone.list('Lead');

exports = module.exports = function (req, res) {
	console.log('followup markAsDone!');

	const leadId = req.params.id;

	Lead.model.update({_id: leadId}, {markedAsDoneAt: new Date()}, function (err, _user) {
		if (err) {
			return res.status(500).json({
				err: 'database error',
				detail: err
			});
		}
		res.json({status: true});
	});
};
