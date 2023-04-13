/**
 * Game model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const Game = new keystone.List('Game', {
    track: true,
    nocreate: false,
    nodelete: false,
    noedit: false,
});

Game.add({
    name: {type: Types.Text, initial: true},
    image: {
        storage: {type: Types.Select, options: 'S3, LOCAL, REMOTE_URL', initial: true},
        uri: {type: Types.Text, initial: true},
        name: {type: Types.Text, initial: true},
        mime: {type: Types.Text, initial: true},
        size: {type: Types.Number, initial: true},
        sizeUnit: {type: Types.Select, options: 'B, KB, MB, GB, TB', initial: true}
    },
    status: {type: Types.Select, options: 'AVAILABLE, DISABLED, DEPRECATED', initial: true},
    description: {type: Types.Text, initial: true},
    urn: {type: Types.Text, initial: true}
});

/**
 * Registration
 */
Game.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Game.register();

