const CONSTANTS = require('../util/Constants');
const RoleDTO = require('../util/beans/RoleDTO');
const RoleValidator = require('../validations/RoleValidator');
const RoleHook = require('../hooks/RoleHook');
const RoleInterceptor = require('../interceptors/RoleInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over Role Model
 * */

class RoleService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.Role', user, _db.Role, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.Role.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch Role. ' + _id);

        // fetch
        const foundRole = await _db.Role.findOne({_id: id});
        return await RoleInterceptor.afterRoleFind(id, foundRole, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.Role', user, _db.Role, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.Role.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete Role. ' + _id);

        // remove
        await RoleInterceptor.beforeRoleDelete(id, user);
        RoleHook.trigger('onRoleDelete', id);
        return await _db.Role.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.Role', user, _db.Role, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await RoleInterceptor.beforeRoleList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.Role.count(criteria);

        // Fetch
        const docs = total ? (await _db.Role.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await RoleInterceptor.afterRoleList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.Role', user, _db.Role, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.Role.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.Role', user, _db.Role, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof RoleDTO)) throw new Error('Please provide a RoleDTO to create the Role.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await RoleInterceptor.beforeRoleCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new RoleValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Role: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.Role(obj);
        const saveResp = await dbObj.save();
        RoleHook.trigger('onRoleCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.Role', user, _db.Role, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.Role.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update Role. ' + _id);

        // Fetch original object
        const origDbObj = await _db.Role.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof RoleDTO)) throw new Error('Please provide a RoleDTO to update the Role.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await RoleInterceptor.beforeRoleUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new RoleValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Role: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.Role.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.Role.findOne({_id: id});
        RoleHook.trigger('onRoleUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = RoleService;


