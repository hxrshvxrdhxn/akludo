const Bean = require('./Bean');

class RoleDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_id = this._payload.id;
        this._orig_name = this._payload.name;
        this._orig_parent = this._payload.parent;
        this._orig_inherit = this._payload.inherit;
        this._orig_permissions = this._payload.permissions;
        this._orig_restrictions = this._payload.restrictions;
        this._orig_userPermissions = this._payload.userPermissions;
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

    get name() {
        return this._payload.name;
    }

    set name(name) {
        this._payload.name = name;
    }

    get parent() {
        return this._payload.parent;
    }

    set parent(parent) {
        this._payload.parent = parent;
    }

    get inherit() {
        return this._payload.inherit;
    }

    set inherit(inherit) {
        this._payload.inherit = inherit;
    }

    get permissions() {
        return this._payload.permissions;
    }

    set permissions(permissions) {
        this._payload.permissions = permissions;
    }

    get restrictions() {
        return this._payload.restrictions;
    }

    set restrictions(restrictions) {
        this._payload.restrictions = restrictions;
    }

    get userPermissions() {
        return this._payload.userPermissions;
    }

    set userPermissions(userPermissions) {
        this._payload.userPermissions = userPermissions;
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

exports = module.exports = RoleDTO;

