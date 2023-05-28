const OrderService = require("./OrderService");


async function  test(){
   return  await OrderService.findOrder('order_3885242QKojGG62mYlBjW0QGjSYu3ykeL')
}

console.log(test());