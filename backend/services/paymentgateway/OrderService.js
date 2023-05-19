// const CONSTANTS = require('../util/Constants');
// const AuthResponseDTO = require('../util/beans/AuthResponseDTO');
// const AuthResponseValidator = require('../validations/AuthResponseValidator');
// const AuthResponseHook = require('../hooks/AuthResponseHook');
// const AuthResponseInterceptor = require('../interceptors/AuthResponseInterceptor');
// const RBACPermissionService = require('./RBACPermissionService');
const sdk = require("api")("@cashfreedocs-new/v3#3pbsh2zlhrk1eey");

/**
 * This service provide logical operations over
 * */

class OrderService {
  static async createOrder(customerDetails, orderMeta) {
    // to create a order we must authenticate the customer details and create a webhook url

    sdk
      .createOrder(
        {
          customer_details: {
          customer_id: "7112AAA812234",
          customer_email: "johny@cashfree.com",
          customer_phone: "9908734801"
          },
          order_meta: {
          notify_url: "https://webhook.site/0578a7fd-a0c0-4d47-956c-d02a061e36d3"
          },
          order_amount: 1.00,
          order_currency: "INR"
        },
        {
          "x-api-version": "2022-09-01",
          "x-client-id": "TEST388524b8c5ad932008ed997dc3425883",
          "x-client-secret": "TESTb4fc5eb213f445d76c3e3ce9e305c6582ece88be",
        }
      )
      .then(({ data }) => console.log(data))
      .catch((err) => console.error(err));
  }

  static async findOne() {}

  static async list() {}

  static async update() {}
  // static async findOne(id, user = null) {
  //     if (!(await RBACPermissionService.check(id, 'fetch.AuthResponse', user, _db.AuthResponse, null, null))) throw new Error('You do not have permission to do this operation');
  //     // validate
  //     if (!id) return null;
  //     const _id = id;
  //     id = _db.AuthResponse.convertToObjectId(id);
  //     if (!id) throw new Error('Invalid ID passed to fetch AuthResponse. ' + _id);

  //     // fetch
  //     const foundAuthResponse = await _db.AuthResponse.findOne({_id: id});
  //     return await AuthResponseInterceptor.afterAuthResponseFind(id, foundAuthResponse, user);
  // }

  // static async remove(id, user = null) {
  //     if (!(await RBACPermissionService.check(id, 'remove.AuthResponse', user, _db.AuthResponse, null, null))) throw new Error('You do not have permission to do this operation');
  //     // validate
  //     if (!id) throw new Error('Please provide an Id to delete.');
  //     const _id = id;
  //     id = _db.AuthResponse.convertToObjectId(id);
  //     if (!id) throw new Error('Invalid ID passed to delete AuthResponse. ' + _id);

  //     // remove
  //     await AuthResponseInterceptor.beforeAuthResponseDelete(id, user);
  //     AuthResponseHook.trigger('onAuthResponseDelete', id);
  //     return await _db.AuthResponse.findOneAndRemove({_id: id});
  // }

  // static async list(criteria = {}, limit = 10, offset = 0, user = null) {
  //     if (!(await RBACPermissionService.check(null, 'list.AuthResponse', user, _db.AuthResponse, criteria, null))) throw new Error('You do not have permission to do this operation');
  //     // Set max limit
  //     if (limit && limit > CONSTANTS.MAX_LIMIT) limit = CONSTANTS.MAX_LIMIT;

  //     // injection safety
  //     criteria = JSON.parse(JSON.stringify(criteria));

  //     // intercept query
  //     await AuthResponseInterceptor.beforeAuthResponseList(criteria, limit, offset, user);

  //     // Fetch Total
  //     const total = await _db.AuthResponse.count(criteria);

  //     // Fetch
  //     const docs = total ? (await _db.AuthResponse.find(criteria).skip(offset).limit(limit)) : [];
  //     return {
  //         docs: (await AuthResponseInterceptor.afterAuthResponseList(criteria, docs, limit, offset, total, user)),
  //         total,
  //         limit,
  //         offset
  //     };
  // }

  // static async count(criteria = {}, user = null) {
  //     if (!(await RBACPermissionService.check(null, 'count.AuthResponse', user, _db.AuthResponse, criteria, null))) throw new Error('You do not have permission to do this operation');
  //     criteria = JSON.parse(JSON.stringify(criteria)); // injection safety
  //     return await _db.AuthResponse.count(criteria);
  // }

  // static async create(dto, user = null) {
  //     if (!(await RBACPermissionService.check(null, 'create.AuthResponse', user, _db.AuthResponse, null, dto))) throw new Error('You do not have permission to do this operation');
  //     if (!(dto instanceof AuthResponseDTO)) throw new Error('Please provide a AuthResponseDTO to create the AuthResponse.');

  //     // enrich
  //     dto.createTrack(user && user._id || user.id || null);
  //     await AuthResponseInterceptor.beforeAuthResponseCreate(dto, user);

  //     // check data
  //     const obj = dto.toObject();
  //     const validationResult = new AuthResponseValidator(obj, true).validate();
  //     if (!validationResult.isValid) {
  //         throw new Error('Validation Failure for AuthResponse: ' + validationResult.errorString);
  //     }

  //     // save
  //     const dbObj = new _db.AuthResponse(obj);
  //     const saveResp = await dbObj.save();
  //     AuthResponseHook.trigger('onAuthResponseCreate', saveResp);
  //     return saveResp;
  // }

  // static async update(id, dto, user = null) {
  //     if (!(await RBACPermissionService.check(id, 'update.AuthResponse', user, _db.AuthResponse, null, dto))) throw new Error('You do not have permission to do this operation');
  //     // validate
  //     if (!id) throw new Error('Please provide an Id to update.');
  //     const _id = id;
  //     id = _db.AuthResponse.convertToObjectId(id);
  //     if (!id) throw new Error('Invalid ID passed to update AuthResponse. ' + _id);

  //     // Fetch original object
  //     const origDbObj = await _db.AuthResponse.findOne({_id: id});
  //     if (!origDbObj) throw new Error('No object with provided id: ' + id);

  //     // validate DTO
  //     if (!(dto instanceof AuthResponseDTO)) throw new Error('Please provide a AuthResponseDTO to update the AuthResponse.');

  //     // enrich
  //     dto.createTrack(user && user._id || user.id || null);
  //     await AuthResponseInterceptor.beforeAuthResponseUpdate(dto, origDbObj, user);

  //     // Check data
  //     const obj = dto.toObject();
  //     const validationResult = new AuthResponseValidator(obj, origDbObj, false).validate();
  //     if (!validationResult.isValid) {
  //         throw new Error('Validation Failure for AuthResponse: ' + validationResult.errorString);
  //     }

  //     // update
  //     const updateResult = await _db.AuthResponse.update({_id: id}, {$set: obj});

  //     // fetch latest
  //     const updatedDbObj = await _db.AuthResponse.findOne({_id: id});
  //     AuthResponseHook.trigger('onAuthResponseUpdate', {oldObj: origDbObj, newObj: updatedDbObj});

  //     return {updateResult, updatedDbObj};

  // }
}

exports = module.exports = OrderService;
