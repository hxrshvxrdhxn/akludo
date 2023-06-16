const keystone = require('../ks');
const Types = keystone.Field.Types;

const Referral = new keystone.List('Referral', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Referral.add({
    user: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    bal: {type: Types.Number, initial: true},
    ledger: {type: Types.Relationship, ref: 'Ledger', initial: true, required: false, index: false, many: true},
    referrer: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    referred: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false,many:true},
    earning:{type: Types.Number, initial: true},
    rate:{type: Types.Number, initial: true},
    count:{type: Types.Number, initial: true},
    status:{type: Types.Text, initial: true},
    code:{type: Types.Text, initial: true},
    lastUsed:{type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    lastUsedAt:{type: Types.Number, initial: true},
});

/**
 * Registration
 */
Referral.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Referral.register();