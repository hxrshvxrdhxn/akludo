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

    static async getOrder(id){
      try {
        return await this.graphCall('withAuth.getOrder', `{
          withAuth(token:"auto"){
            getOrder(id:"${id}"){
              id
              user{
                id
              }
              amount
              currency
              expiryTime
              orderid
              orderStatus
              paymentId
              transaction{
                id
              }
              orderNote
            }
          }
        }`,{});
      }catch(c){
          console.log(c);
          throw new Error('unable to get order');
      }
    }

    static async updateTransactionStatus(id,orderStatus){
      try {
        return await this.graphCall('mutationWithAuth.update.updateBankTransaction',
          `mutation{
            mutationWithAuth(token:"auto"){
              update{
                updateBankTransaction(id:"${id}",status:${orderStatus}){
                  id
                  status
                  gateway
                  gatewayMethod
                  amount
                  txType
                  meta
                }
              }
            }
          }`
        ,{});
      }catch(c){
        console.log(c);
        throw new Error('unable to update transaction');
      }
    } 

}