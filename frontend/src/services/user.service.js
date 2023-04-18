import ApiCoreService from "./api.core.service";


export default class UserService extends ApiCoreService {

  static #user

  static async getUser() {
    if (this.#user) return this.#user;
    try {
      this.#user = await this.graphCall('withAuth.getuser', `
            {
                withAuth(token:"auto"){
                  getUser(id:"me"){
                    name
                    id
                    emails{
                      address
                    }
                    naiveAuthPass
                    status
                    picture{
                      uri
                      name
                    }
                    socialProfiles{
                      url
                    }
                    wallet{
                      id
                      user{
                        id
                        name
                      }
                      ledger{
                        id
                        fromUser{
                           id
                          name
                        }
                        toUser{
                          id
                            name
                        }
                        amount
                        txType
                      }
                      bal
                      
                    }
                    gender
                  }
                }
              }
            `, {});
      return this.#user;
    } catch (c) {
      console.log(c);
      throw new Error('Unable to get user');

    }
  }


  // static async setUserPassword(id,password){
  //     try {
  //         return await this.graphCall('mutationWithAuth.update.updateUser', `
  //         mutation{
  //             mutationWithAuth(token:"auto"){
  //               update{
  //                 updateUser(id:"${id}", naiveAuthPass:"${password}"){
  //                   id
  //                   name
  //                   phones {
  //                     number
  //                     countryCode
  //                     isVerified
  //                     isPrimary
  //                     addedAtDate
  //                     verifiedAtDate
  //                     madePrimaryAtDate
  //                   }
  //                   naiveAuthPass
  //                 }
  //               }
  //             }
  //           }`,{});
  //     }catch(c){
  //         console.log(c);
  //         throw new Error('Unable to update');
  //     }
  // }

  static async updateUser(user) {
    
    try {
      return await this.graphCall('mutationWithAuth.update.updateUser', `
        mutation{
          mutationWithAuth(token:"auto"){
            update{
              updateUser(id:"${user.id}", naiveAuthPass:${user.password ? '"' + user.password + '"' : '""'},  name:${user.name ? '"' + user.name + '"' : "''"}, gender:${user.gender ? user.gender : 'MALE'}, emails:{address:${user.email && user.email.address ? '"' + user.email.address + '"' : "''"}, isVerified:${user.isVerified ? user.isVerified : false}, status:${user.status ? user.status : 'Enabled'}){
                id
                name
                phones {
                  number
                  countryCode
                  isVerified
                  isPrimary
                  addedAtDate
                  verifiedAtDate
                  madePrimaryAtDate
                }
                naiveAuthPass
              }
            }
          }
        }`
        , {}
        )
    } catch (c) {
      console.log(c);
      throw new Error('Unable to update');
    }
  }

}