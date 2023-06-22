const Hook = require('./base/Hook');
const MainSocketController = require('../sockets/MainSocketController');

/**
 * Hook to run lifecycle events for entity WithdrawalRequest
 * */

class WithdrawalRequestHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onWithdrawalRequestCreate(newObj) {
        // called when WithdrawalRequest is created.
    }

    onWithdrawalRequestUpdate({oldObj, newObj}) {
        // called when WithdrawalRequest is updated.
    }

    onWithdrawalRequestDelete(id) {
        // called when WithdrawalRequest is deleted.
    }

}

exports = module.exports = WithdrawalRequestHook;
