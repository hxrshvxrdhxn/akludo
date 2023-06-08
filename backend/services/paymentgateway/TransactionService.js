const BankTransactionDTO = require("../../util/beans/BankTransactionDTO");
const WalletDTO = require("../../util/beans/WalletDTO");
const BankTransactionService = require("../BankTransactionService");
const UserService = require("../UserService");
const WalletService = require("../WalletService");

class TransactionService {

    static user

    static async getCurrentUser(userId) {
        this.user = await _db.User.findOne({_id: userId});
        console.log("this is a user:-", this.user)
    }

    static async updateTransactionStatusAndGateway(id, gatewayMethod, status, userId) {
        await this.getCurrentUser(userId);
        const dtoObj = {status: status, gatewayMethod: gatewayMethod}
        const dto = new BankTransactionDTO(dtoObj);
        const result = await BankTransactionService.update(id, dto, this.user);
        return result;
    }

    static async incrementWalletAmount(userId, amount) {
        await this.getCurrentUser(userId);
        let wallet = await WalletService.findOne(this.user.wallet, this.user);
        console.log("this is wallet", wallet);
        const money = (parseInt(wallet.bal) || 0) + parseInt(amount);
        const dtoObj = {bal: money}
        const dto = new WalletDTO(dtoObj);
        console.log(dto);
        const result = await WalletService.update(wallet._id, dto, this.user);
        return result;
    }
}

exports = module.exports = TransactionService;
