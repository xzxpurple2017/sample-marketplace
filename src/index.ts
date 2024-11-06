import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
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

const prisma = new PrismaClient();

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves users from the "users" table in the database.
const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    user: async (_, { publicId }) => {
      return await prisma.user.findUnique({
        where: { publicId },
      });
    },
  },
  Mutation: {
    addUser: async (_, { email, cognitoId, firstName, lastName, phone }) => {
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

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);