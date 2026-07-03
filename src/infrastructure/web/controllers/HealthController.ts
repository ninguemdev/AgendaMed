import type { Request, Response } from 'express';
import type { DatabaseStatus } from '../../database/health';

export class HealthController {
  constructor(private readonly checkDatabase: () => Promise<DatabaseStatus>) {}

  show = async (_request: Request, response: Response): Promise<void> => {
    const database = await this.checkDatabase();
    const isHealthy = database === 'connected';

    response.status(isHealthy ? 200 : 503).json({
      status: isHealthy ? 'ok' : 'degraded',
      database,
      timestamp: new Date().toISOString(),
    });
  };
}

