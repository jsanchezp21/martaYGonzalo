import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	  const origin = process.env.CORS_ORIGIN?.split(',').map(s => s.trim()) ?? [/^http:\/\/localhost:\d+$/];
	  app.enableCors({ origin });
  await app.listen(parseInt(process.env.PORT || '3000', 10));
  console.log('API on http://localhost:' + (process.env.PORT || '3000') + '/api');
}
bootstrap();
