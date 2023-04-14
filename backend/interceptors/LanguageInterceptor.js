/**
 * Interceptor for data manipulation for entity Language
 * */

class LanguageInterceptor {

    static async beforeLanguageCreate(refLanguageDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeLanguageUpdate(refLanguageUpdateDto, refLanguageOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeLanguageDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterLanguageFind(id, foundLanguage, user) {
        // manipulate and return the object you want to return back in API.
        return foundLanguage;
    }

    static async afterLanguageList(criteria, foundLanguageItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundLanguageItems;
    }

    static async beforeLanguageList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = LanguageInterceptor;
