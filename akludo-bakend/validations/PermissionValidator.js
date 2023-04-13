const Validator = require('./Validator');

class PermissionValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    resource(resource) {
        if (resource) {
            return _db.Permission.convertToObjectId(resource) ? false : 'Invalid ID passed for Permission->resource. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    accessLevel(accessLevel) {
        return false; // return string containing error message to define error, else send any false value.
    }


}

exports = module.exports = PermissionValidator;

