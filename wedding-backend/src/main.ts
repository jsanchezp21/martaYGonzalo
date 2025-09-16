// wedding-backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

function parseCorsOrigins(raw?: string): (string | RegExp)[] {
  if (!raw || !raw.trim()) return [/^http:\/\/localhost:\d+$/];
  return raw.split(',').map(s => s.trim()).filter(Boolean).map(v =>
    v.startsWith('/') && v.endsWith('/') ? new RegExp(v.slice(1, -1)) : v
  );
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const corsOrigins = parseCorsOrigins(process.env.CORS_ORIGIN);
  app.enableCors({ origin: corsOrigins });

  const PORT = parseInt(process.env.PORT || '3000', 10);
  const HOST = process.env.HOST || '0.0.0.0';
  await app.listen(PORT, HOST);

  logger.log(`API listening on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}/api`);
  logger.log(`CORS origins: ${corsOrigins.map(o => o instanceof RegExp ? o.toString() : o).join(', ') || '(localhost only)'}`);
}
bootstrap();
