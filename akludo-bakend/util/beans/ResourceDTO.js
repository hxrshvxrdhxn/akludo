const Bean = require('./Bean');

class ResourceDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_id = this._payload.id;
        this._orig_description = this._payload.description;
        this._orig_urn = this._payload.urn;
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

    get description() {
        return this._payload.description;
    }

    set description(description) {
        this._payload.description = description;
    }

    get urn() {
        return this._payload.urn;
    }

    set urn(urn) {
        this._payload.urn = urn;
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

exports = module.exports = ResourceDTO;

