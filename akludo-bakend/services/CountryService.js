const CONSTANTS = require('../util/Constants');
const CountryDTO = require('../util/beans/CountryDTO');
const CountryValidator = require('../validations/CountryValidator');
const CountryHook = require('../hooks/CountryHook');
const CountryInterceptor = require('../interceptors/CountryInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over Country Model
 * */

class CountryService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.Country', user, _db.Country, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.Country.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch Country. ' + _id);

        // fetch
        const foundCountry = await _db.Country.findOne({_id: id});
        return await CountryInterceptor.afterCountryFind(id, foundCountry, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.Country', user, _db.Country, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.Country.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete Country. ' + _id);

        // remove
        await CountryInterceptor.beforeCountryDelete(id, user);
        CountryHook.trigger('onCountryDelete', id);
        return await _db.Country.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.Country', user, _db.Country, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await CountryInterceptor.beforeCountryList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.Country.count(criteria);

        // Fetch
        const docs = total ? (await _db.Country.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await CountryInterceptor.afterCountryList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.Country', user, _db.Country, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.Country.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.Country', user, _db.Country, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof CountryDTO)) throw new Error('Please provide a CountryDTO to create the Country.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await CountryInterceptor.beforeCountryCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new CountryValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Country: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.Country(obj);
        const saveResp = await dbObj.save();
        CountryHook.trigger('onCountryCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.Country', user, _db.Country, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.Country.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update Country. ' + _id);

        // Fetch original object
        const origDbObj = await _db.Country.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof CountryDTO)) throw new Error('Please provide a CountryDTO to update the Country.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await CountryInterceptor.beforeCountryUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new CountryValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Country: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.Country.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.Country.findOne({_id: id});
        CountryHook.trigger('onCountryUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = CountryService;


