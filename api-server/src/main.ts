import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // APIのURLを全て「/api」から始まるようにする
  app.setGlobalPrefix('api');
  // CORS対応
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
