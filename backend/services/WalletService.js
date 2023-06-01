const CONSTANTS = require('../util/Constants');
const WalletDTO = require('../util/beans/WalletDTO');
const WalletValidator = require('../validations/WalletValidator');
const WalletHook = require('../hooks/WalletHook');
const WalletInterceptor = require('../interceptors/WalletInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over Wallet Model
 * */

class WalletService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.Wallet', user, _db.Wallet, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.Wallet.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch Wallet. ' + _id);

        // fetch
        const foundWallet = await _db.Wallet.findOne({_id: id});
        return await WalletInterceptor.afterWalletFind(id, foundWallet, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.Wallet', user, _db.Wallet, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.Wallet.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete Wallet. ' + _id);

        // remove
        await WalletInterceptor.beforeWalletDelete(id, user);
        WalletHook.trigger('onWalletDelete', id);
        return await _db.Wallet.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.Wallet', user, _db.Wallet, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await WalletInterceptor.beforeWalletList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.Wallet.count(criteria);

        // Fetch
        const docs = total ? (await _db.Wallet.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await WalletInterceptor.afterWalletList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.Wallet', user, _db.Wallet, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.Wallet.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.Wallet', user, _db.Wallet, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof WalletDTO)) throw new Error('Please provide a WalletDTO to create the Wallet.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await WalletInterceptor.beforeWalletCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new WalletValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Wallet: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.Wallet(obj);
        const saveResp = await dbObj.save();
        WalletHook.trigger('onWalletCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.Wallet', user, _db.Wallet, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.Wallet.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update Wallet. ' + _id);

        // Fetch original object
        const origDbObj = await _db.Wallet.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof WalletDTO)) throw new Error('Please provide a WalletDTO to update the Wallet.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await WalletInterceptor.beforeWalletUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new WalletValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Wallet: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.Wallet.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.Wallet.findOne({_id: id});
        WalletHook.trigger('onWalletUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

    // static async updateWalletLedger(id,ledger,user=null){
    //     if (!(await RBACPermissionService.check(id, 'update.Wallet', user, _db.Wallet, null, dto))) throw new Error('You do not have permission to do this operation');
    //     // validate
    //     if (!id) throw new Error('Please provide an Id to update.');
    //     const _id = id;
    //     id = _db.Wallet.convertToObjectId(id);
    //     if (!id) throw new Error('Invalid ID passed to update Wallet. ' + _id);

    //     // Fetch original object
    //     const origDbObj = await _db.Wallet.findOne({_id: id});
    //     if (!origDbObj) throw new Error('No object with provided id: ' + id);

    //     // // validate DTO
    //     // if (!(dto instanceof WalletDTO)) throw new Error('Please provide a WalletDTO to update the Wallet.');

    //     // // enrich
    //     // dto.createTrack(user && user._id || user.id || null);
    //     // await WalletInterceptor.beforeWalletUpdate(dto, origDbObj, user);

    //     // Check data
    //     // const obj = dto.toObject();
    //     // const validationResult = new WalletValidator(obj, origDbObj, false).validate();
    //     // if (!validationResult.isValid) {
    //     //     throw new Error('Validation Failure for Wallet: ' + validationResult.errorString);
    //     // }

    //     // update
    //     const updateResult =await _db.Wallet.updateOne({_id:id},{$addToSet:{ledger:{each:ledger}}})
       
    //     // fetch latest
    //     const updatedDbObj = await _db.Wallet.findOne({_id: id});
    //     WalletHook.trigger('onWalletUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

    //     return {updateResult, updatedDbObj};

    // }

}

exports = module.exports = WalletService;


