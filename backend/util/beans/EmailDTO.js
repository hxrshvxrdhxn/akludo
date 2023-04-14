const Bean = require('./Bean');

class EmailDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_address = this._payload.address;
        this._orig_isVerified = this._payload.isVerified;
        this._orig_isPrimary = this._payload.isPrimary;
        this._orig_addedAtDate = this._payload.addedAtDate;
        this._orig_verifiedAtDate = this._payload.verifiedAtDate;
        this._orig_madePrimaryAtDate = this._payload.madePrimaryAtDate;
    }

    get address() {
        return this._payload.address;
    }

    set address(address) {
        this._payload.address = address;
    }

    get isVerified() {
        return this._payload.isVerified;
    }

    set isVerified(isVerified) {
        this._payload.isVerified = isVerified;
    }

    get isPrimary() {
        return this._payload.isPrimary;
    }

    set isPrimary(isPrimary) {
        this._payload.isPrimary = isPrimary;
    }

    get addedAtDate() {
        return this._payload.addedAtDate;
    }

    set addedAtDate(addedAtDate) {
        this._payload.addedAtDate = addedAtDate;
    }

    get verifiedAtDate() {
        return this._payload.verifiedAtDate;
    }

    set verifiedAtDate(verifiedAtDate) {
        this._payload.verifiedAtDate = verifiedAtDate;
    }

    get madePrimaryAtDate() {
        return this._payload.madePrimaryAtDate;
    }

    set madePrimaryAtDate(madePrimaryAtDate) {
        this._payload.madePrimaryAtDate = madePrimaryAtDate;
    }

}

exports = module.exports = EmailDTO;

