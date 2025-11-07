import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('1GangClicker API')
    .setDescription('Бекенд для мобилки 1GangClicker')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Players')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log('Server started on port 3000 and Swagger is available');
}
bootstrap();
