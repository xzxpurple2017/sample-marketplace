import { getUsers, getUserByPublicId, createUser } from '@models/user';
import { getAddresses, getAddressByUserPublicId } from '@models/address';

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves users from the "users" table in the database.
export const resolvers = {
  Query: {
    users: async () => {
      return await getUsers();
    },
    user: async (_: any, { publicId }) => {
      return await getUserByPublicId(publicId);
    },
    addresses: async () => {
      return await getAddresses();
    },
    addressByUserPublicId: async (_: any, { publicId }) => {
      return await getAddressByUserPublicId(publicId);
    },
  },
  Mutation: {
    addUser: async (_: any, { email, cognitoId, firstName, lastName, phone }) => {
      return await createUser(email, cognitoId, firstName, lastName, phone);
    },
  },
};