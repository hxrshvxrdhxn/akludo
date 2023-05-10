const Validator = require('./Validator');

class UserValidator extends Validator {

    constructor(...args) {
        super(...args);
        this.EmailValidator = require('./EmailValidator');
        this.PhoneNumberValidator = require('./PhoneNumberValidator');
        this.UserOptionsValidator = require('./UserOptionsValidator');
        this.StoredFileValidator = require('./StoredFileValidator');
        this.SocialProfileValidator = require('./SocialProfileValidator');
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    name(name) {
        return false; // return string containing error message to define error, else send any false value.
    }


    gender(gender) {
        return false; // return string containing error message to define error, else send any false value.
    }


    emails(emails) {
        if (emails) {
            return (emails instanceof Array) ? (emails.map(val => new this.EmailValidator(val, this._validateChild).validate())) : 'Please provide an array for the field User->emails.'
        }
    }


    phones(phones) {
        if (phones) {
            return (phones instanceof Array) ? (phones.map(val => new this.PhoneNumberValidator(val, this._validateChild).validate())) : 'Please provide an array for the field User->phones.'
        }
    }


    naiveAuthPass(naiveAuthPass) {
        return false; // return string containing error message to define error, else send any false value.
    }


    status(status) {
        return false; // return string containing error message to define error, else send any false value.
    }


    options(options) {
        return new this.UserOptionsValidator(options, this._validateChild).validate();
    }


    picture(picture) {
        return new this.StoredFileValidator(picture, this._validateChild).validate();
    }


    socialProfiles(socialProfiles) {
        if (socialProfiles) {
            return (socialProfiles instanceof Array) ? (socialProfiles.map(val => new this.SocialProfileValidator(val, this._validateChild).validate())) : 'Please provide an array for the field User->socialProfiles.'
        }
    }


    wallet(wallet) {
        if (wallet) {
            return _db.User.convertToObjectId(wallet) ? false : 'Invalid ID passed for User->wallet. Please pass a valid Object id.';
        } else {
            return false;
        }
    }

    Referral(referral) {
        if (referral) {
            return _db.User.convertToObjectId(referral) ? false : 'Invalid ID passed for User->refer. Please pass a valid Object id.';
        } else {
            return false;
        }
    }

    defaultRole(defaultRole) {
        if (defaultRole) {
            return _db.User.convertToObjectId(defaultRole) ? false : 'Invalid ID passed for User->defaultRole. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    createdAt(createdAt) {
        return false; // return string containing error message to define error, else send any false value.
    }


    updatedAt(updatedAt) {
        return false; // return string containing error message to define error, else send any false value.
    }


    createdBy(createdBy) {
        if (createdBy) {
            return _db.User.convertToObjectId(createdBy) ? false : 'Invalid ID passed for User->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.User.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for User->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = UserValidator;

