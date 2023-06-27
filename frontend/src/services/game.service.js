import ApiCoreService from "./api.core.service";


export default class GameService extends ApiCoreService {

    static async listAllGames(){
        try {
            return await this.graphCall('withAuth.listGame', `
            {
                withAuth(token:"auto"){
                    listGame{
                    id
                    name
                    image{
                        name
                        mime
                        size
                    }
                    status
                    description
                    }
                }
            }
            `,{});
        }catch(c){
            throw new Error(c);
        }
    }
}
