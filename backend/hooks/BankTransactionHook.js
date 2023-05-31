const LedgerService = require('../services/LedgerService');
const UserService = require('../services/UserService');
const OrderService = require('../services/paymentgateway/OrderService');
const LedgerDTO = require('../util/beans/LedgerDTO');
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
       // jab transaction create hoti tab hum ledger create krte hai aur uss ledger ko wallet m store krte  hai corresponding 
        //sort the  data
        let status='PENDING';
        // now call the cashfree order api 
        if(newObj.txType=='TOP_UP'){
            try{

                
                let user = await _db.User.findOne({_id:newObj.createdBy});
                // to check if transaction type is top up then create a order 
                if(newObj.txType==='TOP_UP'){
                    let orderData= await OrderService.createOrder(user,newObj) 
                    console.log("payment session Id -----------------",orderData.payment_session_id);
                }
                //if transaction type is withdrawal then check for if then amount can be withrawn and the debit it using cashfree refund

                //if transcation type is hold then it means its in state either it will be credited or debited after game
                
                //if transaction is transfer then transfer game win lose or referal money etc,.....

                //create a dto for ledger and then service to call ledger create for 
                let objDto={fromUser:newObj.createdBy,amount:newObj.amount,txType:newObj.txType,linkedBankTransaction:newObj._id}
                const dto = new LedgerDTO(objDto);
                const doc = await LedgerService.create(dto, user);
                console.log(doc);
               
            }catch(c){
                console.log(c);
                status='FAILED';
                //_db.BankTransaction.update({_id: id}, {$set: {status:status}});
                throw new Error('unable to create order');
            } 
        }
       
    }

    async onBankTransactionUpdate({oldObj, newObj}) {
       // called when BankTransaction is updated.
    //    if(oldObj.status==='PENDING'&&newObj.status==='SUCCESS'){
    //         console.log("status has changed.........updating wallet amount..........");
    //        console.log("updating wallet",await _db.Wallet.updateOne({user:newObj.createdBy},{$inc:{bal:newObj.amount}}));
    //    }
       // if a bank transaction is  updated in regards of status then update the wallet amount as well
    }

    onBankTransactionDelete(id) {
        // called when BankTransaction is deleted.

    }

}

exports = module.exports = BankTransactionHook;
