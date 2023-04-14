const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity Ledger
 * */

class LedgerHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onLedgerCreate(newObj) {
        // called when Ledger is created.
    }

    onLedgerUpdate({oldObj, newObj}) {
        // called when Ledger is updated.
    }

    onLedgerDelete(id) {
        // called when Ledger is deleted.
    }

}

exports = module.exports = LedgerHook;
