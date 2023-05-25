const Hook = require('./base/Hook');
const MainSocketController = require('../sockets/MainSocketController');

/**
 * Hook to run lifecycle events for entity Challenge
 * */

class ChallengeHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    async onChallengeCreate(newObj) {
        // called when Challenge is created.
        MainSocketController.instance.sendMessageToAll({type: 'challenge', data: newObj});
        // bind transaction
        if(newObj.meta) await _db.Ledger.update({_id: _db.Ledger.convertToObjectId(newObj.meta)}, {$set: {linkedChallenge: newObj._id}});
    }

    onChallengeUpdate({oldObj, newObj}) {
        // called when Challenge is updated.
        MainSocketController.instance.sendMessageToAll({type: 'challenge', data: newObj});
    }

    onChallengeDelete(id) {
        // called when Challenge is deleted.
        MainSocketController.instance.sendMessageToAll({type: 'challenge-remove', id: id});
    }

}

exports = module.exports = ChallengeHook;
