const Validator = require('./Validator');

class UserOptionsValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    sendNotifications(sendNotifications) {
        return false; // return string containing error message to define error, else send any false value.
    }


    country(country) {
        if (country) {
            return _db.UserOptions.convertToObjectId(country) ? false : 'Invalid ID passed for UserOptions->country. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    defaultLanguage(defaultLanguage) {
        if (defaultLanguage) {
            return _db.UserOptions.convertToObjectId(defaultLanguage) ? false : 'Invalid ID passed for UserOptions->defaultLanguage. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = UserOptionsValidator;

