import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const host = configService.get<string>('HOST');
  await app.listen(port, host, () => {
    console.log(`Server is Running on ${host}:${port} ...`);
  });
}
bootstrap();
