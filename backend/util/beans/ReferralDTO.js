const Bean = require('./Bean');

class ReferralDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_id = this._payload.id;
        this._orig_referrer = this._payload.referrer;
        this._orig_referred = this._payload.referred;
        this._orig_earning = this._payload.earning;
        this._orig_rate = this._payload.rate;
        this._orig_count = this._payload.count;
        this._orig_status = this._payload.status;
        this._orig_code = this._payload.code;
        this._orig_lastUsed = this._payload.lastUsed;
        this._orig_lastUsedAt = this._payload.lastUsedAt;
        this._orig_createdAt = this._payload.createdAt;
        this._orig_updatedAt = this._payload.updatedAt;
        this._orig_createdBy = this._payload.createdBy;
        this._orig_updatedBy = this._payload.updatedBy;
    }

    get id() {
        return this._payload.id;
    }

    set id(id) {
        this._payload.id = id;
    }

    get referrer() {
        return this._payload.referrer;
    }

    set referrer(referrer) {
        this._payload.referrer = referrer;
    }

    get referred() {
        return this._payload.referred;
    }

    set referred(referred) {
        this._payload.referred = referred;
    }

    get earning() {
        return this._payload.earning;
    }

    set earning(earning) {
        this._payload.earning= earning;
    }

    get rate() {
        return this._payload.rate;
    }
    
    set rate(rate) {
        this._payload.rate= rate;
    }

    get count () {
        return this._payload.bal;
    }

    set count (count ) {
        this._payload.count  = count ;
    }

    get status () {
        return this._payload.status;
    }

    set status(status) {
        this._payload.status = status;
    }

    get code () {
        return this._payload.code;
    }

    set code(code) {
        this._payload.code = code;
    }
    
    get lastUsed() {
        return this._payload.lastUsed;
    }

    set lastUsed(lastUsed) {
        this._payload.lastUsed = lastUsed;
    }

    get lastUsedAt() {
        return this._payload.lastUsedAt;
    }

    set lastUsedAt(lastUsedAt) {
        this._payload.lastUsedAt = lastUsedAt;
    }

    get createdAt() {
        return this._payload.createdAt;
    }

    set createdAt(createdAt) {
        this._payload.createdAt = createdAt;
    }

    get updatedAt() {
        return this._payload.updatedAt;
    }

    set updatedAt(updatedAt) {
        this._payload.updatedAt = updatedAt;
    }

    get createdBy() {
        return this._payload.createdBy;
    }

    set createdBy(createdBy) {
        this._payload.createdBy = createdBy;
    }

    get updatedBy() {
        return this._payload.updatedBy;
    }

    set updatedBy(updatedBy) {
        this._payload.updatedBy = updatedBy;
    }

}

exports = module.exports = ReferralDTO;

