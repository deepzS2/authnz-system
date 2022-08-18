import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './services/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Database
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
