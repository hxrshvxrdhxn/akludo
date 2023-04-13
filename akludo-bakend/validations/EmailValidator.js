const Validator = require('./Validator');

class EmailValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    address(address) {
        return false; // return string containing error message to define error, else send any false value.
    }


    isVerified(isVerified) {
        return false; // return string containing error message to define error, else send any false value.
    }


    isPrimary(isPrimary) {
        return false; // return string containing error message to define error, else send any false value.
    }


    addedAtDate(addedAtDate) {
        return false; // return string containing error message to define error, else send any false value.
    }


    verifiedAtDate(verifiedAtDate) {
        return false; // return string containing error message to define error, else send any false value.
    }


    madePrimaryAtDate(madePrimaryAtDate) {
        return false; // return string containing error message to define error, else send any false value.
    }


}

exports = module.exports = EmailValidator;

