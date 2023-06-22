const Validator = require('./Validator');

class KYCValidator extends Validator {

    constructor(...args) {
        super(...args);
        this.StoredFileValidator = require('./StoredFileValidator');
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    name(name) {
        return false; // return string containing error message to define error, else send any false value.
    }

    document(doc){
        return new this.StoredFileValidator(doc, this._validateChild).validate();
    }

    documentType(docType){
        return false
    }

    user(user) {
        if (user) {
            return _db.KYC.convertToObjectId(user) ? false : 'Invalid ID passed for kyc->user. Please pass a valid Object id.';
        } else {
            return false;
        }
    }

    profilePhoto(image) {
        return new this.StoredFileValidator(image, this._validateChild).validate();
    }


    email(email) {
        if (email) {
            return (email instanceof Array) ? (email.map(val => new this.EmailValidator(val, this._validateChild).validate())) : 'Please provide an array for the field User->email.'
        }
    }


    phone(phone) {
        if (phone) {
            return (phone instanceof Array) ? (phone.map(val => new this.PhoneNumberValidator(val, this._validateChild).validate())) : 'Please provide an array for the field User->phone.'
        }
    }



    isKycApproved() {
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
            return _db.KYC.convertToObjectId(createdBy) ? false : 'Invalid ID passed for Game->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.KYC.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for Game->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = KYCValidator;

