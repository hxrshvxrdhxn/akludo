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
  
  static async createOrder(customerDetails, transaction) {
    // authenticating the customer details
    console.log(customerDetails, transaction);
    //to creating a env file for saving secret key and urls
    //calculate order expriy time and add 10 mins to cuuren t=time
    var curr = new Date(),
    orderExpiryTime = new Date(curr);
    orderExpiryTime.setMinutes(curr.getMinutes() + 20);
    console.log(orderExpiryTime);
    return new Promise((resolve, reject) => {
      sdk
        .createOrder(
          {
            customer_details: {
              customer_id: customerDetails?._id || "",
              customer_email: customerDetails?.emails[0]?.address || "",
              customer_phone: customerDetails?.phones[0]?.number || "",
            },
            order_meta: {
              return_url: "http://localhost:3001/deposit?order_id={order_id}",
              notify_url:
                "https://6f83-122-177-104-216.ngrok-free.app/api/webhook/cashfree", //todo create a webhook api
            },
            order_amount: parseFloat(transaction.amount) || 1.0,
            order_currency: "INR",
            order_tags: {
              transaction_id: transaction._id || "",
            },
            order_expiry_time: orderExpiryTime.toISOString(),
          },
          {
            "x-api-version": "2022-09-01",
            "x-client-id": "TEST388524b8c5ad932008ed997dc3425883",
            "x-client-secret": "TESTb4fc5eb213f445d76c3e3ce9e305c6582ece88be",
          }
        )
        .then(async ({ data }) => {
          //console.log(data)
          console.log(
            "updating bank transaction for metaa--------",
            await _db.BankTransaction.updateOne(
              { _id: transaction._id || "" },
              {
                $set: {
                  meta: JSON.stringify({
                    sessionId: data.payment_session_id,
                    orderId: data.order_id,
                  }),
                },
              }
            )
          );
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  static async findOrder(orderId) {
    return new Promise((resolve, reject) => {
      sdk.server("https://sandbox.cashfree.com/pg");
      sdk
        .getOrder({
          order_id: orderId,
          "x-api-version": "2022-09-01",
          "x-client-id": "TEST388524b8c5ad932008ed997dc3425883",
          "x-client-secret": "TESTb4fc5eb213f445d76c3e3ce9e305c6582ece88be",
        })
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  static async list() {}

}

exports = module.exports = OrderService;
