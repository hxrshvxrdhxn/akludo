/**
 * Ledger model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const Ledger = new keystone.List('Ledger', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Ledger.add({
    fromUser: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    toUser: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    amount: {type: Types.Number, initial: true},
    txType: {type: Types.Select, options: 'TRANSFER, TOP_UP, WITHDRAW, HOLD', initial: true},
    linkedBankTransaction: {
        type: Types.Relationship,
        ref: 'BankTransaction',
        initial: true,
        required: false,
        index: false
    },
    linkedChallenge: {type: Types.Relationship, ref: 'Challenge', initial: true, required: false, index: false}
});

/**
 * Registration
 */
Ledger.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Ledger.register();

