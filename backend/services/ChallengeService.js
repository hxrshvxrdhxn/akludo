const CONSTANTS = require('../util/Constants');
const ChallengeDTO = require('../util/beans/ChallengeDTO');
const ChallengeValidator = require('../validations/ChallengeValidator');
const ChallengeHook = require('../hooks/ChallengeHook');
const ChallengeInterceptor = require('../interceptors/ChallengeInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over Challenge Model
 * */

class ChallengeService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.Challenge', user, _db.Challenge, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.Challenge.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch Challenge. ' + _id);

        // fetch
        const foundChallenge = await _db.Challenge.findOne({_id: id});
        return await ChallengeInterceptor.afterChallengeFind(id, foundChallenge, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.Challenge', user, _db.Challenge, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.Challenge.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete Challenge. ' + _id);

        // remove
        await ChallengeInterceptor.beforeChallengeDelete(id, user);
        ChallengeHook.trigger('onChallengeDelete', id);
        return await _db.Challenge.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.Challenge', user, _db.Challenge, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await ChallengeInterceptor.beforeChallengeList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.Challenge.count(criteria);

        // Fetch
        const docs = total ? (await _db.Challenge.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await ChallengeInterceptor.afterChallengeList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.Challenge', user, _db.Challenge, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.Challenge.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.Challenge', user, _db.Challenge, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof ChallengeDTO)) throw new Error('Please provide a ChallengeDTO to create the Challenge.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await ChallengeInterceptor.beforeChallengeCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new ChallengeValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Challenge: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.Challenge(obj);
        const saveResp = await dbObj.save();
        await ChallengeInterceptor.afterChallengeCreate(dbObj._id, dbObj, user);
        ChallengeHook.trigger('onChallengeCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.Challenge', user, _db.Challenge, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.Challenge.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update Challenge. ' + _id);

        // Fetch original object
        const origDbObj = await _db.Challenge.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof ChallengeDTO)) throw new Error('Please provide a ChallengeDTO to update the Challenge.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await ChallengeInterceptor.beforeChallengeUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new ChallengeValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Challenge: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.Challenge.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.Challenge.findOne({_id: id});
        ChallengeHook.trigger('onChallengeUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = ChallengeService;


