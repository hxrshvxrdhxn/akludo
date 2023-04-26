const CONSTANTS = require('../util/Constants');
const KYCDTO = require('../util/beans/KYCDTO');
const KYCValidator = require('../validations/KYCValidation');
const KYCHook = require('../hooks/KYCHook');
const KYCInterceptor = require('../interceptors/KYCInterceptor');
const RBACPermissionService = require('./RBACPermissionService');

//TO DO CRETE INTERFACE AND DTO 
/**
 * This service provide logical operations over kyc model
 * */

class KYCService {

    static async findOne(id,user=null){
        console.log("id",id);
        if (!(await RBACPermissionService.check(id, 'fetch.kyc', user, _db.KYC, null, null))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) return null;
        const _id = id;
        id = _db.KYC.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to fetch KYC. ' + _id);

        // fetch
        const foundkyc = await _db.KYC.findOne({_id: id});
        console.log(foundkyc);
        return await KYCInterceptor.afterKYCFind(id, foundkyc, user);
    }
    
    static async update(id, dto, user = null) {
        if (!(await RBACPermissionService.check(id, 'update.KYC', user, _db.KYC, null, dto))) throw new Error('You do not have permission to do this operation');
        // validate
        if (!id) throw new Error('Please provide an Id to update.');
        const _id = id;
        id = _db.KYC.convertToObjectId(id);
        if (!id) throw new Error('Invalid ID passed to update KYC. ' + _id);

        // Fetch original object
        const origDbObj = await _db.KYC.findOne({_id: id});
        if (!origDbObj) throw new Error('No object with provided id: ' + id);

        // validate DTO
        if (!(dto instanceof KYCDTO)) throw new Error('Please provide a KYC DTO to update the KYC.');

        // enrich
        dto.createTrack(user && user._id || user.id || null);
        await KYCInterceptor.beforeKYCUpdate(dto, origDbObj, user);

        // Check data
        const obj = dto.toObject();
        const validationResult = new KYCValidator(obj, origDbObj, false).validate();
        if (!validationResult.isValid) {
            throw new Error('Validation Failure for KYC: ' + validationResult.errorString);
        }

        // update
        const updateResult = await _db.KYC.update({_id: id}, {$set: obj});

        // fetch latest
        const updatedDbObj = await _db.KYC.findOne({_id: id});
        KYCHook.trigger('onKYCUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

        return {updateResult, updatedDbObj};

    }

    //TO DO CHECK ALL OPERATIONS AD ADD MORE OPERATIONS


}

exports = module.exports = KYCService;


