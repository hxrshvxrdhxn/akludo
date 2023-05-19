const UserService = require('../../services/UserService');
// const RoleService = require('../../services/RoleService');
// const KYCService = require('../../services/KYCService');

/*
* Resolver for type User
*/

class KYCResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.EmailResolver = require('./EmailResolver');
        this.PhoneNumberResolver = require('./PhoneNumberResolver');
        this.UserOptionsResolver = require('./UserOptionsResolver');
        this.StoredFileResolver = require('./StoredFileResolver');
        this.SocialProfileResolver = require('./SocialProfileResolver');
        this.WalletResolver = require('./WalletResolver');
        this.RoleResolver = require('./RoleResolver');
        this.UserResolver = require('./UserResolver');
    }

    async id() {
        return this.data._id;
    }
 
    async document(){
        if (this.data.document) return new this.StoredFileResolver(this.data.document, this._user);
        else return null;
    }

    async fileType(){
        return this.data.fileType;
    }

    async user(){
        const found = await UserService.findOne(this.data.user, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }

    async email() {
        return (this.data.emails || []).map(doc => new this.EmailResolver(doc, this._user));
    }

    async documentNumber(){
        return this.data.documentNumber;
    }

    async phone() {
        return (this.data.phones || []).map(doc => new this.PhoneNumberResolver(doc, this._user));
    }

    async profilePhoto() {
        if (this.data.picture) return new this.StoredFileResolver(this.data.picture, this._user);
        else return null;
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

exports = module.exports = KYCResolver;

