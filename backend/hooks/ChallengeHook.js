const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity Challenge
 * */

class ChallengeHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onChallengeCreate(newObj) {
        // called when Challenge is created.
    }

    onChallengeUpdate({oldObj, newObj}) {
        // called when Challenge is updated.
    }

    onChallengeDelete(id) {
        // called when Challenge is deleted.
    }

}

exports = module.exports = ChallengeHook;
