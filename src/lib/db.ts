// NEEDORA POSTGRESQL DATABASE & PRISMA CLIENT ENGINE
// Provides safe singleton PrismaClient connection and transactions.

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * Health check helper to verify database connection
 */
export async function checkDatabaseConnection(): Promise<{ connected: boolean; latencyMs?: number; error?: string }> {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { connected: true, latencyMs: Date.now() - start };
  } catch (err: any) {
    return { connected: false, error: err?.message || 'Database unavailable' };
  }
}

export default prisma;
