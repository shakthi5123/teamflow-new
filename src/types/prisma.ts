// Prisma generates TypeScript types in @prisma/client, so you can import Prisma types when needed.

export type ObjId = string; // MongoDB ObjectId strings

export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  role?: "user" | "admin";
}