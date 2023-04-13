/**
 * Interceptor for data manipulation for entity Game
 * */

class GameInterceptor {

    static async beforeGameCreate(refGameDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeGameUpdate(refGameUpdateDto, refGameOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeGameDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterGameFind(id, foundGame, user) {
        // manipulate and return the object you want to return back in API.
        return foundGame;
    }

    static async afterGameList(criteria, foundGameItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundGameItems;
    }

    static async beforeGameList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = GameInterceptor;
