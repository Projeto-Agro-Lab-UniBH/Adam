import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ReportsRepository } from './repositories/reports.repository';
import { AnimalModule } from '../animal/animal.module';

@Module({
  imports: [PrismaModule, AnimalModule],
  controllers: [ReportsController],
  providers: [ReportsRepository, ReportsService],
})
export class ReportsModule {}
