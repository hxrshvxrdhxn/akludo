const Bean = require('./Bean');

class BankTransactionDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_id = this._payload.id;
        this._orig_status = this._payload.status;
        this._orig_gateway = this._payload.gateway;
        this._orig_gatewayMethod = this._payload.gatewayMethod;
        this._orig_amount = this._payload.amount;
        this._orig_txType = this._payload.txType;
        this._orig_meta = this._payload.meta;
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

    get status() {
        return this._payload.status;
    }

    set status(status) {
        this._payload.status = status;
    }

    get gateway() {
        return this._payload.gateway;
    }

    set gateway(gateway) {
        this._payload.gateway = gateway;
    }

    get gatewayMethod() {
        return this._payload.gatewayMethod;
    }

    set gatewayMethod(gatewayMethod) {
        this._payload.gatewayMethod = gatewayMethod;
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

    get meta() {
        return this._payload.meta;
    }

    set meta(meta) {
        this._payload.meta = meta;
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

exports = module.exports = BankTransactionDTO;

