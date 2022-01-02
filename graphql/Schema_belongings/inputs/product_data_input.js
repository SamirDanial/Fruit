module.exports = `
    input ProductInputData {
        ID: String
        name: String!
        description: String!
        price: Int!
        visible: Boolean!
        categoriesID: [String!]!
        photos: [PhotoInputData]
    }
`
;