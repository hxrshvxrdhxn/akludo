/**
 * AuthResponse model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const AuthResponse = new keystone.List('AuthResponse', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

AuthResponse.add({
    success: {type: Types.Boolean, initial: true},
    token: {type: Types.Text, initial: true}
});

/**
 * Registration
 */
AuthResponse.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
AuthResponse.register();

