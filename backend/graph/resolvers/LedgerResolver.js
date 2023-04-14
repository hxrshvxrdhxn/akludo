const UserService = require('../../services/UserService');
const BankTransactionService = require('../../services/BankTransactionService');
const ChallengeService = require('../../services/ChallengeService');

/*
* Resolver for type Ledger
*/

class LedgerResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.UserResolver = require('./UserResolver');
        this.BankTransactionResolver = require('./BankTransactionResolver');
        this.ChallengeResolver = require('./ChallengeResolver');
    }

    async id() {
        return this.data._id;
    }


    async fromUser() {
        const found = await UserService.findOne(this.data.fromUser, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


    async toUser() {
        const found = await UserService.findOne(this.data.toUser, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


    async amount() {
        return this.data.amount;
    }


    async txType() {
        return this.data.txType;
    }


    async linkedBankTransaction() {
        const found = await BankTransactionService.findOne(this.data.linkedBankTransaction, this._user);
        return found ? new this.BankTransactionResolver(found, this._user) : null;
    }


    async linkedChallenge() {
        const found = await ChallengeService.findOne(this.data.linkedChallenge, this._user);
        return found ? new this.ChallengeResolver(found, this._user) : null;
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

exports = module.exports = LedgerResolver;

