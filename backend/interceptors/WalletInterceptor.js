/**
 * Interceptor for data manipulation for entity Wallet
 * */

class WalletInterceptor {

    static async beforeWalletCreate(refWalletDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeWalletUpdate(refWalletUpdateDto, refWalletOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeWalletDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterWalletFind(id, foundWallet, user) {
        // manipulate and return the object you want to return back in API.
        return foundWallet;
    }

    static async afterWalletList(criteria, foundWalletItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundWalletItems;
    }

    static async beforeWalletList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = WalletInterceptor;
