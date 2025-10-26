/**
 * Health Check Endpoint
 * Used by Render.com and monitoring services
 */

import { Request, Response } from 'express';

export function healthCheck(req: Request, res: Response) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    service: 'keren-rabbi-israel'
  });
}
