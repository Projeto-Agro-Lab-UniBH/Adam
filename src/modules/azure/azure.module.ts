import { Module } from '@nestjs/common';
import { AzureFileService } from './azure.file.service';

@Module({
  providers: [AzureFileService],
  exports: [AzureFileService],
})
export class AzureModule {}
