const Bean = require('./Bean');

class OtpResponseDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_ctx = this._payload.ctx;
        this._orig_success = this._payload.success;
    }

    get ctx() {
        return this._payload.ctx;
    }

    set ctx(ctx) {
        this._payload.ctx = ctx;
    }

    get success() {
        return this._payload.success;
    }

    set success(success) {
        this._payload.success = success;
    }

}

exports = module.exports = OtpResponseDTO;

