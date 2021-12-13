const Customer = require('../../../models/customer');
const checkAdmin = require('../utility/check_admin');

module.exports = {
    createCustomer: async ({ customerInputData }, req) => {
        const customer = await Customer({
            name: customerInputData.name,
            lastName: customerInputData.lastName,
            active: customerInputData.active,
            physicalAddress: customerInputData.physicalAddress,
            phoneNumber: customerInputData.phoneNumber,
            emailAddress: customerInputData.emailAddress,
            coordinates: customerInputData.coordinates,
            favoriteCategories: customerInputData.favoriteCategories,
            userId: req.user.id
        });

        const savedCustomer = await customer.save();

        return {
            ...savedCustomer._doc,
            _id: savedCustomer._id.toString(),
        }
    },
    editCustomer: async ({ customerInputData }, req) => {
        if(customerInputData.userId == req.user.id) {
            const customer = await Customer.findById(customerInputData.ID);
            customer.name = customerInputData.name;
            customer.lastName = customerInputData.lastName;
            customer.active = customerInputData.active ? customer.active : true;
            customer.physicalAddress = customerInputData.physicalAddress;
            customer.phoneNumber = customerInputData.phoneNumber;
            customer.emailAddress = customerInputData.emailAddress;
            customer.coordinates = customerInputData.coordinates;
            customer.favoriteCategories = customerInputData.favoriteCategories;
            customer.userId = req.user.id;
            const savedCustomer = await customer.save();
            return {
                ...savedCustomer._doc,
                _id: savedCustomer._id.toString()
            }
        } else {
            return {
                errorText: "you are not allowed"
            }
        }
    }
}