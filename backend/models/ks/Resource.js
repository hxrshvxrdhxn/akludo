/**
 * Resource model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const Resource = new keystone.List('Resource', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Resource.add({
    description: {type: Types.Text, initial: true},
    urn: {type: Types.Text, initial: true}
});

/**
 * Registration
 */
Resource.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Resource.register();

