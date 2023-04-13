const Validator = require('./Validator');

class LedgerValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    fromUser(fromUser) {
        if (fromUser) {
            return _db.Ledger.convertToObjectId(fromUser) ? false : 'Invalid ID passed for Ledger->fromUser. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    toUser(toUser) {
        if (toUser) {
            return _db.Ledger.convertToObjectId(toUser) ? false : 'Invalid ID passed for Ledger->toUser. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    amount(amount) {
        return false; // return string containing error message to define error, else send any false value.
    }


    txType(txType) {
        return false; // return string containing error message to define error, else send any false value.
    }


    linkedBankTransaction(linkedBankTransaction) {
        if (linkedBankTransaction) {
            return _db.Ledger.convertToObjectId(linkedBankTransaction) ? false : 'Invalid ID passed for Ledger->linkedBankTransaction. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    linkedChallenge(linkedChallenge) {
        if (linkedChallenge) {
            return _db.Ledger.convertToObjectId(linkedChallenge) ? false : 'Invalid ID passed for Ledger->linkedChallenge. Please pass a valid Object id.';
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
            return _db.Ledger.convertToObjectId(createdBy) ? false : 'Invalid ID passed for Ledger->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.Ledger.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for Ledger->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = LedgerValidator;

