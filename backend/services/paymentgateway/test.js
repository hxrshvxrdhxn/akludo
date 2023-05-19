const OrderService = require("./OrderService");


async function  test(){
   return  await OrderService.createOrder()
}

console.log(test())