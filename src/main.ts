import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS.
  app.enableCors();

  // Set '/api' prefix to all routes.
  app.setGlobalPrefix('api');

  // Swagger config.
  const config = new DocumentBuilder()
    .setTitle('Task Manager')
    .setDescription('API for managing tasks in a task manager application.')
    .setVersion('1.0')
    .build();

  // Swagger document.
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('api-documentation', app, document);

  // Enable validation.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Start server with dynamic URL and PORT.
  await app.listen(env.PROT || 3000, () => {
    console.log(
      `Server is running on port ${env.URI || 'http://localhost'}:${env.PROT || 3000}`,
    );

    console.log(
      `Swagger documentation is available at ${env.URI || 'http://localhost'}:${env.PROT || 3000}/api-documentation`,
    );
  });
}
bootstrap();
