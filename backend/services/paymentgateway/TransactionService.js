const BankTransactionDTO = require("../../util/beans/BankTransactionDTO");
const WalletDTO = require("../../util/beans/WalletDTO");
const BankTransactionService = require("../BankTransactionService");
const WalletService = require("../WalletService");

class TransactionService {

    static user
    static async getCurrentUser(userId){
        this.user = await _db.User.findOne({_id:userId});
    }

    static async updateTransactionStatusAndGateway(id,gatewayMethod,status,userId) {
        this.getCurrentUser(userId);
        const dtoObj={status:status,gatewayMethod:gatewayMethod}
        const dto = new BankTransactionDTO(dtoObj);
        console.log(dto);
        const result = await BankTransactionService.update(id,dto,this.user);
        return result;
    }

    static async incrementWalletAmount(userId,amount){
        this.getCurrentUser(userId);
        let wallet= await WalletService.findOne(user.wallet.id);
        console.log("this is wallet",wallet);
        const money=parseInt(wallet.amount)+parseInt(amount);
        const dtoObj={amount:money}
        const dto = new WalletDTO(dtoObj);
        console.log(dto);
        const result = await WalletService.update(wallet.id,dto,this.user);
        return result;
    }
}

exports = module.exports = TransactionService;