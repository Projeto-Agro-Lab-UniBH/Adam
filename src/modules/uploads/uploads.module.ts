import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { AzureModule } from '../azure/azure.module';

@Module({
  imports: [AzureModule],
  controllers: [UploadsController],
})
export class UploadsModule {}
