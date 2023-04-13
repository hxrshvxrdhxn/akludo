/**
 * BankTransaction model
 * */
const MongoDbModel = require('../../bootloader/mongo');
// For Number types better reading
const Float = Number;
const Int = Number;

class BankTransaction extends MongoDbModel {

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
            status: /*EnumBankTransactionStatus: SUCCESS, FAILED, PENDING, PROCESSING*/ String,
            gateway: String,
            gatewayMethod: String,
            amount: Float,
            txType: /*EnumTransactionType: TRANSFER, TOP_UP, WITHDRAW, HOLD*/ String,
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

exports = module.exports = BankTransaction;

