/**
 * Challenge model
 * */
const MongoDbModel = require('../../bootloader/mongo');
// For Number types better reading
const Float = Number;
const Int = Number;

class Challenge extends MongoDbModel {

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
            challenger: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            contender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            amount: Float,
            game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
            roomCode: String,
            winner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            status: /*EnumChallengeStatus: PENDING, CREATED, STARTED, COMPLETE, CANCELLED*/ String,
            meta: String,
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

exports = module.exports = Challenge;

