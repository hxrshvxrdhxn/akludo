const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity User
 * */

class KYCHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onKYCCreate(newObj) {
        // called when User is created.
        console.log(newObj);
    }

    onKYCUpdate({oldObj, newObj}) {
        // called when User is updated.
        console.log(newObj,oldObj);  
        console.log("UPDATING KYC")
    }

    onKYCDelete(id) {
        // called when User is deleted.
    }

}

exports = module.exports = KYCHook;
