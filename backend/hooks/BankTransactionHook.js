const UserService = require('../services/UserService');
const OrderService = require('../services/paymentgateway/OrderService');
const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity BankTransaction
 * */

class BankTransactionHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    async onBankTransactionCreate(newObj) {
        // called when BankTransaction is created.
        //sort the  data
        let status='PENDING';
        // now call the cashfree order api 
        if(newObj.txType=='TOP_UP'){
            try{

                let user = await _db.User.findOne({_id:newObj.createdBy});
                let orderData= await OrderService.createOrder(user,newObj) 
                console.log("payment session Id====-----------------",orderData.payment_session_id);
               
            }catch(c){
                console.log(c);
                status='FAILED';
                //_db.BankTransaction.update({_id: id}, {$set: {status:status}});
                throw new Error('unable to create order');
            } 
        }
       
    }

    onBankTransactionUpdate({oldObj, newObj}) {
        // called when BankTransaction is updated.
    }

    onBankTransactionDelete(id) {
        // called when BankTransaction is deleted.
    }

}

exports = module.exports = BankTransactionHook;
