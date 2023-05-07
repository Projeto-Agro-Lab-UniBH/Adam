import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AnimalRepository } from './repositories/animal.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AnimalController],
  providers: [AnimalService, AnimalRepository],
  exports: [AnimalService],
})
export class AnimalModule {}
