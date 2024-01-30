import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

global.__baseDir = __dirname;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, '../public'), {
    prefix: '/public/',
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
