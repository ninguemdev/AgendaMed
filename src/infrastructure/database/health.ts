import type { PrismaClient } from '@prisma/client';

export type DatabaseStatus = 'connected' | 'disconnected';

export async function checkDatabaseConnection(client: PrismaClient): Promise<DatabaseStatus> {
  try {
    await client.$queryRaw`SELECT 1`;
    return 'connected';
  } catch {
    return 'disconnected';
  }
}

