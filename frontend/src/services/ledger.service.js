import ApiCoreService from "./api.core.service";


export default class LedgerService extends ApiCoreService {

  
    static async createLedger(ledger,transactionId){
        console.log(ledger);
        try {
            return await this.graphCall('mutationWithAuth.fabricate.createLedger', `
            mutation{
                mutationWithAuth(token:"auto"){
                  fabricate{
                    createLedger(amount:${ledger.amount},fromUser:"${ledger.fromUser}",toUser:"${ledger.toUser}",txType:${ledger.txType},linkedBankTransaction:"${transactionId}"){
                      id
                      fromUser{
                        id
                        name
                        phones{
                          number
                        }          
                      }
                      toUser{
                        id
                        name
                        phones{
                          number
                        }
                      }
                      amount
                    }
                  }
                }
            }`,{});
        }catch(c){
            console.log(c);
            throw new Error('Unable to create');
        }
    }

}