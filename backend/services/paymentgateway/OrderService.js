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
  static async createOrder(customerDetails,transaction) {
    // authenticating the customer details 
    console.log(customerDetails);
    //to creating a env file for saving secret key and urls
    //calculate order expriy time and add 10 mins to cuuren t=time
    var curr = new Date (),
    orderExpiryTime = new Date (curr );
    orderExpiryTime.setMinutes (curr.getMinutes() + 20);
    console.log(orderExpiryTime);
    return new Promise((resolve,reject)=>{
      sdk
      .createOrder(
        {
          customer_details: {
          customer_id: customerDetails?._id||"",
          customer_email: customerDetails?.emails[0]?.address||"",
          customer_phone: customerDetails?.phones[0]?.number||""
          },
          order_meta: {
            return_url: "https://2a84-125-63-123-166.ngrok-free.app/deposit?order_id={order_id}",
            notify_url: "https://2a84-125-63-123-166.ngrok-free.app/api/webhook/cashfree"         //todo create a webhook api
          },
          order_amount: parseFloat(transaction.amount)||1.00,
          order_currency: "INR",
          order_tags:{
            transaction_id:transaction._id||""
          },
          order_expiry_time: orderExpiryTime.toISOString()
        },
        {
          "x-api-version": "2022-09-01",
          "x-client-id": "TEST388524b8c5ad932008ed997dc3425883",
          "x-client-secret": "TESTb4fc5eb213f445d76c3e3ce9e305c6582ece88be",
        }
      ).then(async({ data }) =>{ 
        //console.log(data)
        console.log("updating bank transaction for metaa-===",await _db.BankTransaction.updateOne({_id:(transaction._id||'')},{$set:{meta:JSON.stringify({sessionId:data.payment_session_id,orderId:data.order_id})}}));
        resolve(data);
       })
      .catch((err) =>{ console.error(err); reject(err)});
   })  
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
