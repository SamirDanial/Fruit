module.exports = `
    type Product {
        _id: ID
        name: String
        description: String
        price: Float
        visible: Boolean
        categories: [Category]
        photos: [Photo!]
    }
`
;