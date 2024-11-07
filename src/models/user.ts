import { prisma } from "@utils/config";

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserByPublicId = async (publicId: string) => {
  return await prisma.user.findUnique({
    where: { publicId },
  });
};

export const getUserByCognitoId = async (cognitoId: string) => {
  return await prisma.user.findFirst({
    where: { cognitoId },
  });
};

export const createUser = async (email: string, cognitoId: string, firstName?: string, lastName?: string, phone?: string) => {
  return await prisma.user.create({
    data: {
      email,
      cognitoId,
      firstName,
      lastName,
      phone,
    },
  });
};