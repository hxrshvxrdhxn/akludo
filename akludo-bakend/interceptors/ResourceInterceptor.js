/**
 * Interceptor for data manipulation for entity Resource
 * */

class ResourceInterceptor {

    static async beforeResourceCreate(refResourceDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeResourceUpdate(refResourceUpdateDto, refResourceOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeResourceDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterResourceFind(id, foundResource, user) {
        // manipulate and return the object you want to return back in API.
        return foundResource;
    }

    static async afterResourceList(criteria, foundResourceItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundResourceItems;
    }

    static async beforeResourceList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = ResourceInterceptor;
