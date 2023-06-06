const Bean = require('./Bean');

class WalletDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_id = this._payload.id;
        this._orig_user = this._payload.user;
        this._orig_bal = this._payload.bal;
        this._orig_ledger = this._payload.ledger;
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

    get user() {
        return this._payload.user;
    }

    set user(user) {
        this._payload.user = user;
    }

    get bal() {
        return this._payload.bal;
    }

    set bal(bal) {
        this._payload.bal = bal;
    }

    get earning(){
        return this._payload.earning;
    }

    set earning(earning){
        this._payload.earning = earning;
    }

    get ledger() {
        return this._payload.ledger;
    }

    set ledger(ledger) {
        this._payload.ledger = ledger;
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

exports = module.exports = WalletDTO;

