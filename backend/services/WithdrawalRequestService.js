const CONSTANTS = require('../util/Constants');
const WithdrawalRequestDTO = require('../util/beans/WithdrawalRequestDTO');
const WithdrawalRequestValidator = require('../validations/WithdrawalRequestValidator');
const WithdrawalRequestHook = require('../hooks/WithdrawalRequestHook');
const WithdrawalRequestInterceptor = require('../interceptors/WithdrawalRequestInterceptor');
const RBACPermissionService = require('./RBACPermissionService');

/**
 * This service provide logical operations over WithdrawalRequest Model
 * */

class WithdrawalRequestService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.WithdrawalRequest', user, _db.WithdrawalRequest, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.WithdrawalRequest.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch WithdrawalRequest. ' + _id);

        // fetch
        const foundWithdrawalRequest = await _db.WithdrawalRequest.findOne({_id: id});
        return await WithdrawalRequestInterceptor.afterWithdrawalRequestFind(id, foundWithdrawalRequest, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.WithdrawalRequest', user, _db.WithdrawalRequest, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.WithdrawalRequest.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete WithdrawalRequest. ' + _id);

        // remove
        await WithdrawalRequestInterceptor.beforeWithdrawalRequestDelete(id, user);
        WithdrawalRequestHook.trigger('onWithdrawalRequestDelete', id);
        return await _db.WithdrawalRequest.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.WithdrawalRequest', user, _db.WithdrawalRequest, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await WithdrawalRequestInterceptor.beforeWithdrawalRequestList(criteria, limit, offset, user);

        console.log(await _db.WithdrawalRequest.find({}));
        // Fetch Total
        const total = await _db.WithdrawalRequest.count(criteria);
        console.log("this is total",total)
        // Fetch
        const docs = total ? (await _db.WithdrawalRequest.find(criteria).skip(offset).limit(limit)) : [];
        console.log("this is res",docs);
        return {
            docs: (await WithdrawalRequestInterceptor.afterWithdrawalRequestList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.WithdrawalRequest', user, _db.WithdrawalRequest, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.WithdrawalRequest.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.WithdrawalRequest', user, _db.WithdrawalRequest, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof WithdrawalRequestDTO)) throw new Error('Please provide a WithdrawalRequestDTO to create the WithdrawalRequest.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await WithdrawalRequestInterceptor.beforeWithdrawalRequestCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new WithdrawalRequestValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for WithdrawalRequest: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.WithdrawalRequest(obj);
        const saveResp = await dbObj.save();
        WithdrawalRequestHook.trigger('onWithdrawalRequestCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.WithdrawalRequest', user, _db.WithdrawalRequest, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.WithdrawalRequest.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update WithdrawalRequest. ' + _id);

        // Fetch original object
        const origDbObj = await _db.WithdrawalRequest.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof WithdrawalRequestDTO)) throw new Error('Please provide a WithdrawalRequestDTO to update the WithdrawalRequest.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await WithdrawalRequestInterceptor.beforeWithdrawalRequestUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new WithdrawalRequestValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for WithdrawalRequest: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.WithdrawalRequest.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.WithdrawalRequest.findOne({_id: id});
        WithdrawalRequestHook.trigger('onWithdrawalRequestUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

    // static async updateWithdrawalRequestLedger(id,ledger,user=null){
    //     if (!(await RBACPermissionService.check(id, 'update.WithdrawalRequest', user, _db.WithdrawalRequest, null, dto))) throw new Error('You do not have permission to do this operation');
    //     // validate
    //     if (!id) throw new Error('Please provide an Id to update.');
    //     const _id = id;
    //     id = _db.WithdrawalRequest.convertToObjectId(id);
    //     if (!id) throw new Error('Invalid ID passed to update WithdrawalRequest. ' + _id);

    //     // Fetch original object
    //     const origDbObj = await _db.WithdrawalRequest.findOne({_id: id});
    //     if (!origDbObj) throw new Error('No object with provided id: ' + id);

    //     // // validate DTO
    //     // if (!(dto instanceof WithdrawalRequestDTO)) throw new Error('Please provide a WithdrawalRequestDTO to update the WithdrawalRequest.');

    //     // // enrich
    //     // dto.createTrack(user && user._id || user.id || null);
    //     // await WithdrawalRequestInterceptor.beforeWithdrawalRequestUpdate(dto, origDbObj, user);

    //     // Check data
    //     // const obj = dto.toObject();
    //     // const validationResult = new WithdrawalRequestValidator(obj, origDbObj, false).validate();
    //     // if (!validationResult.isValid) {
    //     //     throw new Error('Validation Failure for WithdrawalRequest: ' + validationResult.errorString);
    //     // }

    //     // update
    //     const updateResult =await _db.WithdrawalRequest.updateOne({_id:id},{$addToSet:{ledger:{each:ledger}}})
       
    //     // fetch latest
    //     const updatedDbObj = await _db.WithdrawalRequest.findOne({_id: id});
    //     WithdrawalRequestHook.trigger('onWithdrawalRequestUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

    //     return {updateResult, updatedDbObj};

    // }

}

exports = module.exports = WithdrawalRequestService;


