/**
 * BankTransaction model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const BankTransaction = new keystone.List('BankTransaction', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

BankTransaction.add({
    status: {type: Types.Select, options: 'SUCCESS, FAILED, PENDING, PROCESSING', initial: true},
    gateway: {type: Types.Text, initial: true},
    gatewayMethod: {type: Types.Text, initial: true},
    amount: {type: Types.Number, initial: true},
    txType: {type: Types.Select, options: 'TRANSFER, TOP_UP, WITHDRAW, HOLD', initial: true},
    meta: {type: Types.Text, initial: true}
});

/**
 * Registration
 */
BankTransaction.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
BankTransaction.register();

