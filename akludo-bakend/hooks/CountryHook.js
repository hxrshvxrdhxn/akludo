const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity Country
 * */

class CountryHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onCountryCreate(newObj) {
        // called when Country is created.
    }

    onCountryUpdate({oldObj, newObj}) {
        // called when Country is updated.
    }

    onCountryDelete(id) {
        // called when Country is deleted.
    }

}

exports = module.exports = CountryHook;
