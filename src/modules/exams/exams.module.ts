import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { AnimalModule } from '../animal/animal.module';
import { ExamRepository } from './repositories/exam.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AnimalModule, PrismaModule],
  controllers: [ExamsController],
  providers: [ExamRepository, ExamsService],
})
export class ExamsModule {}
