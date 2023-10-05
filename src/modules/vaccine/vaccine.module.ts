import { Module } from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { VaccineController } from './vaccine.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [PrismaModule, PatientModule],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccineModule {}
