/**
 * Interceptor for data manipulation for entity UpdateHistory
 * */

class UpdateHistoryInterceptor {

    static async beforeUpdateHistoryCreate(refUpdateHistoryDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeUpdateHistoryUpdate(refUpdateHistoryUpdateDto, refUpdateHistoryOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeUpdateHistoryDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterUpdateHistoryFind(id, foundUpdateHistory, user) {
        // manipulate and return the object you want to return back in API.
        return foundUpdateHistory;
    }

    static async afterUpdateHistoryList(criteria, foundUpdateHistoryItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundUpdateHistoryItems;
    }

    static async beforeUpdateHistoryList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = UpdateHistoryInterceptor;
