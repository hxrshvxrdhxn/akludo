const RoleService = require('../../services/RoleService');
const UserService = require('../../services/UserService');

/*
* Resolver for type Role
*/

class RoleResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.RoleResolver = require('./RoleResolver');
        this.PermissionResolver = require('./PermissionResolver');
        this.RestrictionResolver = require('./RestrictionResolver');
        this.UserResolver = require('./UserResolver');
    }

    async id() {
        return this.data._id;
    }


    async name() {
        return this.data.name;
    }


    async parent() {
        const found = await RoleService.findOne(this.data.parent, this._user);
        return found ? new this.RoleResolver(found, this._user) : null;
    }


    async inherit() {
        const docs = [];
        for (let idx = 0; idx < (this.data.inherit || []).length; idx++) {
            docs.push(await RoleService.findOne(this.data.inherit[idx], this._user));
        }
        return docs.map(doc => new this.RoleResolver(doc, this._user));
    }


    async permissions() {
        return (this.data.permissions || []).map(doc => new this.PermissionResolver(doc, this._user));
    }


    async restrictions() {
        return (this.data.restrictions || []).map(doc => new this.RestrictionResolver(doc, this._user));
    }


    async userPermissions() {
        return this.data.userPermissions;
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

exports = module.exports = RoleResolver;

