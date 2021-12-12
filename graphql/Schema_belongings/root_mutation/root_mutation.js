module.exports = `
type RootMutation {
    createUser(userInput: UserInputData!): User!
    createCategory(categoryInput: CategoryInputData): Category!
    editCategory(categoryInput: CategoryInputData) : Category!
    deleteCategory(ID: String!): String!
    createProduct(productInput: ProductInputData): Product!
    editProduct(productInput: ProductInputData): Product!
    deleteProduct(ID: String): String!
    addImageToProduct(ID: String!, photoInput: PhotoInputData): Photo!
    deleteImageFromProduct(ID: String!, PhotoID: String): Product!
    setFeatureProduct(ID: String!, PhotoID: String): Product!
    createStock(stockInputData: StockInputData): Stock!
    editStock(stockInputData: StockInputData): Stock!
    deleteStock(ID: String!): String!
    addProductToStock(ID: String!, availableNumber: Int!, productID: String!): Stock!
    removeProductFromStock(ID: String!, numberToRemove: Int!, productID: String!): Stock!
}
`;
