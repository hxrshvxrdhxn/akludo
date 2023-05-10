const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity User
 * */

class UserHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    onUserCreate(newObj) {
        // called when User is created.
        console.log("user created");
    }

    onUserUpdate({oldObj, newObj}) {
        //console.log("user updated ", oldObj,newObj);
        // called when User is updated.
    }

    onUserDelete(id) {
        // called when User is deleted.
    }

}

exports = module.exports = UserHook;
