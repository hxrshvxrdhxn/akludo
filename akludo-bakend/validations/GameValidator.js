const Validator = require('./Validator');

class GameValidator extends Validator {

    constructor(...args) {
        super(...args);
        this.StoredFileValidator = require('./StoredFileValidator');
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    name(name) {
        return false; // return string containing error message to define error, else send any false value.
    }


    image(image) {
        return new this.StoredFileValidator(image, this._validateChild).validate();
    }


    status(status) {
        return false; // return string containing error message to define error, else send any false value.
    }


    description(description) {
        return false; // return string containing error message to define error, else send any false value.
    }


    urn(urn) {
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
            return _db.Game.convertToObjectId(createdBy) ? false : 'Invalid ID passed for Game->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.Game.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for Game->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = GameValidator;

