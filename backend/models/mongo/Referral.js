/**
 * Referral model
 * */
const MongoDbModel = require('../../bootloader/mongo');
// For Number types better reading
const Float = Number;

class Referral extends MongoDbModel {

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
            referrer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            referred: [{type:mongoose.Schema.Types.ObjectId, ref:'User' }],
            earning: Float,
            rate:Float,
            count:Float,
            status:String,
            code:String,
            lastUsed:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            lastUsedAt:Number,
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

exports = module.exports = Referral;

