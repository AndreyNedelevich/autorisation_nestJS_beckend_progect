import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';

async function start() {
  const PORT = process.env.PORT || 5200;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NEST AUTERIZATION BACKEND PROGECT')
    .setDescription('API')
    .setVersion('1.0.0')
    .addTag('My Project')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/nest/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();

// Команда docker-compose down используется для остановки и удаления контейнеров, созданных с помощью docker-compose up
// или docker-compose run. Это позволяет закрыть и очистить все контейнеры, связанные с вашим проектом,
