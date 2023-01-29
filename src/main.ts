import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { greenBright } from 'colorette';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(
    greenBright(
      `Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`,
    ),
  );
}
bootstrap();
