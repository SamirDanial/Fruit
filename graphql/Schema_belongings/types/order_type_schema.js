module.exports = `
    type Order {
        _id: ID
        name: String
        lastName: String
        address: String
        phoneNumber: String
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