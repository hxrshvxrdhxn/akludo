/**
 * Interceptor for data manipulation for entity KYC
 * */

class KYCInterceptor {

    static async beforeKYCCreate(refKYCDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeKYCUpdate(refKYCUpdateDto, refKYCOrigObj, user) {
        // feel free to change the Dto for manipulation before update
        console.log("updating kyc for user")
    }

    static async beforeKYCDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterKYCFind(id, foundKYC, user) {
        // manipulate and return the object you want to return back in API.
        return foundKYC;
    }

    static async afterKYCList(criteria, foundKYCItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundKYCItems;
    }

    static async beforeKYCList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = KYCInterceptor;
