const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity Role
 * */

class RoleHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onRoleCreate(newObj) {
        // called when Role is created.
    }

    onRoleUpdate({oldObj, newObj}) {
        // called when Role is updated.
    }

    onRoleDelete(id) {
        // called when Role is deleted.
    }

}

exports = module.exports = RoleHook;
