/**
 * Country model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const Country = new keystone.List('Country', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Country.add({
    name: {type: Types.Text, initial: true},
    code: {type: Types.Text, initial: true}
});

/**
 * Registration
 */
Country.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Country.register();

