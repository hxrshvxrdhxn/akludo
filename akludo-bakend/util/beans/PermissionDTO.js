const Bean = require('./Bean');

class PermissionDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_resource = this._payload.resource;
        this._orig_accessLevel = this._payload.accessLevel;
    }

    get resource() {
        return this._payload.resource;
    }

    set resource(resource) {
        this._payload.resource = resource;
    }

    get accessLevel() {
        return this._payload.accessLevel;
    }

    set accessLevel(accessLevel) {
        this._payload.accessLevel = accessLevel;
    }

}

exports = module.exports = PermissionDTO;

