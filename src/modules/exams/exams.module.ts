import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PatientModule } from '../patient/patient.module';
import { AzureModule } from '../azure/azure.module';

@Module({
  imports: [AzureModule, PatientModule, PrismaModule],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
