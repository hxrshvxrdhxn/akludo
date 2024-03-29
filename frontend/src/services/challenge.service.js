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
            //console.log(c);'Unable to list Challenge'
            throw new Error(c);
        }
    }

    static async gameHistory(id){
      try {
        return await this.graphCall('withAuth.listChallenge', `
        {
          withAuth(token:"auto"){
            listChallenge(criteria:"{\\"$or\\":[{\\"challenger\\":\\"${id}\\"},{\\"contender\\":\\"${id}\\"}]}" limit:100){
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
        //console.log(c);'Unable to list Challenge'
        throw new Error(c);
    }
    }

    static async listChallengeByStatus(status){
      //to do check if valid status-------------
      try {
        return await this.graphCall('withAuth.listChallenge', `
        {
          withAuth(token:"auto"){
            listChallenge(criteria:"{\\"status\\":[${status.length?status.map((item)=>`\\"${item}\\" `):status}]}" limit:100){
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
        //console.log(c);'Unable to list Challenge'
        throw new Error(c);
    }
    }

    static async createChallenge(challenge){
        try {
            return await this.graphCall('mutationWithAuth.fabricate.createChallenge', `
            mutation{
                mutationWithAuth(token:"auto"){
                  fabricate{
                    createChallenge(challenger:"${challenge.challenger}" amount:${challenge.amount} status:CREATED  game:"64413054d74babfdb353e6b0" ){
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
            //console.log(c);
            throw new Error(c);
        }
    }

    static async update(updatedObj){
      let id=updatedObj.id||null,
      status=updatedObj.status||null,
      contender=updatedObj.contender||null;
      try {
       return await this.graphCall('mutationWithAuth.update.updateChallenge',`
        mutation{
          mutationWithAuth(token:"auto"){
            update{
              updateChallenge(id:"${id}" ${status?'status:'+status:''}, ${contender?'contender:"'+contender+'"':''} ){
                id
                amount
                game {
                  id
                }
                contender{
                  id
                  name
                  phones{
                    number
                  }
                }
                challenger{
                  id
                  name
                  phones{
                    number
                  }
                }
                roomCode
              }
            }
          }
        }`,{});
    }catch(c){
       //console.log(c);
       //'Unable to update Challenge'
        throw new Error(c);
    }
  }

  static async listAllChallengesByPlayerId(id){
    try {
      return await this.graphCall('withAuth.listChallenge', `
      {
        withAuth(token:"auto"){
          listChallenge(limit:1000, criteria:"{\\"$or\\":[{\\"contender\\":\\"${id}\\"},{\\"challenger\\":\\"${id}\\"}]}"){
            id
            amount
            winner{
              id
              name
            }
            challenger{
              id
              name
            }
            contender{
              id
              name
            }
          }
        }
      }`,{});
    }catch(c){
     //console.log(c);
      throw new Error('Unable to list Challenges');
    }
  }

}