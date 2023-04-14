const Validator = require('./Validator');

class BankTransactionValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    status(status) {
        return false; // return string containing error message to define error, else send any false value.
    }


    gateway(gateway) {
        return false; // return string containing error message to define error, else send any false value.
    }


    gatewayMethod(gatewayMethod) {
        return false; // return string containing error message to define error, else send any false value.
    }


    amount(amount) {
        return false; // return string containing error message to define error, else send any false value.
    }


    txType(txType) {
        return false; // return string containing error message to define error, else send any false value.
    }


    meta(meta) {
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
            return _db.BankTransaction.convertToObjectId(createdBy) ? false : 'Invalid ID passed for BankTransaction->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.BankTransaction.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for BankTransaction->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = BankTransactionValidator;

