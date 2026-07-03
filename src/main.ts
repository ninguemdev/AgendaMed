import { createApp } from './infrastructure/web/app';
import { prisma } from './infrastructure/database/prisma';
import { env } from './shared/config/env';

const app = createApp();
const server = app.listen(env.PORT, () => {
  console.log(`AgendaMed rodando em http://localhost:${env.PORT}`);
});

async function shutdown(signal: string): Promise<void> {
  console.log(`Recebido ${signal}. Encerrando aplicacao...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

