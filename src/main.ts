import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { greenBright } from 'colorette';

const port = parseInt(process.env.PORT || '3000', 10);

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth(undefined, 'access-token')
    .addBearerAuth(undefined, 'refresh-token')
    .setTitle('Product management API.')
    .setDescription('The product management API description.')
    .setVersion('1.0')
    .build();

  const options = {
    swaggerOptions: {
      authAction: {
        'access-token': {
          name: 'access-token',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiZG9tYWdvai5wcHAxQGdtYWlsLmNvbSIsInJvbGUiOnsibmFtZSI6IkFkbWluIiwiZGVzY3JpcHRpb24iOiJTeXN0ZW0gYWRtaW4iLCJpZCI6M30sInZlcmlmaWVkRGF0ZSI6IjIwMjMtMDItMjJUMTk6MDU6MjUuODg5WiIsImlkIjoxfSwiaWF0IjoxNjc3NTA3MzQ0LCJleHAiOjE2Nzc1MDgyNDR9.RcXFBuxAT4sJbHSNbAYKoIOoTteCSQuGDOUtJUqLY-U',
        },
        'refresh-token': {
          name: 'refresh-token',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiZG9tYWdvai5wcHAxQGdtYWlsLmNvbSIsInJvbGUiOnsibmFtZSI6IkFkbWluIiwiZGVzY3JpcHRpb24iOiJTeXN0ZW0gYWRtaW4iLCJpZCI6M30sInZlcmlmaWVkRGF0ZSI6IjIwMjMtMDItMjJUMTk6MDU6MjUuODg5WiIsImlkIjoxfSwiaWF0IjoxNjc3NTA3MzQ0LCJleHAiOjE2NzgxMTIxNDR9.V9qKGPgnXXFHL9nTyJgYzBzCiCDU-R95TWWEioNrKtE',
        },
      },
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, options);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(
    greenBright(
      `Server listening port ${port} as ${process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'development'}`,
    ),
  );
}
bootstrap();
