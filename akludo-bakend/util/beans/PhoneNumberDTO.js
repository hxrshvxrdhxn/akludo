const Bean = require('./Bean');

class PhoneNumberDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_number = this._payload.number;
        this._orig_countryCode = this._payload.countryCode;
        this._orig_isVerified = this._payload.isVerified;
        this._orig_isPrimary = this._payload.isPrimary;
        this._orig_addedAtDate = this._payload.addedAtDate;
        this._orig_verifiedAtDate = this._payload.verifiedAtDate;
        this._orig_madePrimaryAtDate = this._payload.madePrimaryAtDate;
    }

    get number() {
        return this._payload.number;
    }

    set number(number) {
        this._payload.number = number;
    }

    get countryCode() {
        return this._payload.countryCode;
    }

    set countryCode(countryCode) {
        this._payload.countryCode = countryCode;
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

exports = module.exports = PhoneNumberDTO;

