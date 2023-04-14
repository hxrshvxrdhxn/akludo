const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity Language
 * */

class LanguageHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onLanguageCreate(newObj) {
        // called when Language is created.
    }

    onLanguageUpdate({oldObj, newObj}) {
        // called when Language is updated.
    }

    onLanguageDelete(id) {
        // called when Language is deleted.
    }

}

exports = module.exports = LanguageHook;
