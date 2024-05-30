import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Сервис обращения пользователей')
    .setDescription(
      'Сервис представляет собой страницу, на которой пользователь может оставить обращение разработчикам и посмотреть уже имеющиеся обращения со статусом их выполнения.',
    )
    .setVersion('1.0.0')
    .build();

  const appDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, appDocument);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
