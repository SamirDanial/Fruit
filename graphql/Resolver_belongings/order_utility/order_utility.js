const Order = require("../../../models/order");
const checkAdmin = require("../utility/check_admin");

function getRandomString(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return Date.now().toString() + result;
}

module.exports = {
  createOrder: async ({ orderInputData }, req) => {

    const order = new Order({
      name: orderInputData.name,
      lastName: orderInputData.lastName,
      address: orderInputData.address,
      geoLocation: orderInputData.geoLocation,
      orderCode: getRandomString(5),
      products: orderInputData.products,
      customerId: orderInputData.customerId,
      totalQuantity: orderInputData.totalQuantity,
      totalPrice: orderInputData.totalPrice,
    });

    let savedOrder = await order.save();
    
    savedOrder = await savedOrder.populate('customerId')

    for(let i = 0; i < savedOrder.products.length; i++) {
        await savedOrder.populate(`products.${i}.productId`);
    }

    return {
        ...savedOrder._doc,
        _id: savedOrder._id.toString(),
    }
  },
};
