/**
 * Withdrawal model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const WithdrawalRequest = new keystone.List('WithdrawalRequest', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

WithdrawalRequest.add({
    user: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    amount: {type: Types.Number, initial: true},
    bankTransaction:{type: Types.Relationship, ref:'BankTransaction' },
    ledger: {type: Types.Relationship, ref: 'Ledger', initial: true, required: false, index: false, many: true},
    status: {type: Types.Select, options: 'INTIATED, PROCESSING, COMPLETED, REJECTED, ACTIVE'},
    rejectReason: {type: Types.Text}
});

/**
 * Registration
 */
WithdrawalRequest.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
WithdrawalRequest.register();