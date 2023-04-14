const CONSTANTS = require('../util/Constants');
const BankTransactionDTO = require('../util/beans/BankTransactionDTO');
const BankTransactionValidator = require('../validations/BankTransactionValidator');
const BankTransactionHook = require('../hooks/BankTransactionHook');
const BankTransactionInterceptor = require('../interceptors/BankTransactionInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over BankTransaction Model
 * */

class BankTransactionService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.BankTransaction', user, _db.BankTransaction, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.BankTransaction.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch BankTransaction. ' + _id);

        // fetch
        const foundBankTransaction = await _db.BankTransaction.findOne({_id: id});
        return await BankTransactionInterceptor.afterBankTransactionFind(id, foundBankTransaction, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.BankTransaction', user, _db.BankTransaction, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.BankTransaction.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete BankTransaction. ' + _id);

        // remove
        await BankTransactionInterceptor.beforeBankTransactionDelete(id, user);
        BankTransactionHook.trigger('onBankTransactionDelete', id);
        return await _db.BankTransaction.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.BankTransaction', user, _db.BankTransaction, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await BankTransactionInterceptor.beforeBankTransactionList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.BankTransaction.count(criteria);

        // Fetch
        const docs = total ? (await _db.BankTransaction.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await BankTransactionInterceptor.afterBankTransactionList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.BankTransaction', user, _db.BankTransaction, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.BankTransaction.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.BankTransaction', user, _db.BankTransaction, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof BankTransactionDTO)) throw new Error('Please provide a BankTransactionDTO to create the BankTransaction.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await BankTransactionInterceptor.beforeBankTransactionCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new BankTransactionValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for BankTransaction: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.BankTransaction(obj);
        const saveResp = await dbObj.save();
        BankTransactionHook.trigger('onBankTransactionCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.BankTransaction', user, _db.BankTransaction, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.BankTransaction.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update BankTransaction. ' + _id);

        // Fetch original object
        const origDbObj = await _db.BankTransaction.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof BankTransactionDTO)) throw new Error('Please provide a BankTransactionDTO to update the BankTransaction.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await BankTransactionInterceptor.beforeBankTransactionUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new BankTransactionValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for BankTransaction: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.BankTransaction.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.BankTransaction.findOne({_id: id});
        BankTransactionHook.trigger('onBankTransactionUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = BankTransactionService;


