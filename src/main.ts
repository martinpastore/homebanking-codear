import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect as connectToEventStore } from './event-store';
import { PrismaService } from './prisma/prisma.service';
import { persistentSuscriptions } from './suscriptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // EventStore
  await connectToEventStore({ persistentSuscriptions });

  // Prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
