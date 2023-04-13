const Validator = require('./Validator');

class AuthResponseValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    success(success) {
        return false; // return string containing error message to define error, else send any false value.
    }


    token(token) {
        return false; // return string containing error message to define error, else send any false value.
    }


    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


}

exports = module.exports = AuthResponseValidator;

