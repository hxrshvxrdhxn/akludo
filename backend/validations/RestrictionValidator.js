const Validator = require('./Validator');

class RestrictionValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    resource(resource) {
        if (resource) {
            return _db.Restriction.convertToObjectId(resource) ? false : 'Invalid ID passed for Restriction->resource. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = RestrictionValidator;

