const async = require('async');
const keystone = require('../../../../');
const Customer = keystone.list('Customer');
const pinCodeAndCity = require(__dirname + '/pinCodeAndCity.json');

exports = module.exports = async function (req, res) {
	console.log('Update city');

	let customers = await Customer.model.find({}, {
		'_id': 1,
		'pinCode': 1,
	});

	customers.forEach(async customer => {
		if (customer.pinCode) {
			let name = pinCodeAndCity[customer.pinCode];
			if (name && name.trim()) {
				let city = name.trim().toUpperCase();
				await Customer.model.update({_id: customer._id}, {city: city});
			}
		}
	});

	res.json({status: true});
};
