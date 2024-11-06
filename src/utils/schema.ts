import { PrismaClient } from '@prisma/client';

// Initialize database client
//
const prisma = new PrismaClient();

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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more Users (defined above).
  type Query {
    users: [User]
    user(publicId: ID!): User
  }

  type Mutation {
    addUser(email: String!, cognitoId: String!, firstName: String, lastName: String, phone: String): User
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves users from the "users" table in the database.
export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    user: async (_: any, { publicId }) => {
      return await prisma.user.findUnique({
        where: { publicId },
      });
    },
  },
  Mutation: {
    addUser: async (_: any, { email, cognitoId, firstName, lastName, phone }) => {
      return await prisma.user.create({
        data: {
          email,
          cognitoId,
          firstName,
          lastName,
          phone,
        },
      });
    },
  },
};