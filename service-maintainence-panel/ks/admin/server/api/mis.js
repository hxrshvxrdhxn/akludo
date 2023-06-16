const keystone = require('../../../');
var _ = require('lodash');

const callTypeOptions = ['Customer Inquiry', 'Booking Request', 'Activation Call', 'Campaign Call', 'Welcome Call', 'Dealership Request', 'Data Validation'];
const callDisposition = ['Spoken To Customer', 'Non Contactable', 'Incorrect No', 'No Response', 'Update Info', 'Call Back Later'];
const subCategory = ["BMW Privileges", "Highlife", "Grandstand", "Bespoke Travel", "Other"];
module.exports = async (req, res) => {
	let date = JSON.parse(req.params.date);
	//console.log('rrrrrrr', moment(date.start));

	const campaign = keystone.list('Campaign').model; 
	const followup = keystone.list('Followup').model;
	const voc = await followup.find({
		$and: [
			{ isVoc: true },
			{ createdAt: { $gte: date.start } },
			{ createdAt: { $lte: date.end } }
		]
	}).populate('customer').lean();
	const escalation = await followup.find({
		$and: [
			{ isEscalation: true },
			{ createdAt: { $gte: date.start } },
			{ createdAt: { $lte: date.end } }
		]
	}).populate({
		path: 'customer',
		populate: {
			path: 'dealership'
		}
	}).lean();
	const bookingDetails = await followup.find({
		$and: [
			{ offer: { $ne: null } },
			{ offerAvailed: 'Yes' },
			{ createdAt: { $gte: date.start } },
			{ createdAt: { $lte: date.end } }
		]
	}).populate('customer')
		.populate({
			path: 'offer',
			select: { name: 1 }
		})
		.lean();

	let boundCall = await getOutBoundCount(followup, date);
	const customerEnquiries = await getCustomerEnquiries(followup, date);
	const otherOutbounds = await getOtherOutbounds(followup, date);
	const enquiresCount = await getEnquireDetails(followup, date);
	
	await Promise.all(enquiresCount.map(async enquire => {
		const campaigns = await campaign.find({ name: `${enquire.offer}` }, { name: 1, _id: 1 }).lean()
		const { _id } = campaigns[0]
		enquire.link = {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"offer","mode":"exactly","inverted":false,"value":["${_id}"]}, {"path":"offerAvailed","inverted":false,"value":["No"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		}
		return true 
	}))

	const bookingCount = getCount(bookingDetails);
	await Promise.all(bookingCount.map(async booking => {
		const campaigns = await campaign.find({ name: `${booking.offer}` }, { name: 1, _id: 1 }).lean()
		const { _id } = campaigns[0]
		booking.link = {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"offer","mode":"exactly","inverted":false,"value":["${_id}"]}, {"path":"offerAvailed","inverted":false,"value":["Yes"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		}
		return true 
	}))

	// all response
	res.send({
		voc,
		escalation,
		bookingDetails,
		boundCall,
		customerEnquiries,
		otherOutbounds,
		enquiresCount,
		bookingCount
	});
};

async function getCustomerEnquiries(followup, date) {
	let customerEnquiries = await Promise.all(subCategory.map(async (subCat) => {
		let contactCenter = await followup.count({
			$and: [
				{ callType: 'Customer Inquiry' },
				{ subCategory: subCat },
				{ interactionSource: { $in: ['Incoming', 'Website'] } },
				{ createdAt: { $gte: date.start } },
				{ createdAt: { $lte: date.end } }
			]
		});
		let email = await followup.count({
			$and: [
				{ callType: 'Customer Inquiry' },
				{ subCategory: subCat },
				{ interactionSource: 'Email' },
				{ createdAt: { $gte: date.start } },
				{ createdAt: { $lte: date.end } }
			]
		});
		let outbound = await followup.count({
			$and: [
				{ callType: 'Customer Inquiry' },
				{ subCategory: subCat },
				{ interactionSource: 'Outgoing' },
				{ createdAt: { $gte: date.start } },
				{ createdAt: { $lte: date.end } }
			]
		});
		let enquiries = await followup.count({
			$and: [
				{ subCategory: subCat },
				{ offerAvailed: 'No' },
				{ createdAt: { $gte: date.start } },
				{ createdAt: { $lt: date.end } }
			]
		});
		let bookings = await followup.count({
			$and: [
				{ subCategory: subCat },
				{ offer: { $ne: null } },
				{ offerAvailed: 'Yes' },
				{ createdAt: { $gte: date.start } },
				{ createdAt: { $lte: date.end } }
			]
		});
		return {
			rowLabel: subCat,
			contactCenter: {
				count: contactCenter, link: {
					pathname: "/admin/followups",
					query: {
						filters: `[{"path":"subCategory","inverted":false,"value":["${subCat}"]}, {"path":"callType","inverted":false,"value":["Customer Inquiry"]}, {"path":"interactionSource","inverted":false,"value":["Incoming", "Website"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
						columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
						srbn: 5,
						page: 1,
					}
				}
			},
			email: { count: email, link: {
				pathname: "/admin/followups",
				query: {
					filters: `[{"path":"subCategory","inverted":false,"value":["${subCat}"]}, {"path":"callType","inverted":false,"value":["Customer Inquiry"]}, {"path":"interactionSource","inverted":false,"value":["Email"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
					columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
					srbn: 5,
					page: 1,
				}
			} },
			outbound: { count: outbound, link: {
				pathname: "/admin/followups",
				query: {
					filters: `[{"path":"subCategory","inverted":false,"value":["${subCat}"]}, {"path":"callType","inverted":false,"value":["Customer Inquiry"]}, {"path":"interactionSource","inverted":false,"value":["Outgoing"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
					columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
					srbn: 5,
					page: 1,
				}
			} },
			total: { count: contactCenter + email + outbound, link: {
				pathname: "/admin/followups",
				query: {
					filters: `[{"path":"subCategory","inverted":false,"value":["${subCat}"]}, {"path":"callType","inverted":false,"value":["Customer Inquiry"]}, {"path":"interactionSource","inverted":false,"value":["Incoming", "Website", "Email", "Outgoing"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
					columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
					srbn: 5,
					page: 1,
				}
			} },
			enquiries: { count: enquiries, link: {
				pathname: "/admin/followups",
				query: {
					filters: `[{"path":"subCategory","inverted":false,"value":["${subCat}"]}, {"path":"offerAvailed","inverted":false,"value":["No"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
					columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
					srbn: 5,
					page: 1,
				}
			} },
			bookings: { count: bookings, link: {
				pathname: "/admin/followups",
				query: {
					filters: `[{"path":"subCategory","inverted":false,"value":["${subCat}"]}, {"path":"offer","inverted":true,"value":[null]}, {"path":"offerAvailed","inverted":false,"value":["Yes"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
					columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
					srbn: 5,
					page: 1,
				}
			} },
		}
	}));
	customerEnquiries.push({
		rowLabel: 'Grand Total',
		contactCenter: { count: customerEnquiries.reduce((x, { contactCenter }) => (x + contactCenter.count), 0), link: {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"subCategory","inverted":false,"value":[${subCategory.map(s => `"${s}"`).join(',')}]}, {"path":"callType","inverted":false,"value":["Customer Inquiry"]}, {"path":"interactionSource","inverted":false,"value":["Incoming", "Website"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		} },
		email: { count: customerEnquiries.reduce((x, { email }) => (x + email.count), 0), link: {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"subCategory","inverted":false,"value":[${subCategory.map(s => `"${s}"`).join(',')}]}, {"path":"callType","inverted":false,"value":["Customer Inquiry"]}, {"path":"interactionSource","inverted":false,"value":["Email"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		} },
		outbound: { count: customerEnquiries.reduce((x, { outbound }) => (x + outbound.count), 0), link: {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"subCategory","inverted":false,"value":[${subCategory.map(s => `"${s}"`).join(',')}]}, {"path":"callType","inverted":false,"value":["Customer Inquiry"]}, {"path":"interactionSource","inverted":false,"value":["Outgoing"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		} },
		total: { count: customerEnquiries.reduce((x, { total }) => (x + total.count), 0), link: {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"subCategory","inverted":false,"value":[${subCategory.map(s => `"${s}"`).join(',')}]}, {"path":"callType","inverted":false,"value":["Customer Inquiry"]}, {"path":"interactionSource","inverted":false,"value":["Incoming", "Website", "Email", "Outgoing"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		} },
		enquiries: { count: customerEnquiries.reduce((x, { enquiries }) => (x + enquiries.count), 0), link: {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"subCategory","inverted":false,"value":[${subCategory.map(s => `"${s}"`).join(',')}]}, {"path":"offerAvailed","inverted":false,"value":["No"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		} },
		bookings: { count: customerEnquiries.reduce((x, { bookings }) => (x + bookings.count), 0), link: {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"subCategory","inverted":false,"value":[${subCategory.map(s => `"${s}"`).join(',')}]}, {"path":"offer","inverted":true,"value":[null]}, {"path":"offerAvailed","inverted":false,"value":["Yes"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		} },
	});
	return customerEnquiries;
}

async function getOtherOutbounds(followup, date) {
	let otherOutbounds = await Promise.all(callTypeOptions.filter(_c => _c !== 'Customer Inquiry').map(async _callType => {
		let contactCenter = await followup.count({
			$and: [
				{ callType: _callType },
				{ interactionSource: { $in: ['Incoming', 'Website'] } },
				{ createdAt: { $gte: date.start } },
				{ createdAt: { $lte: date.end } }
			]

		});
		let email = await followup.count({
			$and: [
				{ callType: _callType },
				{ interactionSource: 'Email' },
				{ createdAt: { $gte: date.start } },
				{ createdAt: { $lte: date.end } }
			]
		});
		let outbound = await followup.count({
			$and: [
				{ callType: _callType },
				{ interactionSource: 'Outgoing' },
				{ createdAt: { $gte: date.start } },
				{ createdAt: { $lte: date.end } }
			]
		});
		return {
			rowLabel: _callType,
			contactCenter: { count: contactCenter, link: {
				pathname: "/admin/followups",
				query: {
					filters: `[{"path":"callType","inverted":false,"value":["${_callType}"]}, {"path":"interactionSource","inverted":false,"value":["Incoming", "Website"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
					columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
					srbn: 5,
					page: 1,
				}
			} },
			email: { count: email, link:  {
				pathname: "/admin/followups",
				query: {
					filters: `[{"path":"callType","inverted":false,"value":["${_callType}"]}, {"path":"interactionSource","inverted":false,"value":["Email"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
					columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
					srbn: 5,
					page: 1,
				}
			} },
			outbound: { count: outbound, link:  {
				pathname: "/admin/followups",
				query: {
					filters: `[{"path":"callType","inverted":false,"value":["${_callType}"]}, {"path":"interactionSource","inverted":false,"value":["Outgoing"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
					columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
					srbn: 5,
					page: 1,
				}
			} },
			total: { count: contactCenter + email + outbound, link: {
				pathname: "/admin/followups",
				query: {
					filters: `[{"path":"callType","inverted":false,"value":["${_callType}"]}, {"path":"interactionSource","inverted":false,"value":["Incoming", "Website", "Email", "Outgoing"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
					columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
					srbn: 5,
					page: 1,
				}
			} }	
		}
	}));
	otherOutbounds.push({
		rowLabel: 'Grand Total',
		contactCenter: { count: otherOutbounds.reduce((x, { contactCenter }) => (x + contactCenter.count), 0), link: {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"callType","inverted":false,"value":[${callTypeOptions.filter(c => c !== 'Customer Inquiry').map(c => `"${c}"`).join(',')}]}, {"path":"interactionSource","inverted":false,"value":["Incoming", "Website"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		} },
		email: { count: otherOutbounds.reduce((x, { email }) => (x + email.count), 0), link: {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"callType","inverted":false,"value":[${callTypeOptions.filter(c => c !== 'Customer Inquiry').map(c => `"${c}"`).join(',')}]}, {"path":"interactionSource","inverted":false,"value":["Email"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		} },
		outbound: { count: otherOutbounds.reduce((x, { outbound }) => (x + outbound.count), 0), link: {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"callType","inverted":false,"value":[${callTypeOptions.filter(c => c !== 'Customer Inquiry').map(c => `"${c}"`).join(',')}]}, {"path":"interactionSource","inverted":false,"value":["Outgoing"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		} }, 
		total: { count: otherOutbounds.reduce((x, { total }) => (x + total.count), 0), link: {
			pathname: "/admin/followups",
			query: {
				filters: `[{"path":"callType","inverted":false,"value":[${callTypeOptions.filter(c => c !== 'Customer Inquiry').map(c => `"${c}"`).join(',')}]}, {"path":"interactionSource","inverted":false,"value":["Incoming", "Website", "Email", "Outgoing"]}, {"path":"createdAt","mode":"between","inverted":false,"value":"${new Date(+new Date() - (1000 * 60 * 60 * 24 * 90)).toISOString()}","before":"${new Date(date.end).toString()}","after":"${new Date(date.start).toString()}"}]`,
				columns: 'customer, subCategory, callType, offer, createdAt, isVoc',
				srbn: 5,
				page: 1,
			}
		} },
	});
	return otherOutbounds;
}

async function getOutBoundCount(followup, date) {
	let boundCall = {
		callTypeOptions: [...callTypeOptions],
		callDisposition: [...callDisposition],
		'GRAND TOTAL': {}
	};

	await Promise.all(callDisposition.map(async (option) => {
		boundCall[option] = {};
		let total = 0;
		await Promise.all(callTypeOptions.map(async (position) => {
			let count = await followup.count({
				$and: [
					{ callType: position },
					{ callDisposition: option },
					{ createdAt: { $gte: date.start } },
					{ createdAt: { $lte: date.end } }
				]
			});
			boundCall[option][position] = count;
			total += count;
		}));
		boundCall[option]['GRAND TOTAL'] = total;
	}));
	let total = 0;
	callTypeOptions.map((col) => {
		const count = callDisposition.reduce((x, key) => {
			return (x + boundCall[key][col]);
		}, 0);
		boundCall['GRAND TOTAL'][col] = count
		total += count;
	});
	boundCall['GRAND TOTAL']['GRAND TOTAL'] = total;
	boundCall.callTypeOptions.push('GRAND TOTAL');
	boundCall.callDisposition.push('GRAND TOTAL');
	return boundCall;
}

function getCount(arr) {
	let countObj = _.groupBy(arr, (obj) => {
		return obj.offer.name
	});
	countObj = (Object.keys(countObj)).map(key => {
		return { offer: key, count: countObj[key].length }
	});
	return countObj
}

async function getEnquireDetails(followup, date) {
	let enquiresDetails = await followup.find({
		$and: [
			{ offer: { $ne: null } },
			{ offerAvailed: 'No' },
			{ createdAt: { $gte: date.start } },
			{ createdAt: { $lte: date.end } }
		]
	}).populate({
		path: 'offer',
		select: { name: 1 }
	})
		.lean();

	return getCount(enquiresDetails);
}
