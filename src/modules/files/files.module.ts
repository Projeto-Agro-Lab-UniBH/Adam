import { Module } from '@nestjs/common';
import { FilesAzureService } from './file.azure.service';

@Module({
  providers: [FilesAzureService],
  exports: [FilesAzureService],
})
export class FilesModule {}
