/**
 * Interceptor for data manipulation for entity BankTransaction
 * */

class BankTransactionInterceptor {

    static async beforeBankTransactionCreate(refBankTransactionDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeBankTransactionUpdate(refBankTransactionUpdateDto, refBankTransactionOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeBankTransactionDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterBankTransactionFind(id, foundBankTransaction, user) {
        // manipulate and return the object you want to return back in API.
        return foundBankTransaction;
    }

    static async afterBankTransactionList(criteria, foundBankTransactionItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundBankTransactionItems;
    }

    static async beforeBankTransactionList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = BankTransactionInterceptor;
