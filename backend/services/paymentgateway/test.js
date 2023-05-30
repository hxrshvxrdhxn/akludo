const UserService = require("../UserService");
const OrderService = require("./OrderService");


async function  test(){
   //return  await OrderService.findOrder('order_3885242QKojGG62mYlBjW0QGjSYu3ykeL')
   return await UserService.findOne("me");
}

console.log(test());

 // if(saveResp._id){
        //     const ledgerEntry = new _db.Ledger({
        //             linkedBankTransaction: saveResp._id,
        //             fromUser: saveResp.createdBy,
        //             amount: saveResp.amount,
        //             txType: EnumTransactionType.HOLD        
        //         });
        //     const ledSaveResp= await ledgerEntry.save();        //creating ledger here and calling it here to update
        //     LedgerHook.trigger('onLedgerCreate',ledSaveResp);    //wallet otherwise i will have to call this hook inside another hook...
        // }