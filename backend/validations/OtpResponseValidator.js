const Validator = require('./Validator');

class OtpResponseValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    ctx(ctx) {
        return false; // return string containing error message to define error, else send any false value.
    }


    success(success) {
        return false; // return string containing error message to define error, else send any false value.
    }


}

exports = module.exports = OtpResponseValidator;

