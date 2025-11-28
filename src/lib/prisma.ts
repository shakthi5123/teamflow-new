//lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // allow global prisma for dev to avoid multiple instances
  // eslint-disable-next-line no-var
  var __prisma?: PrismaClient;
}

export const prisma = global.__prisma ?? new PrismaClient({
 log: ["query"],
})

if (process.env.NODE_ENV !== "production") global.__prisma = prisma;