import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbHealth = await checkDatabaseConnection();

  return NextResponse.json({
    service: 'Needora Hyperlocal API',
    status: dbHealth.connected ? 'healthy' : 'degraded',
    database: {
      type: 'PostgreSQL',
      connected: dbHealth.connected,
      latencyMs: dbHealth.latencyMs,
      ...(dbHealth.error ? { message: 'Database connection pending or using fallback mode: ' + dbHealth.error } : {})
    },
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
}
