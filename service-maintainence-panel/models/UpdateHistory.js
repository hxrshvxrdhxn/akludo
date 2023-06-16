/**
 * UpdateHistory model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const UpdateHistory = new keystone.List('UpdateHistory', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

UpdateHistory.add({
    model: {type: Types.Text, initial: true} /*String*/,
    changelog: {type: Types.Text, initial: true} /*String*/
});

/**
 * Registration
 */
UpdateHistory.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
UpdateHistory.register();

