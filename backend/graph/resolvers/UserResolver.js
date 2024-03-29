const WalletService = require('../../services/WalletService');
const RoleService = require('../../services/RoleService');
const UserService = require('../../services/UserService');
const KYCService = require('../../services/KYCService');
const ReferralService = require('../../services/ReferralService');

/*
* Resolver for type User
*/

class UserResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver/The User Id passed does not exist');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.EmailResolver = require('./EmailResolver');
        this.PhoneNumberResolver = require('./PhoneNumberResolver');
        this.UserOptionsResolver = require('./UserOptionsResolver');
        this.StoredFileResolver = require('./StoredFileResolver');
        this.SocialProfileResolver = require('./SocialProfileResolver');
        this.WalletResolver = require('./WalletResolver');
        this.ReferralResolver=require('./ReferralResolver');
        this.KYCResolver=require('./KYCResolver');
        this.RoleResolver = require('./RoleResolver');
        this.UserResolver = require('./UserResolver');
    }

    async id() {
        return this.data._id;
    }


    async name() {
        return this.data.name;
    }


    async gender() {
        return this.data.gender;
    }


    async emails() {
        console.log("emails:-",this.data.emails);
        return (this.data.emails || []).map(doc => new this.EmailResolver(doc, this._user));
    }


    async phones() {
        console.log("phone:-",this.data.phones)
        return (this.data.phones || []).map(doc => new this.PhoneNumberResolver(doc, this._user));
    }


    async naiveAuthPass() {
        return this.data.naiveAuthPass;
    }


    async status() {
        return this.data.status;
    }


    async options() {
        if (this.data.options) return new this.UserOptionsResolver(this.data.options, this._user);
        else return null;
    }


    async picture() {
        if (this.data.picture) return new this.StoredFileResolver(this.data.picture, this._user);
        else return null;
    }


    async socialProfiles() {
        return (this.data.socialProfiles || []).map(doc => new this.SocialProfileResolver(doc, this._user));
    }


    async wallet() {
        const found = await WalletService.findOne(this.data.wallet, this._user);
        return found ? new this.WalletResolver(found, this._user) : null;
    }

    async kyc(){
        const found = await KYCService.findOne(this.data.kyc, this._user);
        return found ? new this.KYCResolver(found, this._user) : null;
    }

    async referral(){
        const found = await ReferralService.findOne(this.data.referral, this._user);
        console.log("Referral found:-",found);
        return found ? new this.ReferralResolver(found, this._user) : null;
    }

    async defaultRole() {
        const found = await RoleService.findOne(this.data.defaultRole, this._user);
        return found ? new this.RoleResolver(found, this._user) : null;
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

exports = module.exports = UserResolver;

