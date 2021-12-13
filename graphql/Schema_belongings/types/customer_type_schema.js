module.exports = `
    type Customer {
        name: String,
        lastName: String,
        active: Boolean,
        photoUrl: String,
        physicalAddress: String,
        phoneNumber: String,
        emailAddress: String,
        coordinates: String,
        favoriteCategories: [Category],
        userId: User!,
    }
`
;