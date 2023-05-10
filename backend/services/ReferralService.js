const CONSTANTS = require('../util/Constants');
const ReferralDTO = require('../util/beans/ReferralDTO');
const ReferralValidator = require('../validations/ReferralValidation');
const ReferralHook = require('../hooks/ReferralHook');
const ReferralInterceptor = require('../interceptors/ReferralInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over Referral Model
 * */

class ReferralService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.Referral', user, _db.Referral, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.Referral.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch Refer. ' + _id);

        // fetch
        const foundReferral = await _db.Referral.findOne({_id: id});
        return await ReferralInterceptor.afterReferralFind(id, foundReferral, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.Referral', user, _db.Referral, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.Referral.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete Referral. ' + _id);

        // remove
        await ReferralInterceptor.beforeReferralDelete(id, user);
        ReferralHook.trigger('onReferralDelete', id);
        return await _db.Referral.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.Referral', user, _db.Referral, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await ReferralInterceptor.beforeReferralList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.Referral.count(criteria);

        // Fetch
        const docs = total ? (await _db.Referral.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await ReferralInterceptor.afterReferralList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.Referral', user, _db.Referral, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.Referral.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.Referral', user, _db.Referral, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof ReferralDTO)) throw new Error('Please provide a ReferralDTO to create the Referral.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await ReferralInterceptor.beforeReferralCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new ReferralValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Referral: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.Referral(obj);
        const saveResp = await dbObj.save();
        ReferralHook.trigger('onReferralCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.Referral', user, _db.Referral, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.Referral.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update Referral. ' + _id);

        // Fetch original object
        const origDbObj = await _db.Referral.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof ReferralDTO)) throw new Error('Please provide a ReferralDTO to update the Referral.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        dto=await ReferralInterceptor.beforeReferralUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new ReferralValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Referral: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.Referral.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.Referral.findOne({_id: id});
        ReferralHook.trigger('onReferralUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = ReferralService;


