module.exports = `
type RootQuery {
    loginUser(credintialInput: Credintial): User
    getCategories: Categories
    getCategory(ID: String!): Category
    getProducts( PageSize: Int, PageNumber: Int): Products
    getProduct(ID: String!): Product
    autoFillNameProduct(Name: String!): [String!]
    filterByNameProduct(Name: String!): Products
    getStocks(PageSize: Int, PageNumber: Int): Stocks
    getStock(ID: String!, ItemsPerPageSize: Int, ItemsPageNumber: Int): Stock
    getCustomers(PageNumber: Int!, PageSize: Int!): Customers
    getCustomer(ID: String!): Customer
    searchCustomer(customerInputData: CustomerInputData): [Customer]
}
`
;
