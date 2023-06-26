const LedgerService = require('../services/LedgerService');
const UserService = require('../services/UserService');
const WithdrawalRequestService = require('../services/WithdrawalRequestService');
const OrderService = require('../services/paymentgateway/OrderService');
const LedgerDTO = require('../util/beans/LedgerDTO');
const WithdrawalRequestDTO = require('../util/beans/WithdrawalRequestDTO');
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
        //jab transaction create hoti tab hum ledger create krte hai aur uss ledger ko wallet m store krte  hai corresponding 
        //sort the  data
        let status='PENDING';
        //create a dto for ledger and then service to call ledger create for
        let user = await _db.User.findOne({_id:newObj.createdBy});
        console.log("this is user",user); 
        let objDto={fromUser:newObj.createdBy,amount:newObj.amount,txType:newObj.txType,linkedBankTransaction:newObj._id}
        const dto = new LedgerDTO(objDto);
        let ledger = await LedgerService.create(dto, user);
        console.log("this is ledger",ledger);
        
        try{
           
            // to check if transaction type is top up then create a order 
            if(newObj.txType==='TOP_UP'){
                let orderData= await OrderService.createOrder(user,newObj) 
                console.log("payment session Id -----------------",orderData.payment_session_id);
            }
            //if transaction type is withdrawal then check for if then amount can be withdrawn and the debit it using cashfree refund
            if(newObj.txType==='WITHDRAW'){
                // recheck if the amount is less than earning in wallet and is greater then 95 and less than a specific limit suppose 10000
                console.log("this is withdraw:-",user?.wallet,newObj.amount);

                //after this check if the kyc is done for the user or not-----
                console.log("this is kyc appproved",user?.kyc)


                //after this create a withdrawal request------
                const obj={
                    user:user._id, status:'INTIATED', amount:newObj.amount , ledger:ledger._id, bankTransaction:newObj._id
                };
                const dto=new WithdrawalRequestDTO(obj);
                const wr = await WithdrawalRequestService.create(dto, user);
                console.log(wr);

            }
            //if transcation type is hold then it means its in state either it will be credited or debited after game
            
            //if transaction is transfer then transfer game win lose or referal money etc,.....

           
        }catch(c){
            console.log(c);
            status='FAILED';
            //_db.BankTransaction.update({_id: id}, {$set: {status:status}});
            throw new Error('unable to create order');
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
