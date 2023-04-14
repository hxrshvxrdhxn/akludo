const CONSTANTS = require('../util/Constants');
const GameDTO = require('../util/beans/GameDTO');
const GameValidator = require('../validations/GameValidator');
const GameHook = require('../hooks/GameHook');
const GameInterceptor = require('../interceptors/GameInterceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over Game Model
 * */

class GameService {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.Game', user, _db.Game, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.Game.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch Game. ' + _id);

        // fetch
        const foundGame = await _db.Game.findOne({_id: id});
        return await GameInterceptor.afterGameFind(id, foundGame, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.Game', user, _db.Game, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.Game.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete Game. ' + _id);

        // remove
        await GameInterceptor.beforeGameDelete(id, user);
        GameHook.trigger('onGameDelete', id);
        return await _db.Game.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.Game', user, _db.Game, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));

        // intercept query
        await GameInterceptor.beforeGameList(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.Game.count(criteria);

        // Fetch
        const docs = total ? (await _db.Game.find(criteria).skip(offset).limit(limit)) : [];
        return {
            docs: (await GameInterceptor.afterGameList(criteria, docs, limit, offset, total, user)),
            total,
            limit,
            offset
        };
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.Game', user, _db.Game, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.Game.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.Game', user, _db.Game, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof GameDTO)) throw new Error('Please provide a GameDTO to create the Game.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await GameInterceptor.beforeGameCreate(dto, user);

        // check data
        const obj = dto.toObject();
        const validationResult = new GameValidator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Game: ' + validationResult.errorString);
        }

        // save
        const dbObj = new _db.Game(obj);
        const saveResp = await dbObj.save();
        GameHook.trigger('onGameCreate', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.Game', user, _db.Game, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.Game.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update Game. ' + _id);

        // Fetch original object
        const origDbObj = await _db.Game.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof GameDTO)) throw new Error('Please provide a GameDTO to update the Game.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await GameInterceptor.beforeGameUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new GameValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for Game: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.Game.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.Game.findOne({_id: id});
        GameHook.trigger('onGameUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = GameService;


