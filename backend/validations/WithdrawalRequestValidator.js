const Validator = require('./Validator');

class WithdrawalRequestValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    user(user) {
        if (user) {
            return _db.Wallet.convertToObjectId(user) ? false : 'Invalid ID passed for Wallet->user. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    amount(amount) {
        return false; // return string containing error message to define error, else send any false value.
    }


    ledger(ledger) {
        if(!ledger){
            return false;
        }
        return _db.Wallet.convertToObjectId(ledger) ? false : 'Invalid ID passed for BankTransaction->ledger. Please pass a valid Object id.';
    }

    status(status){
        return false;
    }

    bankTransaction(bankTransaction){
        if(!bankTransaction){
            return false
        }
        return _db.BankTransaction.convertToObjectId(bankTransaction) ? false : 'Invalid ID passed for BankTransaction->user. Please pass a valid Object id.';
    }

    createdAt(createdAt) {
        return false; // return string containing error message to define error, else send any false value.
    }


    updatedAt(updatedAt) {
        return false; // return string containing error message to define error, else send any false value.
    }


    createdBy(createdBy) {
        if (createdBy) {
            return _db.Wallet.convertToObjectId(createdBy) ? false : 'Invalid ID passed for Wallet->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.Wallet.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for Wallet->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = WithdrawalRequestValidator;

