module.exports = `
    input OrderInputData {
        ID: String
        name: String
        lastName: String
        address: String
        phoneNumber: String
        geoLocation: String
        orderCode: String
        isCanceled: Boolean
        customerId: String
        products: [OrderProductInputData]
        totalQuantity: Int
        totalPrice: Int
        orderDate: String
    }
`;