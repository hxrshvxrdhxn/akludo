const Bean = require('./Bean');

class RestrictionDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_resource = this._payload.resource;
    }

    get resource() {
        return this._payload.resource;
    }

    set resource(resource) {
        this._payload.resource = resource;
    }

}

exports = module.exports = RestrictionDTO;

