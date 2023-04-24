import ApiCoreService from "./api.core.service";


export default class ChallengeService extends ApiCoreService{

    static async listAllChallenge(){
        try {
            return await this.graphCall('withAuth.listChallenge', `
            {
                withAuth(token:"auto"){
                  listChallenge{
                    id
                    amount
                    game {
                      id
                      name
                      status
                    }
                    contender{
                      name
                      id
                      phones{
                        number
                        countryCode
                      }
                    }
                    status
                    roomCode
                    challenger{
                      id
                      name
                      phones{
                        countryCode
                        number
                      }
                    }
                    meta
                    winner{
                      name
                      id
                      phones{
                        countryCode
                        number
                      }
                    }    
                  }
                }
              }`,{});
        }catch(c){
            console.log(c);
            throw new Error('Unable to list Challenge');
        }
    }

    static async listChallengeByStatus(status){
      //to do check if valid status-------------
      try {
        return await this.graphCall('withAuth.listChallenge', `
        {
          withAuth(token:"auto"){
            listChallenge(criteria:"{\\"status\\":\\"${status}\\"}"){
              id
              challenger{
                id
                name
              }
              contender{
                id
                name
              }
              amount
              roomCode
              game{
                id
                name
              }
              winner{
                id
                name
              }
              status
            }
          }
        }
        `,{});
    }catch(c){
        console.log(c);
        throw new Error('Unable to list Challenge');
    }
    }

    static async createChallenge(challenge){
        try {
            return await this.graphCall('mutationWithAuth.fabricate.createChallenge', `
            mutation{
                mutationWithAuth(token:"auto"){
                  fabricate{
                    createChallenge(challenger:"643e502e746d5ecbaa4936b8" amount:${challenge.amount} contender:"${challenge.contender}" status:CREATED roomCode:"213" game:"64413054d74babfdb353e6b0" ){
                      id
                      challenger{
                        id
                        name
                      }
                      contender{
                        id
                        name
                      }
                      roomCode
                      status
                      amount
                    }
                  }
                }
              }`,{});
        }catch(c){
            console.log(c);
            throw new Error('Unable to create Challenge');
        }
    }

}