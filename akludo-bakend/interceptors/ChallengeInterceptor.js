/**
 * Interceptor for data manipulation for entity Challenge
 * */

class ChallengeInterceptor {

    static async beforeChallengeCreate(refChallengeDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeChallengeUpdate(refChallengeUpdateDto, refChallengeOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeChallengeDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterChallengeFind(id, foundChallenge, user) {
        // manipulate and return the object you want to return back in API.
        return foundChallenge;
    }

    static async afterChallengeList(criteria, foundChallengeItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundChallengeItems;
    }

    static async beforeChallengeList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = ChallengeInterceptor;
