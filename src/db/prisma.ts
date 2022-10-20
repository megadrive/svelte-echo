import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient | undefined;

if (!prisma) {
  prisma = new PrismaClient();
}
