import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { ExamRepository } from './repositories/exam.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [PatientModule, PrismaModule],
  controllers: [ExamsController],
  providers: [ExamRepository, ExamsService],
})
export class ExamsModule {}
