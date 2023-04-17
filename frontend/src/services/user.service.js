import ApiCoreService from "./api.core.service";


export default class UserService extends ApiCoreService{

    static #user

    static async getUser(){
        if (this.#user) return this.#user;
        try{
            this.#user=this.graphCall('withAuth.getuser',`
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
            `,{});
            return this.#user;
        }catch(c){
            console.log(c);
            //throw new Error('Unable to get user');
            return null
        }
    }


    static async setUserPassword(id,password){
        try {
            return await this.graphCall('mutationWithAuth.update.updateUser', `
            mutation{
                mutationWithAuth(token:"auto"){
                  update{
                    updateUser(id:"${id}", naiveAuthPass:"${password}"){
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
              }`,{});
        }catch(c){
            console.log(c);
            throw new Error('Unable to update');
        }
    }

}