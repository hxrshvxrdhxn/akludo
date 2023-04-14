const CONSTANTS = require('../util/Constants');
const LedgerDTO = require('../util/beans/LedgerDTO');
const LedgerValidator = require('../validations/LedgerValidator');
const LedgerHook = require('../hooks/LedgerHook');
const LedgerInterceptor = require('../interceptors/LedgerInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over Ledger Model
 * */

class LedgerService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.Ledger', user, _db.Ledger, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.Ledger.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch Ledger. ' + _id);

        // fetch
        const foundLedger = await _db.Ledger.findOne({_id: id});
        return await LedgerInterceptor.afterLedgerFind(id, foundLedger, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.Ledger', user, _db.Ledger, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.Ledger.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete Ledger. ' + _id);

        // remove
        await LedgerInterceptor.beforeLedgerDelete(id, user);
        LedgerHook.trigger('onLedgerDelete', id);
        return await _db.Ledger.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.Ledger', user, _db.Ledger, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await LedgerInterceptor.beforeLedgerList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.Ledger.count(criteria);

        // Fetch
        const docs = total ? (await _db.Ledger.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await LedgerInterceptor.afterLedgerList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.Ledger', user, _db.Ledger, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.Ledger.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.Ledger', user, _db.Ledger, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof LedgerDTO)) throw new Error('Please provide a LedgerDTO to create the Ledger.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await LedgerInterceptor.beforeLedgerCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new LedgerValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Ledger: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.Ledger(obj);
        const saveResp = await dbObj.save();
        LedgerHook.trigger('onLedgerCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.Ledger', user, _db.Ledger, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.Ledger.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update Ledger. ' + _id);

        // Fetch original object
        const origDbObj = await _db.Ledger.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof LedgerDTO)) throw new Error('Please provide a LedgerDTO to update the Ledger.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await LedgerInterceptor.beforeLedgerUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new LedgerValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Ledger: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.Ledger.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.Ledger.findOne({_id: id});
        LedgerHook.trigger('onLedgerUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = LedgerService;


