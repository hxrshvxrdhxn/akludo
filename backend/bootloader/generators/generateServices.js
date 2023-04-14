const {join} = require('path');
const fs = require('fs');
const selected = process.argv.slice(2);
exports = module.exports = function (specs) {


    [...(specs.docs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        const path = join(__dirname, '../../services', e.name + 'Service.js');
        console.log(path);
        let content = `
const CONSTANTS = require('../util/Constants');
const ${e.name}DTO = require('../util/beans/${e.name}DTO');
const ${e.name}Validator = require('../validations/${e.name}Validator');
const ${e.name}Hook = require('../hooks/${e.name}Hook');
const ${e.name}Interceptor = require('../interceptors/${e.name}Interceptor');
const RBACPermissionService = require('./RBACPermissionService');


/**
 * This service provide logical operations over ${e.name} Model
 * */

class ${e.name}Service {

    static async findOne(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'fetch.${e.name}', user, _db.${e.name}, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.${e.name}.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch ${e.name}. ' + _id);

        // fetch
        const found${e.name} = await _db.${e.name}.findOne({_id: id});
        return await ${e.name}Interceptor.after${e.name}Find(id, found${e.name}, user);
    }

    static async remove(id, user = null) {
        if (!(await RBACPermissionService.check(id, 'remove.${e.name}', user, _db.${e.name}, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to delete.');
        const _id = id;
        id = _db.${e.name}.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to delete ${e.name}. ' + _id);

        // remove
        await ${e.name}Interceptor.before${e.name}Delete(id, user);
        ${e.name}Hook.trigger('on${e.name}Delete', id);
        return await _db.${e.name}.findOneAndRemove({_id: id});
    }

    static async list(criteria = {}, limit = 10, offset = 0, user = null) {
        if (!(await RBACPermissionService.check(null, 'list.${e.name}', user, _db.${e.name}, criteria, null))) throw new Error('You do not have permission to do this operation');
        // Set max limit
        if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

        // injection safety
        criteria = JSON.parse(JSON.stringify(criteria));
        
        // intercept query
        await ${e.name}Interceptor.before${e.name}List(criteria, limit, offset, user);

        // Fetch Total
        const total = await _db.${e.name}.count(criteria);

        // Fetch
        const docs = total ? (await _db.${e.name}.find(criteria).skip(offset).limit(limit)) : [];
        return {docs: (await ${e.name}Interceptor.after${e.name}List(criteria, docs, limit, offset, total, user)), total, limit, offset};
    }

    static async count(criteria = {}, user = null) {
        if (!(await RBACPermissionService.check(null, 'count.${e.name}', user, _db.${e.name}, criteria, null))) throw new Error('You do not have permission to do this operation');
        criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
        return await _db.${e.name}.count(criteria);
    }

    static async create(dto, user = null) {
        if (!(await RBACPermissionService.check(null, 'create.${e.name}', user, _db.${e.name}, null, dto))) throw new Error('You do not have permission to do this operation');
        if (!(dto instanceof ${e.name}DTO)) throw new Error('Please provide a ${e.name}DTO to create the ${e.name}.');
        
        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await ${e.name}Interceptor.before${e.name}Create(dto, user);
        
        // check data
        const obj = dto.toObject();
        const validationResult = new ${e.name}Validator(obj, true).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for ${e.name}: ' + validationResult.errorString);
        }
        
        // save
        const dbObj = new _db.${e.name}(obj);
        const saveResp = await dbObj.save();
        ${e.name}Hook.trigger('on${e.name}Create', saveResp);
        return saveResp;
    }

    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.${e.name}', user, _db.${e.name}, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.${e.name}.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update ${e.name}. ' + _id);

        // Fetch original object
        const origDbObj = await _db.${e.name}.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof ${e.name}DTO)) throw new Error('Please provide a ${e.name}DTO to update the ${e.name}.');
        
        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await ${e.name}Interceptor.before${e.name}Update(dto, origDbObj, user);
        
        // Check data
        const obj = dto.toObject();
        const validationResult = new ${e.name}Validator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for ${e.name}: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.${e.name}.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.${e.name}.findOne({_id: id});
        ${e.name}Hook.trigger('on${e.name}Update', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

}

exports = module.exports = ${e.name}Service;


`;

        fs.writeFileSync(path, content);

    });


};
