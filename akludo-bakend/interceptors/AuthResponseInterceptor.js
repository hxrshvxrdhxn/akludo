/**
 * Interceptor for data manipulation for entity AuthResponse
 * */

class AuthResponseInterceptor {

    static async beforeAuthResponseCreate(refAuthResponseDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeAuthResponseUpdate(refAuthResponseUpdateDto, refAuthResponseOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeAuthResponseDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterAuthResponseFind(id, foundAuthResponse, user) {
        // manipulate and return the object you want to return back in API.
        return foundAuthResponse;
    }

    static async afterAuthResponseList(criteria, foundAuthResponseItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundAuthResponseItems;
    }

    static async beforeAuthResponseList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = AuthResponseInterceptor;
