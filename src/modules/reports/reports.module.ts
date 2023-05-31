import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ReportsRepository } from './repositories/reports.repository';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [PrismaModule, PatientModule],
  controllers: [ReportsController],
  providers: [ReportsRepository, ReportsService],
})
export class ReportsModule {}
