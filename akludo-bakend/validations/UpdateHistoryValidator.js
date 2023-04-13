const Validator = require('./Validator');

class UpdateHistoryValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    model(model) {
        return false; // return string containing error message to define error, else send any false value.
    }


    changelog(changelog) {
        return false; // return string containing error message to define error, else send any false value.
    }


    createdAt(createdAt) {
        return false; // return string containing error message to define error, else send any false value.
    }


    updatedAt(updatedAt) {
        return false; // return string containing error message to define error, else send any false value.
    }


    createdBy(createdBy) {
        if (createdBy) {
            return _db.UpdateHistory.convertToObjectId(createdBy) ? false : 'Invalid ID passed for UpdateHistory->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.UpdateHistory.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for UpdateHistory->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = UpdateHistoryValidator;

