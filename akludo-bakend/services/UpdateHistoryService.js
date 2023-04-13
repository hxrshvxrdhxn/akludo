const CONSTANTS = require('../util/Constants');
const UpdateHistoryDTO = require('../util/beans/UpdateHistoryDTO');
const UpdateHistoryValidator = require('../validations/UpdateHistoryValidator');
const UpdateHistoryHook = require('../hooks/UpdateHistoryHook');
const UpdateHistoryInterceptor = require('../interceptors/UpdateHistoryInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over UpdateHistory Model
 * */

class UpdateHistoryService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.UpdateHistory', user, _db.UpdateHistory, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.UpdateHistory.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch UpdateHistory. ' + _id);

        // fetch
        const foundUpdateHistory = await _db.UpdateHistory.findOne({_id: id});
        return await UpdateHistoryInterceptor.afterUpdateHistoryFind(id, foundUpdateHistory, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.UpdateHistory', user, _db.UpdateHistory, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.UpdateHistory.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete UpdateHistory. ' + _id);

        // remove
        await UpdateHistoryInterceptor.beforeUpdateHistoryDelete(id, user);
        UpdateHistoryHook.trigger('onUpdateHistoryDelete', id);
        return await _db.UpdateHistory.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.UpdateHistory', user, _db.UpdateHistory, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await UpdateHistoryInterceptor.beforeUpdateHistoryList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.UpdateHistory.count(criteria);

        // Fetch
        const docs = total ? (await _db.UpdateHistory.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await UpdateHistoryInterceptor.afterUpdateHistoryList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.UpdateHistory', user, _db.UpdateHistory, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.UpdateHistory.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.UpdateHistory', user, _db.UpdateHistory, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof UpdateHistoryDTO)) throw new Error('Please provide a UpdateHistoryDTO to create the UpdateHistory.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await UpdateHistoryInterceptor.beforeUpdateHistoryCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new UpdateHistoryValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for UpdateHistory: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.UpdateHistory(obj);
        const saveResp = await dbObj.save();
        UpdateHistoryHook.trigger('onUpdateHistoryCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.UpdateHistory', user, _db.UpdateHistory, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.UpdateHistory.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update UpdateHistory. ' + _id);

        // Fetch original object
        const origDbObj = await _db.UpdateHistory.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof UpdateHistoryDTO)) throw new Error('Please provide a UpdateHistoryDTO to update the UpdateHistory.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await UpdateHistoryInterceptor.beforeUpdateHistoryUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new UpdateHistoryValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for UpdateHistory: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.UpdateHistory.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.UpdateHistory.findOne({_id: id});
        UpdateHistoryHook.trigger('onUpdateHistoryUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = UpdateHistoryService;


