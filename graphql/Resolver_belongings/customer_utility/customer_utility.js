const Customer = require("../../../models/customer");
const checkAdmin = require("../utility/check_admin");

module.exports = {
  getCustomers: async ({ PageNumber, PageSize }, req) => {
    if (req.user) {
      await checkAdmin(req).then((result) => {
        if (!result) {
          const error = new Error("Not authorised");
          error.code = 401;
          throw error;
        }
      });
    } else {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    const customers = await Customer.find()
      .skip((PageNumber - 1) * PageSize)
      .limit(PageSize)
      .sort({ name: 1 })
      .populate("userId").populate("userRole");

    console.log(customers);

    return {
      customers: customers.map((customer, index) => {
        return {
          ...customer._doc,
          _id: customer._id.toString(),
        };
      }),
    };
  },
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
      userId: req.user.id,
    });

    const savedCustomer = await customer.save();

    return {
      ...savedCustomer._doc,
      _id: savedCustomer._id.toString(),
    };
  },
  editCustomer: async ({ customerInputData }, req) => {
    if (customerInputData.userId == req.user.id) {
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
        _id: savedCustomer._id.toString(),
      };
    } else {
      return {
        errorText: "you are not allowed",
      };
    }
  },
  deleteCustomer: async ({ ID, userId }, req) => {
    if (req.user.id == userId) {
      await Customer.deleteOne({ _id: ID });
      return "deleted successfuly";
    } else {
      return "deletion failed";
    }
  },
};
