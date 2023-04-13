const Bean = require('./Bean');

class LedgerDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_id = this._payload.id;
        this._orig_fromUser = this._payload.fromUser;
        this._orig_toUser = this._payload.toUser;
        this._orig_amount = this._payload.amount;
        this._orig_txType = this._payload.txType;
        this._orig_linkedBankTransaction = this._payload.linkedBankTransaction;
        this._orig_linkedChallenge = this._payload.linkedChallenge;
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

    get fromUser() {
        return this._payload.fromUser;
    }

    set fromUser(fromUser) {
        this._payload.fromUser = fromUser;
    }

    get toUser() {
        return this._payload.toUser;
    }

    set toUser(toUser) {
        this._payload.toUser = toUser;
    }

    get amount() {
        return this._payload.amount;
    }

    set amount(amount) {
        this._payload.amount = amount;
    }

    get txType() {
        return this._payload.txType;
    }

    set txType(txType) {
        this._payload.txType = txType;
    }

    get linkedBankTransaction() {
        return this._payload.linkedBankTransaction;
    }

    set linkedBankTransaction(linkedBankTransaction) {
        this._payload.linkedBankTransaction = linkedBankTransaction;
    }

    get linkedChallenge() {
        return this._payload.linkedChallenge;
    }

    set linkedChallenge(linkedChallenge) {
        this._payload.linkedChallenge = linkedChallenge;
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

exports = module.exports = LedgerDTO;

