const {
  loginUser,
  createUser,
} = require("./Resolver_belongings/user_utility/user_utility");
const {
  createCategory,
  editCategory,
  getCategory,
  getCategories,
  deleteCategory,
} = require("./Resolver_belongings/category_utility/category_utility");
const {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
  addImageToProduct,
  deleteImageFromProduct,
  setFeatureProduct,
  autoFillNameProduct,
  filterByNameProduct,
} = require("./Resolver_belongings/product_utility/product_utility");

module.exports = {
  // -------------------------- user_utility---------------------------
  loginUser: (props, req) => loginUser(props, req),
  createUser: (props, req) => createUser(props, req),

  // -------------------------- Category_utility ----------------------
  createCategory: (props, req) => createCategory(props, req),
  getCategory: (props, req) => getCategory(props, req),
  getCategories: (props, req) => getCategories(props, req),
  editCategory: (props, req) => editCategory(props, req),
  deleteCategory: (props, req) => deleteCategory(props, req),

  // -------------------------- Product _utility -----------------------
  createProduct: (props, req) => createProduct(props, req),
  getProducts: (props, req) => getProducts(props, req),
  getProduct: (props, req) => getProduct(props, req),
  editProduct: (props, req) => editProduct(props, req),
  deleteProduct: (props, req) => deleteProduct(props, req),
  addImageToProduct: (props, req) => addImageToProduct(props, req),
  deleteImageFromProduct: (props, req) => deleteImageFromProduct(props, req),
  setFeatureProduct: (props, req) => setFeatureProduct(props, req),
  autoFillNameProduct: (props, req) => autoFillNameProduct(props, req),
  filterByNameProduct: (props, req) => filterByNameProduct(props, req),
};
