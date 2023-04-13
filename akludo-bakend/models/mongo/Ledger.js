/**
 * Ledger model
 * */
const MongoDbModel = require('../../bootloader/mongo');
// For Number types better reading
const Float = Number;
const Int = Number;

class Ledger extends MongoDbModel {

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
            fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            toUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            amount: Float,
            txType: /*EnumTransactionType: TRANSFER, TOP_UP, WITHDRAW, HOLD*/ String,
            linkedBankTransaction: {type: mongoose.Schema.Types.ObjectId, ref: 'BankTransaction'},
            linkedChallenge: {type: mongoose.Schema.Types.ObjectId, ref: 'Challenge'},
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

exports = module.exports = Ledger;

