/**
 * Interceptor for data manipulation for entity User
 * */

class UserInterceptor {

    static async beforeUserCreate(refUserDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeUserUpdate(refUserUpdateDto, refUserOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeUserDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterUserFind(id, foundUser, user) {
        // manipulate and return the object you want to return back in API.
        return foundUser;
    }

    static async afterUserList(criteria, foundUserItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundUserItems;
    }

    static async beforeUserList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = UserInterceptor;
