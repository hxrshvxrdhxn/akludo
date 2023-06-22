const UserService = require('../../services/UserService');
const LedgerService = require('../../services/LedgerService');
const BankTransactionService = require('../../services/BankTransactionService');
/*
* Resolver for type Wallet
*/

class WithdrawalRequestResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.UserResolver = require('./UserResolver');
        this.LedgerResolver = require('./LedgerResolver');
        this.BankTransactionResolver = require('./BankTransactionResolver');
    }

    async id() {
        return this.data._id;
    }


    async user() {
        const found = await UserService.findOne(this.data.user, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


    async amount() {
        return this.data.amount;
    }

    async ledger() {
        const found = await LedgerService.findOne(this.data.ledger, this._user);
        return found ? new this.LedgerResolver(found, this._user) : null;
    }

    async bankTransaction() {
        const found = await BankTransactionService.findOne(this.data.bankTransaction, this._user);
        return found ? new this.BankTransactionResolver(found, this._user) : null;
    }

    async status(){
        return this.data.status;
    }

    async rejectReason(){
        return this.data.rejectReason;
    }

    async createdAt() {
        return this.data.createdAt.toString();
    }


    async updatedAt() {
        return this.data.updatedAt.toString();
    }


    async createdBy() {
        const found = await UserService.findOne(this.data.createdBy, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


    async updatedBy() {
        const found = await UserService.findOne(this.data.updatedBy, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


}

exports = module.exports = WithdrawalRequestResolver;

