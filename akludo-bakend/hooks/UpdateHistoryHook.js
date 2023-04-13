const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity UpdateHistory
 * */

class UpdateHistoryHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onUpdateHistoryCreate(newObj) {
        // called when UpdateHistory is created.
    }

    onUpdateHistoryUpdate({oldObj, newObj}) {
        // called when UpdateHistory is updated.
    }

    onUpdateHistoryDelete(id) {
        // called when UpdateHistory is deleted.
    }

}

exports = module.exports = UpdateHistoryHook;
