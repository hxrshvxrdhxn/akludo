const async = require('async');
const keystone = require('../../../../');
const Customer = keystone.list('Customer');
const ObjectId = require("mongoose").Types.ObjectId;

exports = module.exports = async function (req, res) {
	const id = req.params.id;

	let user, emails = [], query = {};

	if (!id) return res.json({res: 'id is required'});

	user = await Customer.model.findOne({_id: id});

	query.$and = [{status: 'Verified'}];

	query.$or = [];

	if (user.alternativeEmails && user.alternativeEmails.length) {
		emails = user.alternativeEmails
	}

	if (user.email) {
		emails.push(user.email);
	}

	if (user.phoneNumbers && user.phoneNumbers.length) {
		query.$or.push({phoneNumbers: {"$in": user.phoneNumbers}});
	}

	if (emails && emails.length) {
		query.$or.push({email: {"$in": emails}});
		query.$or.push({alternativeEmails: {"$in": emails}});
	}

	query._id = {
		$ne: convertToObjectId(id)
	};

	let matchedUsers = await Customer.model.find(query, {
		_id: 1,
		name: 1,
		email: 1,
		phoneNumbers: 1,
		vin: 1,
		alternativeEmails: 1
	});

	res.json({results: matchedUsers || []});
};


function convertToObjectId(id) {
	let objectId = null;
	if (id instanceof ObjectId) {
		objectId = id;
	} else if (id) {
		try {
			objectId = ObjectId(id);
		} catch (c) {
			objectId = null;
		}
	}
	return objectId;
}
