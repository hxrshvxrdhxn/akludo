/**
 * Role model
 * */
const MongoDbModel = require('../../bootloader/mongo');
// For Number types better reading
const Float = Number;
const Int = Number;

class Role extends MongoDbModel {

    /*Define which database to connect to*/
    static get connection() {
        return this.APP_DB;
    }

    /* Needed functions by the MongoDbModel Interface */
    static get Name() {
        return this.name;
    }

    static get Schema() {
        return mongoose => ({
            name: String,
            parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
            inherit: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
            permissions: [{
                resource: {type: mongoose.Schema.Types.ObjectId, ref: 'Resource'},
                accessLevel: /*EnumAccessLevel: NONE, READ_ALL, CREATE, READ, READ_HIERARCHY, MODIFY, DESTROY, DESTROY_ALL*/ String
            }],
            restrictions: [{
                resource: {type: mongoose.Schema.Types.ObjectId, ref: 'Resource'}
            }],
            userPermissions: [String],
            createdAt: Number,
            updatedAt: Number,
            createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        })
    }

    static get Indexes() {
        return [];
    }
}

exports = module.exports = Role;

