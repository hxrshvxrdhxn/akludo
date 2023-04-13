const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity Wallet
 * */

class WalletHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onWalletCreate(newObj) {
        // called when Wallet is created.
    }

    onWalletUpdate({oldObj, newObj}) {
        // called when Wallet is updated.
    }

    onWalletDelete(id) {
        // called when Wallet is deleted.
    }

}

exports = module.exports = WalletHook;
