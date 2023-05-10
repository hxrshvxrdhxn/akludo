/**
 * Interceptor for data manipulation for entity Referral
 * */

class ReferralInterceptor {

    static async beforeReferralCreate(refReferralDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeReferralUpdate(refReferralUpdateDto, refReferralOrigObj, user) {
        // feel free to change the Dto for manipulation before update
        refReferralUpdateDto._payload.referred=[...refReferralUpdateDto._payload.referred,...refReferralOrigObj.referred];  
        return refReferralUpdateDto;
    }

    static async beforeReferralDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterReferralFind(id, foundReferral, user) {
        // manipulate and return the object you want to return back in API.
        return foundReferral;
    }

    static async afterReferralList(criteria, foundReferralItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundReferralItems;
    }

    static async beforeReferralList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = ReferralInterceptor;
