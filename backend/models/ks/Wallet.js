/**
 * Wallet model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const Wallet = new keystone.List('Wallet', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Wallet.add({
    user: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    bal: {type: Types.Number, initial: true},
    earning: {type:Types.Number, intial: true},
    ledger: {type: Types.Relationship, ref: 'Ledger', initial: true, required: false, index: false, many: true}
});

/**
 * Registration
 */
Wallet.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Wallet.register();

