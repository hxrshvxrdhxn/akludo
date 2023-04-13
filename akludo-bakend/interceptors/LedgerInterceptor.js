/**
 * Interceptor for data manipulation for entity Ledger
 * */

class LedgerInterceptor {

    static async beforeLedgerCreate(refLedgerDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeLedgerUpdate(refLedgerUpdateDto, refLedgerOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeLedgerDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterLedgerFind(id, foundLedger, user) {
        // manipulate and return the object you want to return back in API.
        return foundLedger;
    }

    static async afterLedgerList(criteria, foundLedgerItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundLedgerItems;
    }

    static async beforeLedgerList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = LedgerInterceptor;
