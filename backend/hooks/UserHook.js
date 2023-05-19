const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity User
 * */

class UserHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    async onUserCreate(newObj) {
        // called when User is created.
        console.log("user created");
        // create wallet
        const wallet = new _db.Wallet({user: {_id: newObj._id}});
        await wallet.save();
        // create KYC holder
        const kyc = await new _db.KYC({user: {_id: newObj._id}});
        await kyc.save();
        await _db.User.update({_id: newObj._id}, {$set: {wallet: wallet._id, kyc: kyc._id}});
    }

    onUserUpdate({oldObj, newObj}) {
        // called when User is updated.
    }

    onUserDelete(id) {
        // called when User is deleted.
    }

}

exports = module.exports = UserHook;
