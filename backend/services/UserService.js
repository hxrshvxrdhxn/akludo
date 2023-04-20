const CONSTANTS = require('../util/Constants');
const UserDTO = require('../util/beans/UserDTO');
const UserValidator = require('../validations/UserValidator');
const UserHook = require('../hooks/UserHook');
const UserInterceptor = require('../interceptors/UserInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over User Model
 * */

class UserService {

    static async authenticate(token, ctxUser) {
        let userDecrypted;
        if (token && token === 'auto') {
            userDecrypted = ctxUser;
        } else if (token) {
            userDecrypted = StatelessMiddleware.dec(token);
        } else {
            userDecrypted = ctxUser;
        }
        if (ctxUser && ctxUser._id) {
            return await this.findOne(_db.User.convertToObjectId(userDecrypted._id));
        } else throw new Error("Invalid auth provided");
    }

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.User', user, _db.User, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        if (id === 'me') id = user._id || user.id;
        id = _db.User.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch User. ' + _id);

        // fetch
        const foundUser = await _db.User.findOne({_id: id});
        return await UserInterceptor.afterUserFind(id, foundUser, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.User', user, _db.User, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.User.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete User. ' + _id);

        // remove
        await UserInterceptor.beforeUserDelete(id, user);
        UserHook.trigger('onUserDelete', id);
        return await _db.User.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.User', user, _db.User, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await UserInterceptor.beforeUserList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.User.count(criteria);

        // Fetch
        const docs = total ? (await _db.User.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await UserInterceptor.afterUserList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.User', user, _db.User, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.User.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.User', user, _db.User, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof UserDTO)) throw new Error('Please provide a UserDTO to create the User.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await UserInterceptor.beforeUserCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new UserValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for User: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.User(obj);
        const saveResp = await dbObj.save();
        UserHook.trigger('onUserCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.User', user, _db.User, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.User.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update User. ' + _id);

        // Fetch original object
        const origDbObj = await _db.User.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof UserDTO)) throw new Error('Please provide a UserDTO to update the User.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await UserInterceptor.beforeUserUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new UserValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error(': ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.User.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.User.findOne({_id: id});
        UserHook.trigger('onUserUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = UserService;


