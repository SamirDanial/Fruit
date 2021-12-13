module.exports = `
    input CustomerInputData {
        ID: String,
        name: String!,
        lastName: String!,
        active: Boolean,
        photoUrl: String,
        pysicalAddress: String!,
        phoneNumber: String,
        emailAddress: String,
        coordinates: String,
        favoriteCategories: [String],
    }
`
;