const Validator = require('./Validator');

class LanguageValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    locale(locale) {
        return false; // return string containing error message to define error, else send any false value.
    }


    name(name) {
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
            return _db.Language.convertToObjectId(createdBy) ? false : 'Invalid ID passed for Language->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.Language.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for Language->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = LanguageValidator;

