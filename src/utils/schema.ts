// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    id: ID
    publicId: String
    email: String
    cognitoId: String
    firstName: String
    lastName: String
    phone: String
    createdAt: String
    updatedAt: String
  }

  type Address {
    id: ID
    publicId: String
    userId: Int
    streetName1: String
    streetName2: String
    city: String
    state: String
    zipCode: String
    country: String
    createdAt: String
    updatedAt: String
    user: User
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more Users (defined above).
  type Query {
    users: [User]
    user(publicId: ID!): User
    addresses: [Address]
    addressByUserPublicId(publicId: ID!): [Address]
  }

  type Mutation {
    addUser(email: String!, cognitoId: String!, firstName: String, lastName: String, phone: String): User
  }
`;