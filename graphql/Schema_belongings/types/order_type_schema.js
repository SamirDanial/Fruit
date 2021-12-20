module.exports = `
    type Order {
        _id: ID
        address: String
        geoLocation: String
        orderCode: String
        isCanceled: Boolean
        customerId: Customer
        products: [orderProduct]
        totalQuantity: Int
        totalPrice: Int
        orderDate: String
    }
`;