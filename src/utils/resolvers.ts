import { getUsers, getUserByPublicId, createUser, getUserByCognitoId } from '@models/user';
import { getAddresses, getAddressByUserPublicId } from '@models/address';
import jwt from 'jsonwebtoken';

// Function to decode the token
const decodeToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (e) {
    throw new Error('Invalid token');
  }
};

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
    userByToken: async (_: any, __: any, { token }) => {
      const payload = decodeToken(token);
      if (!payload || typeof payload !== 'object' || !payload.sub) {
        throw new Error('Invalid token payload');
      }
      const cognitoId = payload.sub;
      console.log(cognitoId);
      return await getUserByCognitoId(cognitoId);
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