const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity AuthResponse
 * */

class AuthResponseHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onAuthResponseCreate(newObj) {
        // called when AuthResponse is created.
    }

    onAuthResponseUpdate({oldObj, newObj}) {
        // called when AuthResponse is updated.
    }

    onAuthResponseDelete(id) {
        // called when AuthResponse is deleted.
    }

}

exports = module.exports = AuthResponseHook;
