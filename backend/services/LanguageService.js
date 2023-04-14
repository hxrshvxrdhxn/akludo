const CONSTANTS = require('../util/Constants');
const LanguageDTO = require('../util/beans/LanguageDTO');
const LanguageValidator = require('../validations/LanguageValidator');
const LanguageHook = require('../hooks/LanguageHook');
const LanguageInterceptor = require('../interceptors/LanguageInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over Language Model
 * */

class LanguageService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.Language', user, _db.Language, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.Language.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch Language. ' + _id);

        // fetch
        const foundLanguage = await _db.Language.findOne({_id: id});
        return await LanguageInterceptor.afterLanguageFind(id, foundLanguage, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.Language', user, _db.Language, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.Language.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete Language. ' + _id);

        // remove
        await LanguageInterceptor.beforeLanguageDelete(id, user);
        LanguageHook.trigger('onLanguageDelete', id);
        return await _db.Language.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.Language', user, _db.Language, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await LanguageInterceptor.beforeLanguageList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.Language.count(criteria);

        // Fetch
        const docs = total ? (await _db.Language.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await LanguageInterceptor.afterLanguageList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.Language', user, _db.Language, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.Language.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.Language', user, _db.Language, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof LanguageDTO)) throw new Error('Please provide a LanguageDTO to create the Language.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await LanguageInterceptor.beforeLanguageCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new LanguageValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Language: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.Language(obj);
        const saveResp = await dbObj.save();
        LanguageHook.trigger('onLanguageCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.Language', user, _db.Language, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.Language.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update Language. ' + _id);

        // Fetch original object
        const origDbObj = await _db.Language.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof LanguageDTO)) throw new Error('Please provide a LanguageDTO to update the Language.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await LanguageInterceptor.beforeLanguageUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new LanguageValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Language: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.Language.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.Language.findOne({_id: id});
        LanguageHook.trigger('onLanguageUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = LanguageService;


