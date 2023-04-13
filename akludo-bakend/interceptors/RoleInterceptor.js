/**
 * Interceptor for data manipulation for entity Role
 * */

class RoleInterceptor {

    static async beforeRoleCreate(refRoleDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeRoleUpdate(refRoleUpdateDto, refRoleOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeRoleDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterRoleFind(id, foundRole, user) {
        // manipulate and return the object you want to return back in API.
        return foundRole;
    }

    static async afterRoleList(criteria, foundRoleItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundRoleItems;
    }

    static async beforeRoleList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = RoleInterceptor;
