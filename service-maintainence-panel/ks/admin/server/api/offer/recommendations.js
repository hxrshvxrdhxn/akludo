const keystone = require('../../../../');
module.exports = async (req, res) => {
	const cid = req.param("customerId");
	const Followup = keystone.list('Followup').model;
	const Campaign = keystone.list('Campaign').model;
	const Offer = keystone.list('Offer').model;
	const Customer = keystone.list('Customer').model;

	console.log('Recommending CID', cid);

	// get all followups
	// get hobbies
	// make map of all tags with map
	// add hobbies weights
	// search offers with all tags (nin offer list)
	// add priority weight
	// top 5
	// buffer these 2

	let customer = await Customer.findOne({_id: cid});
	if (!customer) throw new Error('This should not happen!');

	let followups = await Followup.find({customer: customer._id}).populate('offer');

	const weightedOffers = {};

	followups.forEach(fu => {
		console.log('FUF:', fu.offer);
		if (fu.offer && fu.offer.offer) {
			console.log('FUO');
			weightedOffers[fu.offer.offer] = weightedOffers[fu.offer.offer] || 0;
			weightedOffers[fu.offer.offer] = weightedOffers[fu.offer.offer] + 1;
			if (fu.offerAvailed && fu.offerAvailed === 'Yes') {
				console.log('FAO');
				weightedOffers[fu.offer.offer] = weightedOffers[fu.offer.offer] + 4;
			}
		}
	});

	// todo hobbies

	const tagWeights = {};
	const offerIds = Object.keys(weightedOffers);
	for (let oidx = 0; oidx < offerIds.length; oidx++) {
		let offerId = offerIds[oidx];
		let offer = await Offer.findOne({_id: offerId});
		(offer.tags || []).forEach(tag => tagWeights[tag] = weightedOffers[offerId]);
	}

	console.log({weightedOffers, tagWeights}, {
		_id: {$nin: Object.keys(weightedOffers)},
		endDate: {$gt: new Date()},
		tags: {$in: Object.keys(tagWeights)}
	});

	let recOfrs = await Offer.find({
		_id: {$nin: Object.keys(weightedOffers)},
		endDate: {$gt: new Date()},
		tags: {$in: Object.keys(tagWeights)}
	});

	let finalOfrs = [];
	(recOfrs || []).forEach(ro => {
		let roo = (ro.toObject && ro.toObject() || ro);
		roo.order = 0;
		(roo.tags || []).forEach(tag => {
			Object.keys(tagWeights).forEach(key => {
				if (key.toString() === tag.toString()) {
					roo.order = roo.order + tagWeights[key];
				}
			});
		});
		finalOfrs.push(roo);
	});

	finalOfrs.sort(function (a, b) {
		return b.order - a.order
	});

	finalOfrs = finalOfrs.slice(0, 5).map(fo => ({offer: fo, reason: 'Recommended based on personality profile.'}));

	console.log({finalOfrs});

	if (finalOfrs.length < 5) {
		// fill up
		let camps = await (Campaign.find({}, {name: 1, sentOn: 1}).sort({sentOn: -1}).limit(10));
		shuffle(camps);
		camps = camps.filter(camp => camp.name.search(/newsletter/i) === -1);
		for (let idx = finalOfrs.length; idx <= 5; idx++) {
			finalOfrs.push({
				offer: camps[idx],
				reason: 'Popular latest based on liking or in demand.'
			},);
		}
	}

	res.send(finalOfrs);

	// Campaign.find({}, {name: 1, sentOn: 1}).sort({sentOn: -1}).limit(5).exec((err, camps) => {
	// 	shuffle(camps);
	// 	camps = camps.filter(camp => camp.name.search(/newsletter/i) === -1);
	// 	res.send([
	// 		{
	// 			offer: camps[0],
	// 			reason: 'Popular latest based on liking.'
	// 		},
	// 		{
	// 			offer: camps[1],
	// 			reason: 'Popular latest suggestion.'
	// 		}
	// 	]);
	// });
};

function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}
