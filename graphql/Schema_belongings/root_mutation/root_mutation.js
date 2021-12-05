module.exports = `
type RootMutation {
    createUser(userInput: UserInputData!): User!
    createCategory(categoryInput: CategoryInputData): Category!
}
`;
