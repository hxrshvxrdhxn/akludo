const Validator = require('./Validator');

class RoleValidator extends Validator {

    constructor(...args) {
        super(...args);
        this.PermissionValidator = require('./PermissionValidator');
        this.RestrictionValidator = require('./RestrictionValidator');
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    name(name) {
        return false; // return string containing error message to define error, else send any false value.
    }


    parent(parent) {
        if (parent) {
            return _db.Role.convertToObjectId(parent) ? false : 'Invalid ID passed for Role->parent. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    inherit(inherit) {
        return inherit.map((entityId, idx) => _db.Role.convertToObjectId(entityId) ? false : 'Invalid ID passed for Role->inherit[' + idx + ']. Please pass a valid Object id.').filter(e => !!e).join(',').trim();
    }


    permissions(permissions) {
        if (permissions) {
            return (permissions instanceof Array) ? (permissions.map(val => new this.PermissionValidator(val, this._validateChild).validate())) : 'Please provide an array for the field Role->permissions.'
        }
    }


    restrictions(restrictions) {
        if (restrictions) {
            return (restrictions instanceof Array) ? (restrictions.map(val => new this.RestrictionValidator(val, this._validateChild).validate())) : 'Please provide an array for the field Role->restrictions.'
        }
    }


    userPermissions(userPermissions) {
        return false; // return string containing error message to define error, else send any false value.
    }


    createdAt(createdAt) {
        return false; // return string containing error message to define error, else send any false value.
    }


    updatedAt(updatedAt) {
        return false; // return string containing error message to define error, else send any false value.
    }


    createdBy(createdBy) {
        if (createdBy) {
            return _db.Role.convertToObjectId(createdBy) ? false : 'Invalid ID passed for Role->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.Role.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for Role->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = RoleValidator;

