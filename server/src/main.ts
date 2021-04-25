import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { serverPort } from './config/properties';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(serverPort);
}
bootstrap();
