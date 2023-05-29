const UserService = require('../../services/UserService');
const BankTransactionService = require('../../services/BankTransactionService');

/*
* Resolver for type Ledger
*/

class OrderResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.UserResolver = require('./UserResolver');
        this.BankTransactionResolver = require('./BankTransactionResolver');
    }


    async id() {
        return this.data.cf_order_id;
    }

    async user() {
        console.log(this.data.customer_details.customer_id);
        const userId=this.data.customer_details.customer_id;
        const found = await UserService.findOne(userId, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


    async amount() {
        return parseFloat(this?.data?.order_amount);
    }


    async currency() {
        return this?.data?.order_currency;
    }


    async transaction() {
        const transactionId=this?.data?.order_tags?.transaction_id;
        const found = await BankTransactionService.findOne(transactionId, this._user);
        return found ? new this.BankTransactionResolver(found, this._user) : null;
    }

    async orderId(){
        return this?.data?.order_id;
    }

    async expiryTime(){
        return this?.data?.order_expiry_time;
    }

    async orderStatus(){
        return this?.data?.order_status;
    }

    async paymentId(){
        return this?.data?.payment_session_id;
    }

    async orderNote(){
        return this.data.order_note?this.data.order_note:null;
    }


}

exports = module.exports = OrderResolver;


