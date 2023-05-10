const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity Referral
 * */

class ReferralHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onReferralCreate(newObj) {
        // called when Referral is created.
    }

    onReferralUpdate({oldObj, newObj}) {
        // called when Referral is updated.
        newObj.count=newObj.referred.length;
    }

    onReferralDelete(id) {
        // called when Referral is deleted.
    }

}

exports = module.exports = ReferralHook;
