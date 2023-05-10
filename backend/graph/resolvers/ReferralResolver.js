const UserService = require('../../services/UserService');

/*
* Resolver for type Referral
*/

class ReferralResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.UserResolver = require('./UserResolver');
    }

    async id() {
        return this.data._id;
    }

    async referrer() {
        const found = await UserService.findOne(this.data.referrer, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }

    async referred() {
        const docs = [];
        for (let idx = 0; idx < (this.data.referred || []).length; idx++) {
            docs.push(await UserService.findOne(this.data.referred[idx], this._user));
        }
        return docs.map(doc => new this.UserResolver(doc, this._user));
    }

    async earning() {
        return this.data.earning;
    }

    async rate() {
        return this.data.rate;
    }

    async count() {
        return this.data.count;
    }

    async status() {
        return this.data.status;
    }

    async code() {
        return this.data.code;
    }

    async lastUsed(){
        const found = await UserService.findOne(this.data.lastUsed, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }

    async lastUsedAt(){
        return this.data.lastUsedAt.toString();
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

exports = module.exports = ReferralResolver;

