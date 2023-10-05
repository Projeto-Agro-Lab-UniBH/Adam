import { Module } from '@nestjs/common';
import { SurgeryService } from './surgery.service';
import { SurgeryController } from './surgery.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [PrismaModule, PatientModule],
  controllers: [SurgeryController],
  providers: [SurgeryService],
})
export class SurgeryModule {}
