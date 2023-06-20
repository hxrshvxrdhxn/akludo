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

var localStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
      path: keystone.expandPath('./public/uploads'), // required; path where the files should be stored
      publicPath: '/public/uploads', // path where files will be served
    }
  });

Game.add({      
    name: {type: Types.Text, initial: true},
    image:{type:Types.File, storage:localStorage},
    status: {type: Types.Select, options: 'AVAILABLE, DISABLED, DEPRECATED', initial: true},
    description: {type: Types.Text, initial: true}
});

/**
 * Registration
 */
Game.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
Game.register();

