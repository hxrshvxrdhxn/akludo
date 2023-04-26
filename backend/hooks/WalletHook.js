const Hook = require('./base/Hook');
const MainSocketController = require('../sockets/MainSocketController');

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
        MainSocketController.instance.sendMessageToUser(newObj.user.toString(), {type: 'wallet', data: newObj});
    }

    onWalletUpdate({oldObj, newObj}) {
        // called when Wallet is updated.
        MainSocketController.instance.sendMessageToUser(newObj.user.toString(), {type: 'wallet', data: newObj});
    }

    onWalletDelete(id) {
        // called when Wallet is deleted.
    }

}

exports = module.exports = WalletHook;
