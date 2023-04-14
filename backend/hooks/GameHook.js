const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity Game
 * */

class GameHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onGameCreate(newObj) {
        // called when Game is created.
    }

    onGameUpdate({oldObj, newObj}) {
        // called when Game is updated.
    }

    onGameDelete(id) {
        // called when Game is deleted.
    }

}

exports = module.exports = GameHook;
