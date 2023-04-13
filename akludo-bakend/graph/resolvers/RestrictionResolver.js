const ResourceService = require('../../services/ResourceService');

/*
* Resolver for type Restriction
*/

class RestrictionResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.ResourceResolver = require('./ResourceResolver');
    }

    async resource() {
        const found = await ResourceService.findOne(this.data.resource, this._user);
        return found ? new this.ResourceResolver(found, this._user) : null;
    }


}

exports = module.exports = RestrictionResolver;

