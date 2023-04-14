/**
 * Challenge model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const Challenge = new keystone.List('Challenge', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Challenge.add({
    challenger: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    contender: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    amount: {type: Types.Number, initial: true},
    game: {type: Types.Relationship, ref: 'Game', initial: true, required: false, index: false},
    roomCode: {type: Types.Text, initial: true},
    winner: {type: Types.Relationship, ref: 'User', initial: true, required: false, index: false},
    status: {type: Types.Select, options: 'PENDING, CREATED, STARTED, COMPLETE, CANCELLED', initial: true},
    meta: {type: Types.Text, initial: true}
});

/**
 * Registration
 */
Challenge.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Challenge.register();

