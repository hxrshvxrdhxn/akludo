/**
 * Wallet model
 * */
const MongoDbModel = require('../../bootloader/mongo');
// For Number types better reading
const Float = Number;
const Int = Number;

class WithdrawalRequest extends MongoDbModel {

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
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            amount: Float,
            status: /*EnumUserStatus:  INTIATED, PROCESSING, COMPLETED, REJECTED, ACTIVE, */ String,
            bankTransaction: {type: mongoose.Schema.Types.ObjectId, ref: 'BankTransaction'},
            ledger: {type: mongoose.Schema.Types.ObjectId, ref: 'Ledger'},
            rejectReason: String,
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

exports = module.exports = WithdrawalRequest;

