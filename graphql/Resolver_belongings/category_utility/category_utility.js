const Category = require("../../../models/category");
const checkAdmin = require("../utility/check_admin");

module.exports = {
  getCategory: async function ({ ID }, req) {
    console.log(ID);
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

    const category = await Category.findById(ID);
    console.log(category);

    return {
      ...category._doc,
      _id: category._id.toString(),
    };
  },

  getCategories: async function (args, req) {
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

    const categories = await Category.find().sort({ name: -1 });
    return {
      categories: categories.map((category) => {
        return {
          ...category._doc,
          _id: category._id.toString(),
        };
      }),
    };
  },
  createCategory: async function ({ categoryInput }, req) {
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

    const category = new Category({
      name: categoryInput.name,
      description: categoryInput.description,
    });

    const savedCategory = await category.save();

    return {
      ...savedCategory._doc,
      _id: savedCategory._id.toString(),
    };
  },
  editCategory: async function ({ categoryInput }, req) {
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

    const category = await Category.findOneAndUpdate(
      { _id: categoryInput.ID },
      { name: categoryInput.name, description: categoryInput.description },
      { new: true }
    );

    return {
      ...category._doc,
      _id: category._id.toString(),
    };
  },
};