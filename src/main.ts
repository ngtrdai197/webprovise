import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './environment/environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const envService = app.get(EnvironmentService);

  await app.listen(envService.get<number>('api_port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
