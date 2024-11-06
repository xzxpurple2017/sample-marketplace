import { PrismaClient } from '@prisma/client'

const service = "sample-marketplace";
const environment = process.env.ENVIRONMENT || 'development';
const prisma = new PrismaClient()

export { environment, service, prisma };