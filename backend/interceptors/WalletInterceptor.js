/**
 * Interceptor for data manipulation for entity Wallet
 * */

class WalletInterceptor {

    static async beforeWalletCreate(refWalletDto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async beforeWalletUpdate(refWalletUpdateDto, refWalletOrigObj, user) {
        // feel free to change the Dto for manipulation before update
        console.log(refWalletUpdateDto,refWalletOrigObj);
        
        if(refWalletUpdateDto._payload.ledger && !!refWalletUpdateDto?._payload.ledger.length){
            //console.log(refWalletOrigObj.ledger)

            refWalletUpdateDto._payload.ledger=[...refWalletOrigObj.ledger,...refWalletUpdateDto._payload.ledger];
            refWalletUpdateDto._payload.ledger=refWalletUpdateDto._payload.ledger.map((item)=>{
                return item.toString();
            })
            refWalletUpdateDto._payload.ledger=[...new Set(refWalletUpdateDto._payload.ledger)]          
        }

        //console.log("this is dto-",refWalletUpdateDto);
        //return refWalletUpdateDto;

    }

    static async beforeWalletDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterWalletFind(id, foundWallet, user) {
        // manipulate and return the object you want to return back in API.
        return foundWallet;
    }

    static async afterWalletList(criteria, foundWalletItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundWalletItems;
    }

    static async beforeWalletList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = WalletInterceptor;
