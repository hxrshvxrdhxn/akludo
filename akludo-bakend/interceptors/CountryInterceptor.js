/**
 * Interceptor for data manipulation for entity Country
 * */

class CountryInterceptor {

    static async beforeCountryCreate(refCountryDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeCountryUpdate(refCountryUpdateDto, refCountryOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeCountryDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterCountryFind(id, foundCountry, user) {
        // manipulate and return the object you want to return back in API.
        return foundCountry;
    }

    static async afterCountryList(criteria, foundCountryItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundCountryItems;
    }

    static async beforeCountryList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = CountryInterceptor;
