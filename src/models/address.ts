import { prisma } from "@utils/config";

export const getAddresses = async () => {
  return await prisma.address.findMany();
};

export const getAddressByUserPublicId = async (publicId: string) => {
  const user = await prisma.user.findUnique({
    where: { publicId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return await prisma.address.findMany({
    where: { userId: user.id },
  });
};
