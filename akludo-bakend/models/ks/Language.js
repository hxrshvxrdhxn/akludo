/**
 * Language model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const Language = new keystone.List('Language', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Language.add({
    locale: {type: Types.Text, initial: true},
    name: {type: Types.Text, initial: true}
});

/**
 * Registration
 */
Language.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Language.register();

