const UserService = require('../../services/UserService');

/*
* Resolver for type Game
*/

class GameResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.StoredFileResolver = require('./StoredFileResolver');
        this.UserResolver = require('./UserResolver');
    }

    async id() {
        return this.data._id;
    }


    async name() {
        return this.data.name;
    }


    async image() {
        if (this.data.image) return new this.StoredFileResolver(this.data.image, this._user);
        else return null;
    }


    async status() {
        return this.data.status;
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

exports = module.exports = GameResolver;

