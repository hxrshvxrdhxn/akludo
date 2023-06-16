const keystone = require('../../../../');
const Customer = keystone.list('Customer');

exports = module.exports = function (req, res) {
	console.log('customer req.body!', req.body.userId, req.body.msg);
	const customerId = req.body.userId;
	const comments = req.body.msg.trim();
	const starDate = req.body.starDate;
	console.log('mmmsssggg??..>?', comments, starDate);
	if (!customerId) return res.json({ status: 'id is required' });
	if ((comments !== '')) {
		Customer.model.update({ _id: customerId }, { $set: { commentsCheck: comments, isStarred: true, starDate: starDate} }, function (err, _user) {
			if (err) {
				return res.status(500).json({
					err: 'database error',
					detail: err,
				});
			}
			res.json({ status: true });
		});
	}

};
