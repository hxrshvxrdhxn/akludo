const Validator = require('./Validator');

class StoredFileValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    storage(storage) {
        return false; // return string containing error message to define error, else send any false value.
    }


    uri(uri) {
        return false; // return string containing error message to define error, else send any false value.
    }


    name(name) {
        return false; // return string containing error message to define error, else send any false value.
    }


    mime(mime) {
        return false; // return string containing error message to define error, else send any false value.
    }


    size(size) {
        return false; // return string containing error message to define error, else send any false value.
    }


    sizeUnit(sizeUnit) {
        return false; // return string containing error message to define error, else send any false value.
    }


}

exports = module.exports = StoredFileValidator;

