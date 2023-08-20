import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AzureModule } from '../azure/azure.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [AzureModule, PatientModule, PrismaModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
