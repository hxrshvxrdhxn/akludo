const Validator = require('./Validator');

class ReferralValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    referrer(referrer) {
        if (referrer) {
            return _db.Referral.convertToObjectId(referrer) ? false : 'Invalid ID passed for Referrer->user. Please pass a valid Object id.';
        } else {
            return false;
        }
    }

    referred(referred) {
        return referred.map((entityId, idx) => _db.Referral.convertToObjectId(entityId) ? false : 'Invalid ID passed for Refer->referred[' + idx + ']. Please pass a valid Object id.').filter(e => !!e).join(',').trim();
    }

    earning(earning) {
        return false; // return string containing error message to define error, else send any false value.
    }

    rate(rate) {
        return false; // return string containing error message to define error, else send any false value.
    }

    count(count) {
        return false; // return string containing error message to define error, else send any false value.
    }
        
    status(status) {
        return false; // return string containing error message to define error, else send any false value.
    }

    code(code) {
        return false; // return string containing error message to define error, else send any false value.
    }

    rate(rate) {
        return false; // return string containing error message to define error, else send any false value.
    }

    count(count){
        return false;
    }

    lastUsed(lastUsed) {
        if (lastUsed) {
            return _db.Referral.convertToObjectId(lastUsed) ? false : 'Invalid ID passed for Refer->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }    
    }

    lastUsedAt(lastUsedAt) {
        if (lastUsedAt) {
            return _db.Referral.convertToObjectId(lastUsedAt) ? false : 'Invalid ID passed for Refer->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }    
    }

    createdAt(createdAt) {
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
            return _db.Referral.convertToObjectId(createdBy) ? false : 'Invalid ID passed for Refer->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.Referral.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for Refer->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}


exports = module.exports = ReferralValidator;

