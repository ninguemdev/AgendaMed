import 'dotenv/config';

function parsePort(value: string | undefined): number {
  const parsed = Number(value ?? 3000);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: parsePort(process.env.PORT),
  PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL ?? 'http://localhost:3000',
};

