const WalletService = require('../services/WalletService');
const WalletDTO = require('../util/beans/WalletDTO');
const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity Ledger
 * */

class LedgerHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    async onLedgerCreate(newObj) {
        // called when Ledger is created.
        console.log("updating wallet for user with new ledger");
        // let obj= {user:newObj.user,ledger:newObj._id}
        // const dto = new WalletDTO({user, bal, ledger});
        // const result = await WalletService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        // const user=await _db.User.findOne({_id:newObj.createdBy});
        // await WalletService.updateWalletLedger(user?.wallet,newObj?._id,user);
        await _db.Wallet.updateOne({user:newObj.fromUser},{$push:{ledger:newObj._id}});         //to do rectify
        //update the wallet with a ledger.
    }

    onLedgerUpdate({oldObj, newObj}) {
        // called when Ledger is updated.
    }

    onLedgerDelete(id) {
        // called when Ledger is deleted.
    }

}

exports = module.exports = LedgerHook;
