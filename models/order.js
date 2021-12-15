const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    geoLocation: String,
    orderCode: String,
    isCanceled: {
        type: Boolean,
        default: false
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            eachPrice: Number,
            totalPriceForThis: Number,
            quantity: Number,
        }
    ],
    totalQuantity: Number,
    totalPrice: Number,
    orderDate: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);