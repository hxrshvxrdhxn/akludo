const UserService = require('../../services/UserService');
const LedgerService = require('../../services/LedgerService');

/*
* Resolver for type Wallet
*/

class WalletResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.UserResolver = require('./UserResolver');
        this.LedgerResolver = require('./LedgerResolver');
    }

    async id() {
        return this.data._id;
    }


    async user() {
        const found = await UserService.findOne(this.data.user, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


    async bal() {
        return this.data.bal;
    }

    async earning(){
        return this.data.earning || 0;
    }

    async ledger() {
        const docs = [];
        for (let idx = 0; idx < (this.data.ledger || []).length; idx++) {
            docs.push(await LedgerService.findOne(this.data.ledger[idx], this._user));
        }
        return docs.map(doc => new this.LedgerResolver(doc, this._user));
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

exports = module.exports = WalletResolver;

