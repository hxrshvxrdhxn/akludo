import ApiCoreService from "./api.core.service";
import UserService from "./user.service";


export default class ReferralService extends ApiCoreService {

  
    // static async update(id,bal,ledger,action){
    //     try {
    //         return await this.graphCall('mutationWithAuth.update.updateWallet',`
    //         mutation{
    //           mutationWithAuth(token:"auto"){
    //             update{
    //                updateWallet(id:"${id}",bal:${bal},ledger:${ledger?ledger:'[]'}){
    //                 id
    //                 bal
    //                 user{
    //                   id
    //                   name
    //                   phones{
    //                     number
    //                   }
    //                 }
    //                 ledger{
    //                   id
    //                 }
    //               }
    //             }
    //           }
    //         }`,{});
    //     }catch(c){
    //         console.log(c);
    //         throw new Error('Unable to update');
    //     }
    // }

//     static async createWallet(wallet){
//       console.log(wallet);
//     //   
//   }

    static async getReferral(){  
      try{
        let user=await UserService.getUser();
        console.log(user);
        return await this.graphCall('withAuth.getReferral',`
        {
            withAuth(token:"auto"){
              getReferral(id:"${user.referral}"){
                id
                referrer{
                  id
                }
                earning
                count
              }
            }
          }`,{});
      }catch(c){
        console.log(c);
        throw new Error('Unable to fetch Referral');
      }
    }

}