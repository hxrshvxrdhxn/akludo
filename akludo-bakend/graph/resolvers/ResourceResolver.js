const UserService = require('../../services/UserService');

/*
* Resolver for type Resource
*/

class ResourceResolver {

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


    async description() {
        return this.data.description;
    }


    async urn() {
        return this.data.urn;
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

exports = module.exports = ResourceResolver;

