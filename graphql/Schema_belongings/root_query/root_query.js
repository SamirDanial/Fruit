module.exports = `
type RootQuery {
    loginUser(credintialInput: Credintial): User!
    getCategories: Categories!
    getCategory(ID: String!): Category!
}
`;