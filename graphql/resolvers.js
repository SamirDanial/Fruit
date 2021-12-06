const { loginUser, createUser } = require('./Resolver_belongings/user_utility/user_utility');
const { createCategory, editCategory, getCategory, getCategories } = require('./Resolver_belongings/category_utility/category_utility')

module.exports = {

  // -------------------------- user_utility---------------------------
  loginUser: (props, req) => loginUser(props, req),
  createUser: (props, req) => createUser(props, req),

  // -------------------------- Category_utility ----------------------
  createCategory: (props, req) => createCategory(props, req),

  getCategory: (props, req) => getCategory(props, req),
  getCategories: (props, req) => getCategories(props, req),
  editCategory: (props, req) => editCategory(props, req),
};


