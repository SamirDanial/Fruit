module.exports = `
    type Customer {
        name: String,
        lastName: String,
        active: Boolean,
        photoUrl: String,
        pysicalAddress: String,
        phoneNumber: String,
        emailAddress: String,
        coordinates: String,
        favoriteCategories: [Category],
        user: User!,
    }
`
;