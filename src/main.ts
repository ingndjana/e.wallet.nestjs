import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SERVER_PORT;

  app.enableVersioning({ type: VersioningType.HEADER, header: 'X-Version' });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(process.env.API_TITLE)
    .setDescription(process.env.API_DESCRIPTION)
    .setVersion(process.env.API_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(port, '0.0.0.0');
  Logger.log(`API is running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
