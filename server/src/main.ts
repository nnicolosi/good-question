import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { serverPort } from './config/properties';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(serverPort);
}
bootstrap();
