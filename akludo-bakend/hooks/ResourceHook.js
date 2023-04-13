const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity Resource
 * */

class ResourceHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onResourceCreate(newObj) {
        // called when Resource is created.
    }

    onResourceUpdate({oldObj, newObj}) {
        // called when Resource is updated.
    }

    onResourceDelete(id) {
        // called when Resource is deleted.
    }

}

exports = module.exports = ResourceHook;
