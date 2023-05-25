import ApiCoreService from "./api.core.service";


export default class TransactionService extends ApiCoreService {

  
    static async createTransaction(transaction){
        console.log(transaction);
        try {
            return await this.graphCall('mutationWithAuth.fabricate.createBankTransaction', `
            mutation{
                mutationWithAuth(token:"auto"){
                  fabricate{
                    createBankTransaction(status:${transaction.status},gateway:"${transaction.gateway}",gatewayMethod:"${transaction.gatewayMethod}",amount:${transaction.amount},txType:${transaction.txType}){
                      id
                      status
                      amount
                      txType
                      meta
                      gateway
                      gatewayMethod
                    }
                  }
                }
            }`,{});
        }catch(c){
            console.log(c);
            throw new Error('Unable to create');
        }
    }

    static async getTransaction(id){
      try {
        return await this.graphCall('withAuth.getBankTransaction', `
        {
          withAuth(token:"auto"){
             getBankTransaction(id:"${id}"){
              id
              status
              meta
              amount
              gatewayMethod
              gateway
              txType
            }
          }
        }        
        `,{});
        }catch(c){
            console.log(c);
            throw new Error('unable to get transaction');
        }
    }

}