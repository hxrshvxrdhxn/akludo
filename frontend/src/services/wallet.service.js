import ApiCoreService from "./api.core.service";
import UserService from "./user.service";


export default class WalletService extends ApiCoreService {

  
    static async updateBalanceOrLedger(id,bal,ledger,action){
        try {
            return await this.graphCall('mutationWithAuth.update.updateWallet',`
            mutation{
              mutationWithAuth(token:"auto"){
                update{
                   updateWallet(id:"${id}",bal:${bal},ledger:${ledger?ledger:'[]'}){
                    id
                    bal
                    user{
                      id
                      name
                      phones{
                        number
                      }
                    }
                    ledger{
                      id
                    }
                  }
                }
              }
            }`,{});
        }catch(c){
            console.log(c);
            throw new Error('Unable to update');
        }
    }

    static async createWallet(wallet){
      console.log(wallet);
    //   
  }

    static async getWallet(){  
      try{
        let user=await UserService.getUser();
        return await this.graphCall('withAuth.listWallet',`
        {
          withAuth(token:"auto"){
            listWallet(criteria:"{\\"user\\":\\"${user.id}\\"}"){
               id
              user{
                 id
                name
              }
              bal
              ledger{
                id
                amount
                txType
              }
            }
          }
        }`,{});
      }catch(c){
        console.log(c);
        throw new Error('Unable to fetch wallet');
      }
    }

}