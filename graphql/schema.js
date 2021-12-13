const { buildSchema } = require("graphql");


// --------------------- Types -------------------------------
const userTypeSchema = require("./Schema_belongings/types/user_type_schema");
const categoryTypeSchema = require("./Schema_belongings/types/category_type_schema");
const categoriesTypeSchema = require('./Schema_belongings/types/categories_type_schema');
const photoTypeSchema = require('./Schema_belongings/types/photo_type_schema');
const productTypeSchema = require('./Schema_belongings/types/product_type_schema');
const productsTypeSchema = require('./Schema_belongings/types/products_type_schema');
const itemInStockTypeSchema = require('./Schema_belongings/types/stock_type_ItemInStock_schema');
const stockTypeSchema = require('./Schema_belongings/types/stock_type_schema');
const stocksTypeSchema = require('./Schema_belongings/types/stocks_type_schema');
const customerTypeSchema = require('./Schema_belongings/types/customer_type_schema');
const customersTypeSchema = require('./Schema_belongings/types/customers_type_schema');


// --------------------- Inputs ------------------------------
const userInputData = require("./Schema_belongings/inputs/user_data_input");
const userInputCredintial = require("./Schema_belongings/inputs/user_credintial_input");
const categoryInputData = require('./Schema_belongings/inputs/category_data_input');
const photoInputData = require('./Schema_belongings/inputs/photo_data_input');
const productInputData = require('./Schema_belongings/inputs/product_data_input');
const stockItemInputData = require('./Schema_belongings/inputs/stockItem_data_input');
const stockInputData = require('./Schema_belongings/inputs/stock_data_input');
const customerInputData = require('./Schema_belongings/inputs/customer_data_input');


// -------------------- RootQuery ----------------------------
const rootQuery = require("./Schema_belongings/root_query/root_query");


// -------------------- RootMutation -------------------------
const rootMutation = require("./Schema_belongings/root_mutation/root_mutation");


// -------------------- Schema -------------------------------
const schema = require("./Schema_belongings/schema/schema");




module.exports = buildSchema(`

    ${userTypeSchema}
    ${categoryTypeSchema}
    ${categoriesTypeSchema}
    ${photoTypeSchema}
    ${productTypeSchema}
    ${productsTypeSchema}
    ${itemInStockTypeSchema}
    ${stockTypeSchema}
    ${stocksTypeSchema}
    ${customerTypeSchema}
    ${customersTypeSchema}

    ${userInputData}
    ${userInputCredintial} 
    ${categoryInputData}
    ${photoInputData}
    ${productInputData}
    ${stockItemInputData}
    ${stockInputData}
    ${customerInputData}

    ${rootQuery}

    ${rootMutation}

    ${schema}
`);
