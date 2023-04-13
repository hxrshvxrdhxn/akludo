const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity BankTransaction
 * */

class BankTransactionHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onBankTransactionCreate(newObj) {
        // called when BankTransaction is created.
    }

    onBankTransactionUpdate({oldObj, newObj}) {
        // called when BankTransaction is updated.
    }

    onBankTransactionDelete(id) {
        // called when BankTransaction is deleted.
    }

}

exports = module.exports = BankTransactionHook;
