const keystone = require('../../../../');
const Customer = keystone.list('Customer');

exports = module.exports = async function (req, res) {
	let user, vin, results;
	const id = req.params.id;

	if (!id) return res.json({res: 'id is required'});
	user = await Customer.model.findOne({_id: id});
	console.log(user && user.userName.search('SUB\$') < -1);
	if (user && user.userName.search('^SUB') > -1) return res.json({status: false});
	if (user && user.vin) results = await Customer.model.find({_id: {$ne: id}, status: 'Verified', vin: user.vin});
	else return res.json({status: false});
	if (results && results.length) {
		res.json({status: true, results: results});
	}
	else return res.json({status: false});
};
