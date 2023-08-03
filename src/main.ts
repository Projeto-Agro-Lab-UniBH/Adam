import * as path from 'path';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Orifox API')
    .setDescription('Orifox Platform API endpoints documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useStaticAssets(path.join(__dirname, '..', 'uploads', 'profile-photo'));
  app.use(json({ limit: '100mb' }));
  app.use(
    urlencoded({ extended: true, limit: '100mb', parameterLimit: 100000 }),
  );
  await app.listen(process.env.HOST);
}
bootstrap();
