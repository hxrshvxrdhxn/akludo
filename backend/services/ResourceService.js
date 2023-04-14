const CONSTANTS = require('../util/Constants');
const ResourceDTO = require('../util/beans/ResourceDTO');
const ResourceValidator = require('../validations/ResourceValidator');
const ResourceHook = require('../hooks/ResourceHook');
const ResourceInterceptor = require('../interceptors/ResourceInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over Resource Model
 * */

class ResourceService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.Resource', user, _db.Resource, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.Resource.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch Resource. ' + _id);

        // fetch
        const foundResource = await _db.Resource.findOne({_id: id});
        return await ResourceInterceptor.afterResourceFind(id, foundResource, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.Resource', user, _db.Resource, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.Resource.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete Resource. ' + _id);

        // remove
        await ResourceInterceptor.beforeResourceDelete(id, user);
        ResourceHook.trigger('onResourceDelete', id);
        return await _db.Resource.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.Resource', user, _db.Resource, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await ResourceInterceptor.beforeResourceList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.Resource.count(criteria);

        // Fetch
        const docs = total ? (await _db.Resource.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await ResourceInterceptor.afterResourceList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.Resource', user, _db.Resource, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.Resource.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.Resource', user, _db.Resource, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof ResourceDTO)) throw new Error('Please provide a ResourceDTO to create the Resource.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await ResourceInterceptor.beforeResourceCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new ResourceValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Resource: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.Resource(obj);
        const saveResp = await dbObj.save();
        ResourceHook.trigger('onResourceCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.Resource', user, _db.Resource, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.Resource.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update Resource. ' + _id);

        // Fetch original object
        const origDbObj = await _db.Resource.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof ResourceDTO)) throw new Error('Please provide a ResourceDTO to update the Resource.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await ResourceInterceptor.beforeResourceUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new ResourceValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Resource: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.Resource.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.Resource.findOne({_id: id});
        ResourceHook.trigger('onResourceUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = ResourceService;


