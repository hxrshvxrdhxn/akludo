/**
 * Interceptor for data manipulation for entity WithdrawalRequest
 * */

class WithdrawalRequestInterceptor {

    static async beforeWithdrawalRequestCreate(refWithdrawalRequestDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeWithdrawalRequestUpdate(refWithdrawalRequestUpdateDto, refWithdrawalRequestOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeWithdrawalRequestDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterWithdrawalRequestFind(id, foundWithdrawalRequest, user) {
        // manipulate and return the object you want to return back in API.
        return foundWithdrawalRequest;
    }

    static async afterWithdrawalRequestList(criteria, foundWithdrawalRequestItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundWithdrawalRequestItems;
    }

    static async beforeWithdrawalRequestList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = WithdrawalRequestInterceptor;
