const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        token: String!
    }

    input UserInputData {
        name: String!
        email: String!
        password: String!
        token: String!
    }

    type RootQuery {
        hello: String!
    }

    type RootMutation {
        createUser(userInput: UserInputData!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);