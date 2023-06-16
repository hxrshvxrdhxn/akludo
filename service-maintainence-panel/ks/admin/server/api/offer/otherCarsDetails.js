const keystone = require('../../../../');
const OtherCarsIntegration = keystone.list('OtherCarsIntegration').model;
const Customer = keystone.list('Customer').model;
exports = module.exports = async function (req, res) {
	let carsList = [], userId = req.body.userId;
	let customer = await Customer.findOne({ _id: userId });
	if (!customer) return res.json({ carsList });
	let carsIdList = customer && customer.otherCars;
	for (let carId of (carsIdList || [])) {
		try {
			let car = await OtherCarsIntegration.findOne({ _id: carId });
			if (car) carsList.push(car);
		} catch (e) {
			console.log('Error in Others.js', e);
		}
	}
	return res.json({ carsList });
};
