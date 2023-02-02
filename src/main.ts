import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { greenBright } from 'colorette';

const port = parseInt(process.env.PORT || '3000', 10);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Product management API example')
    .setDescription('The product management API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log(
    greenBright(
      `Server listening at http://localhost:${port} as ${process.env.NODE_ENV}`,
    ),
  );
}
bootstrap();
