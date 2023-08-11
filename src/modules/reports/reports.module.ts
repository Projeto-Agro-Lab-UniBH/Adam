import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PatientModule } from '../patient/patient.module';
import { AzureModule } from '../azure/azure.module';

@Module({
  imports: [PrismaModule, PatientModule, AzureModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
