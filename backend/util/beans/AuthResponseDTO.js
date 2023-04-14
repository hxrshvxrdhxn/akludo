const Bean = require('./Bean');

class AuthResponseDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_success = this._payload.success;
        this._orig_token = this._payload.token;
        this._orig_id = this._payload.id;
    }

    get success() {
        return this._payload.success;
    }

    set success(success) {
        this._payload.success = success;
    }

    get token() {
        return this._payload.token;
    }

    set token(token) {
        this._payload.token = token;
    }

    get id() {
        return this._payload.id;
    }

    set id(id) {
        this._payload.id = id;
    }

}

exports = module.exports = AuthResponseDTO;

