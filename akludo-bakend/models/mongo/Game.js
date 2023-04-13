/**
 * Game model
 * */
const MongoDbModel = require('../../bootloader/mongo');
// For Number types better reading
const Float = Number;
const Int = Number;

class Game extends MongoDbModel {

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
            image: {
                storage: /*EnumFileStorage: S3, LOCAL, REMOTE_URL*/ String,
                uri: String,
                name: String,
                mime: String,
                size: Float,
                sizeUnit: /*EnumSizeUnit: B, KB, MB, GB, TB*/ String
            },
            status: /*EnumGameStatus: AVAILABLE, DISABLED, DEPRECATED*/ String,
            description: String,
            urn: String,
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

exports = module.exports = Game;

