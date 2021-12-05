const { buildSchema } = require("graphql");


// --------------------- Types -------------------------------
const userTypeSchema = require("./Schema_belongings/types/user_type_schema");
const categoryTypeSchema = require("./Schema_belongings/types/category_type_schema");
const categoriesTypeSchema = require('./Schema_belongings/types/categories_type_schema');


// --------------------- Inputs ------------------------------
const userInputData = require("./Schema_belongings/inputs/user_data_input");
const userInputCredintial = require("./Schema_belongings/inputs/user_credintial_input");
const categoryInputData = require('./Schema_belongings/inputs/category_data_input');


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

    ${userInputData}
    ${userInputCredintial} 
    ${categoryInputData}

    ${rootQuery}

    ${rootMutation}

    ${schema}
`);
