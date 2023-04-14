/**
 * Config model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const Config = new keystone.List('Config', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Config.add({
    name: {type: Types.Text, initial: true},
    configType: {type: Types.Select, options: 'BOOLEAN, TEXT, LARGE_TEXT, DATETIME, NUMBER, SELECT', initial: true},
    value: {type: Types.Text, initial: true},
    selectOptions: {type: Types.TextArray, initial: true, required: false, index: false} /*[String]*/
});

/**
 * Registration
 */
Config.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Config.register();

