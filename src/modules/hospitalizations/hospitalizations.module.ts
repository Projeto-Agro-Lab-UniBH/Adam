import { Module } from '@nestjs/common';
import { HospitalizationsService } from './hospitalizations.service';
import { HospitalizationsController } from './hospitalizations.controller';
import { PatientModule } from '../patient/patient.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PatientModule, PrismaModule],
  controllers: [HospitalizationsController],
  providers: [HospitalizationsService],
})
export class HospitalizationsModule {}
