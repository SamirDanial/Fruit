module.exports = `
type RootMutation {
    createUser(userInput: UserInputData!): User!
    createCategory(categoryInput: CategoryInputData): Category!
    editCategory(categoryInput: CategoryInputData) : Category!
    deleteCategory(ID: String!): String!
    createProduct(productInput: ProductInputData): Product!
    editProduct(productInput: ProductInputData): Product!
    deleteProduct(ID: String): String!
    addImageToProduct(ID: String!, photoInput: PhotoInputData): Product!
    deleteImageFromProduct(ID: String!, PhotoID: String): Product!
    setFeatureProduct(ID: String!, PhotoID: String): Product!
}
`;
