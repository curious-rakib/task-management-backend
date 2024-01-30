import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config.
  const config = new DocumentBuilder()
    .setTitle('Task Manager')
    .setDescription('API for managing tasks in a task manager application.')
    .setVersion('1.0')
    .addTag('tasks')
    .build();

  // Swagger document.
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS.
  app.enableCors();

  // Enable validation.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Set '/api' prefix to all routes.
  app.setGlobalPrefix('api');

  // Start server with dynamic URL and PORT.
  await app.listen(env.PROT || 3000, () => {
    console.log(
      `Server is running on port ${env.URI || 'http://localhost'}:${env.PROT || 3000}`,
    );
  });
}
bootstrap();
