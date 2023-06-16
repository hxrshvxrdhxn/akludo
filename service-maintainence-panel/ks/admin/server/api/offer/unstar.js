const keystone = require('../../../../');
const Customer = keystone.list('Customer');

exports = module.exports = function (req, res) {
	console.log('customer req.body!', req.body.userId);
	const customerId = req.body.userId;
	if (!customerId) return res.json({ status: 'id is required' });
	Customer.model.update({ _id: customerId }, { $set: { commentsCheck: '', isStarred: false } }, function (err, _user) {
		if (err) {
			return res.status(500).json({
				err: 'database error',
				detail: err,
			});
		}
		res.json({ status: true });
	});


};
