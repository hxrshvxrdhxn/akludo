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
        // create referral
        const referral = new _db.Referral({referrer: newObj._id ,earning:0 ,count:0,code:`${newObj.phones[0].number}@${newObj.name.split(' ')[0]}`});
        await referral.save();
        // create wallet
        const wallet = new _db.Wallet({user: newObj._id ,bal:0,earning:0});
        await wallet.save();
        // create KYC holder
        const kyc = await new _db.KYC({user: newObj._id});
        await kyc.save();
        await _db.User.update({_id: newObj._id}, {$set: {wallet: wallet._id, kyc: kyc._id, referral:referral._id}});
    }

    onUserUpdate({oldObj, newObj}) {
        //console.log("user updated ", oldObj,newObj);
        // called when User is updated.
    }

    onUserDelete(id) {
        // called when User is deleted.
    }

}

exports = module.exports = UserHook;
